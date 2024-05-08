import { Finger_Paint } from 'next/font/google';
const titleFont = Finger_Paint({weight: '400', subsets: ['latin']});

type PageTitleProps = {
    title: string;
}

const PageTitle = (props: PageTitleProps) => {
  return (
    <h2 className={titleFont.className}>{props.title}</h2>
  )
}

export default PageTitle;