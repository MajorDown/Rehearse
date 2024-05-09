'use client'
import { useState, useEffect, MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/contexts/userContext';

const NavBar = () => {
    const [isUserChecked, setIsUserChecked] = useState<boolean>(false);
    const { connectedUser, updateConnectedUser } = useUserContext();
    const router = useRouter();

    useEffect(() => {
        setIsUserChecked(true);
    }, [connectedUser]);

    const logout = async (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        updateConnectedUser(null);
        router.push('/');
    }

    return (
        <div id="navBar">
            {connectedUser && <p>Bienvenue, {connectedUser.name} !</p>}
            <nav>
                {isUserChecked && !connectedUser && (
                    <Link href="/connexion">Connexion</Link>
                )}
                {isUserChecked && connectedUser && (<>
                    <Link href="/record">Record</Link>
                    <Link href="/options">Options</Link>
                    <Link href="/" onClick={(event) => logout(event)}>Déconnexion</Link>
                </>)}
            </nav>
        </div>
    );
}

export default NavBar;
