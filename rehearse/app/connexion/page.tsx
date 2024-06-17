'use client'
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import PageSection from "@/components/PageSection";
import connectUser from "@/tools/frontend/requests/connectUser";
import { UserAuthData } from "@/types";

const Connexion = () => {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState<string>("");
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (emailRef?.current?.value && passwordRef?.current?.value) {
            const newUser: UserAuthData = {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }
            const response = await connectUser(newUser);
            switch (response.status) {
                case 201:
                    setErrorMsg("");
                    router.push("/dashboard");
                    break;
                case 500:
                    setErrorMsg("Un problême est survenue lors de votre connexion. Veuillez réessayer plus tard");
                    break;           
            }
        }
    };

    return (
        <PageSection title="Connectez-vous !" id="connexionSection">
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
                {errorMsg && <p className={"errorMsg"}>{errorMsg}</p>}
                <button type="submit" className={"actionBtn"}>Se connecter</button>
                <div className={"separator"}>.</div>
                <p>Vous n'avez pas encore de compte ?</p>
                <a href={"/inscription"} className={"actionBtn"}>Inscription</a>
            </form>
        </PageSection>
    )
}

export default Connexion;