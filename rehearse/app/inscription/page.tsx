'use client'
import { useRef, useState } from "react";
import PageSection from "@/components/PageSection";
import PasswordValidator from "@/components/PasswordValidator";

const Inscription = () => {
    const [errorMsg, setErrorMsg] = useState<string>("");
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("submit");
    };  

    return (
        <PageSection title="Inscrivez-vous !" id="inscriptionSection">
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className={"inputWrapper"}>
                    <label htmlFor="email">Renseignez Votre Email :</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Joeladechirure@jld.fr"
                        ref={emailRef}
                        required
                    />
                </div>
                <div className={"inputWrapper"}>
                    <label htmlFor="password"> Choisissez votre Mot de passe :</label>
                    <PasswordValidator inputRef={passwordRef}/>
                </div>
                {errorMsg && <p className={"errorMsg"}>{errorMsg}</p>}
                <button type="submit" className={"actionBtn"}>S'inscrire</button>
                <div className={"separator"}>.</div>
                <p>Vous possedez déjà un compte ?</p>
                <a href={"/connexion"} className={"actionBtn"}>Connexion</a>
            </form>
        </PageSection>
    )
}

export default Inscription;