'use client'
import {useState, useEffect, PropsWithChildren} from 'react';
import PageTitle from '@/components/PageTitle';
import { useUserContext } from '@/contexts/userContext';
import Link from 'next/link';

type PageSectionProps = PropsWithChildren & {
    title: string;
    id: string;
    needConnexion?: boolean;
}

/**
 * Section de page avec titre et contenu
 * @param {PageSectionProps} props
 * @param {string} props.title titre de la section
 * @param {string} props.id id de la section
 * @param {boolean} props.needConnexion si la section nécessite une connexion
 * @return {JSX.Element}
 */
const PageSection = (props: PageSectionProps) => {
    const { connectedUser } = useUserContext();
    const [isUserChecked, setIsUserChecked] = useState<boolean>(false);

    useEffect(() => {
        setIsUserChecked(true);
    }, [connectedUser]);

    if (props.needConnexion ===  undefined || false) {
        return (
            <section id={props.id} className={"scrollable"}>
                <PageTitle title={props.title}/>
                <div className={"sectionContent"}>
                    {props.children}
                </div>
            </section>
        )
    }

    else return (
        <section id={props.id} className={"scrollable"}>
            <PageTitle title={props.title}/>
            <div className={"sectionContent"}>
                {!isUserChecked && <p>Chargement...</p>}
                {isUserChecked && !connectedUser && <>
                    <p>Vous devez être connecté pour accéder à cette page.</p>
                    <Link className={"redirectLink"} href="/connexion">Se connecter</Link>
                </>}
                {isUserChecked && connectedUser && <>
                    {props.children}
                </>}
            </div>
        </section>
    )
}

export default PageSection;