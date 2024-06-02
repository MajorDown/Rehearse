import { useState, useEffect, InputHTMLAttributes, RefObject } from "react";
import PasswordInput from "./PasswordInput";

/**
 * Convertit une string en une chaîne de caractères adaptée pour l'attribut `pattern` d'un élément HTML `<input>`.
 * 
 * @param {RegExp} str - La chaine de caractère à convertir.
 * @returns {string} La chaîne de caractères résultante, adaptée pour l'usage dans l'attribut `pattern`.
 */
const stringToPattern = (str: string): string => {
    const escapedStr = str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    return '^' + escapedStr + '$';
}

/**
 * Propriétés pour le composant UIPasswordValidator.
 * @typedef {Object} UIPasswordValidatorProps
 * @extends {InputHTMLAttributes<HTMLInputElement>}
 * @property {RefObject<HTMLInputElement>} [inputRef] - Référence de l'objet input pour accès direct.
 * @property {function(string): void} [onChangeValue] - Fonction de rappel lors du changement de valeur.
 */
type UIPasswordValidatorProps = InputHTMLAttributes<HTMLInputElement> & {
  inputRef?: RefObject<HTMLInputElement>;
  onChangeValue?: (value: string) => void;
};

/**
 * Composant pour créer et confirmer la saisi d'un mot de passe.
 *
 * @param {PasswordValidatorProps} props - Propriétés pour configurer le validateur de mot de passe.
 * @returns {JSX.Element} Deux champs de saisie pour la validation de mot de passe.
 */
const PasswordValidator = (props: UIPasswordValidatorProps) => {
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [verifPattern, setVerifPattern] = useState<string>("");
  const [isConfirmed, setIsConfirmed] = useState<undefined | true | false>(undefined);

  useEffect(() => {
    if (password1 && password2) {
      if (password1 != password2) setIsConfirmed(false);
      else setIsConfirmed(true);
      setVerifPattern(stringToPattern(password1))
    }
    else setIsConfirmed(false);
  }, [password1, password2])

  useEffect(() => {
    if (props.onChangeValue) {
      if (isConfirmed != true) props.onChangeValue("");
      if (isConfirmed === true) props.onChangeValue(password1);
    }
  }, [isConfirmed])


  return (
    <div className={"passwordValidator"} >
      <PasswordInput name={"password1"} inputRef={props.inputRef} onChangeInputValue={(value) => setPassword1(value)}/>
      <input 
        type="password" 
        className={"UIPasswordConfirmation"} 
        name="password2" 
        onChange={(event) => setPassword2(event.target.value)}
        value={password2}
        pattern={verifPattern}
        title={"Les mots de passes rentrés ne sont pas identique !"}
        placeholder={"confirmez votre mot de passe"}
        aria-label={"confirmez votre mot de passe"}
        style={{
          ...(password2 ? (isConfirmed === false ? {
              backgroundColor: "#ff7676",
              borderColor: "#750909"
          } : {
              backgroundColor: "#4fad4f",
              borderColor: "#2a5205"
          }) : {}),
          ...props.style
      }}
        required 
        />
    </div>
  )
}

export default PasswordValidator;