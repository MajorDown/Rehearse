import { Finger_Paint } from 'next/font/google';
const titleFont = Finger_Paint({weight: '400', subsets: ['latin']});

export default function Home() {

  return (
    <section id={"welcomeSection"} className={"scrollable"}>
      <h2 className={titleFont.className}>Bienvenue !</h2>
      <div id={"welcomer"}>
        <p>Rehearse est une application de gestion de session d'enregistrements musicaux.</p>
        <p>Terminé les enregistrements de vos répet' stocké en vrac !</p>
        <p>Avec Rehearse, vos sessions sont organisés très simplement, selon vos besoins du moment :
        triées par date, par album ou par titre, chacun de vos Record est stocké de manière sécurisé.</p>
      </div>
    </section>
  )
}