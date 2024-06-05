'use client'
import { useRef, useState } from "react";
import { useRouter } from 'next/navigation'; 
import PageSection from "@/components/PageSection";
import PasswordValidator from "@/components/PasswordValidator";
import createUser from "@/tools/frontend/requests/createUser";
import { User } from "@/types";

const Inscription = () => {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState<string>("");
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (nameRef?.current?.value && emailRef?.current?.value && passwordRef?.current?.value) {
            const newUser: User = {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                profile: "free"
            }
            const response = await createUser(newUser);
            switch (response.status) {
                case 201:
                    setErrorMsg("");
                    router.push("/connexion");
                    break;
                case 409:
                    setErrorMsg("Un utilisateur avec cette adresse mail existe déjà.");
                    break;
                case 511:
                    setErrorMsg("Une erreur est survenue lors de l'envoi du mail d'inscription. Verifiez la validité de votre adresse.");
                    break;
                case 500:
                    setErrorMsg("Un problême est survenue lors de votre inscription. Veuillez réessayer plus tard");
                    break;           
            }
        }
        router.push("/");
    };

    return (
        <PageSection title="Inscrivez-vous !" id="inscriptionSection">
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className={"inputWrapper"}>
                    <label htmlFor="email">Renseignez votre email :</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="joeladechirure@jld.fr"
                        ref={emailRef}
                        required
                    />
                </div>
                <div className={"inputWrapper"}>
                    <label htmlFor="name">Renseignez votre nom / pseudo :</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder="Joeladechirure"
                        ref={nameRef}
                        required
                    />
                </div>
                <div className={"inputWrapper"}>
                    <label htmlFor="password">Choisissez votre mot de passe :</label>
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