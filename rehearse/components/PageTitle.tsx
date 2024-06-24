import { Finger_Paint } from 'next/font/google';
const titleFont = Finger_Paint({weight: '400', subsets: ['latin']});

type PageTitleProps = {
    title: string;
}

//jsdoc
/**
 * retourne un h2 pour la section de page
 * @param props 
 * @returns {JSX.Element}
 */
const PageTitle = (props: PageTitleProps) => {
  return (
    <h2 className={titleFont.className}>{props.title}</h2>
  )
}

export default PageTitle;