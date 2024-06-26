'use client'
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import PageSection from "@/components/PageSection";
import { UserAuthDataForNewPassword } from "@/types";
import { useUserContext } from "@/contexts/userContext";
import updatePassword from "@/tools/frontend/requests/updatePassword";

const Connexion = () => {
    const router = useRouter();
    const { connectedUser } = useUserContext();
    const [errorMsg, setErrorMsg] = useState<string>("");
    const passwordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const confirmNewPasswordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (connectedUser && passwordRef?.current?.value && newPasswordRef?.current?.value && confirmNewPasswordRef?.current?.value) {
            const userWithUpdatedPassword: UserAuthDataForNewPassword = {
                email: connectedUser.email,
                authToken: connectedUser.authToken,
                password: passwordRef.current.value,
                newPassword: newPasswordRef.current.value
            }
            const response = await updatePassword(userWithUpdatedPassword);
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
        <PageSection title="Modifier votre mot de passe" id="newPasswordSection" needConnexion>
            <p>Vous pouvez ici modifier votre mot de passe à votre guise.</p>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className={"inputWrapper"}>
                    <label htmlFor="password">Votre mot de passe actuel :</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="(un autre truc que votre date de naissance)"
                        ref={passwordRef}
                        required
                    />
                </div>
                <div className={"inputWrapper"}>
                    <label htmlFor="password">Votre nouveau mot de passe :</label>
                    <input 
                        type="password" 
                        name="newPassword" 
                        id="newPassword" 
                        placeholder="(un autre truc que votre le mot de passe précédent)"
                        ref={newPasswordRef}
                        required
                    />
                </div>
                <div className={"inputWrapper"}>
                    <label htmlFor="password">Confirmez votre nouveau mot de passe :</label>
                    <input 
                        type="password" 
                        name="confirmNewPassword" 
                        id="confirmNewPassword" 
                        placeholder="(vous trompez pas, sinon.... bah ça marche pas.)"
                        ref={confirmNewPasswordRef}
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