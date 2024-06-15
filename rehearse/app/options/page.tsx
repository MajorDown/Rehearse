import Link from "next/link";
import PageSection from "@/components/PageSection";

// a prévoir dans les option : 
// - modifier le mot de passe
// - modifier le profile
// - modifier les préférences éentuelles
// - supprimer le compte

const Options = () => {
    
    return (
        <PageSection title="Options" id="optionsSection" needConnexion>
            <h3>Que souhaitez-vous faire ?</h3>
            <nav>
                <ul>
                    <li><Link href="/options/newPassword">Modifier votre mot de passe</Link></li>
                </ul>
            </nav>
        </PageSection>
    )
}

export default Options;