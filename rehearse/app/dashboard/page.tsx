'use client'
import PageSection from "@/components/PageSection";
import { useUserContext } from "@/contexts/userContext";


const Connexion = () => {
    const { connectedUser } = useUserContext();
    return (
        <PageSection title="Dashboard" id="dashBoardSection" needConnexion>
            <p>ceci est le dashboard</p>
        </PageSection>
    )
}

export default Connexion;