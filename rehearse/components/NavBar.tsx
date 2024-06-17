'use client'
import { useState, useEffect, MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useUserContext } from '@/contexts/userContext';

const NavBar = () => {
    const [isUserChecked, setIsUserChecked] = useState<boolean>(false);
    const { connectedUser, updateConnectedUser } = useUserContext();
    const router = useRouter();
    const pathName = usePathname();

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
                    <Link href="/connexion" className={pathName === "/connexion" ? "active" : ""}>Connexion</Link>
                )}
                {isUserChecked && connectedUser && (<>
                    <Link href="/records" className={pathName === "/records" ? "active" : ""}>Records</Link>
                    <Link href="/options" className={pathName === "/options" ? "active" : ""}>Options</Link>
                    <Link href="/" onClick={(event) => logout(event)}>Déconnexion</Link>
                </>)}
            </nav>
        </div>
    );
}

export default NavBar;
