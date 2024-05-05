'use client'
import {useState, useEffect} from 'react';
import Link from 'next/link';
import {ConnectedUser} from '@/types';

const NavBar = () => {
    const [isUserChecked, setIsUserChecked] = useState<boolean>(false);
    const [isUserConnected, setIsUserConnected] = useState<boolean>(false);

    useEffect(() => {
        const user = localStorage.getItem('rehearse-user');
        if (user) {
            setIsUserConnected(true);
        }
        setIsUserChecked(true);
    }, []);

  return (<>
    {<p>Bienvenue, {}</p>}
    <nav>
        {isUserChecked && !isUserConnected && <>
            <Link href="/connexion">Connexion</Link>
        </>}
        {isUserChecked && isUserConnected && <>
            <Link href="/record">Record</Link>
            <Link href="/options">Options</Link>
            <Link href="/">Déconnexion</Link>
        </>}
    </nav>
  </>)
}

export default NavBar;