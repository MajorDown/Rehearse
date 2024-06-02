'use client'
import { useRef, useState } from "react";
import { useRouter } from 'next/navigation'; 
import PageSection from "@/components/PageSection";
import PasswordValidator from "@/components/PasswordValidator";

const Inscription = () => {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState<string>("");
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("submit");
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