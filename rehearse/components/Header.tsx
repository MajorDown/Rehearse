import React from 'react';
import Image from 'next/image';
import { Finger_Paint } from 'next/font/google';
import NavBar from './NavBar';
const titleFont = Finger_Paint({weight: '400', subsets: ['latin']});

const Header = () => {
  return (
    <header>
        <div id={"headerTitle"}>
            <h1 data-text={"Rehearse"} className={titleFont.className}>Rehearse</h1>
            <Image id={"headerLogo"} src="/images/logo.svg" alt="Rehearse" width={436} height={166} />
            <p id={"headerSlogan"}>You click. You play. That's okay.</p>
        </div>
        <NavBar />
    </header>
  )
}

export default Header;