'use client'
import { useRef } from "react";
import PageSection from "@/components/PageSection";

const Records = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("submit");
    };  

    return (
        <PageSection title="Connectez-vous" id="connexionSection">
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className={"inputWrapper"}>
                    <label htmlFor="email">Votre Email :</label>
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
                    <label htmlFor="password">Votre Mot de passe :</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="(un autre truc que votre date de naissance)"
                        ref={passwordRef}
                        required
                    />
                </div>
                <button type="submit" className={"actionBtn"}>Se connecter</button>
                <div className={"separator"}>.</div>
                <p>Vous n'avez pas encore de compte ?</p>
                <button type="button" className={"actionBtn"}>Inscription</button>
            </form>
        </PageSection>
    )
}

export default Records;