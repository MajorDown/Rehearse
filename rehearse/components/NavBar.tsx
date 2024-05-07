'use client'
import {useState, useEffect} from 'react';
import Link from 'next/link';
import {ConnectedUser} from '@/types';
import getConnectedUser from '@/tools/front/getConnectedUser';

const NavBar = () => {
    const [isUserChecked, setIsUserChecked] = useState<boolean>(false);
    const [connectedUser, setConnectedUser] = useState<ConnectedUser | null>(null);

    useEffect(() => {
        const foundUser = getConnectedUser();
        if (foundUser) setConnectedUser(foundUser);
        setIsUserChecked(true);
    }, []);

    return (
        <div id={"navBar"}>
            {connectedUser != null && <p>Bienvenue, {connectedUser.name} !</p>}
            <nav>
                {isUserChecked && connectedUser != null && <>
                    <Link href="/connexion">Connexion</Link>
                </>}
                {isUserChecked && connectedUser && <>
                    <Link href="/record">Record</Link>
                    <Link href="/options">Options</Link>
                    <Link href="/">Déconnexion</Link>
                </>}
            </nav>
        </div>
    )
}

export default NavBar;