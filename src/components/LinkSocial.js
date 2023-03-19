import { BsGithub, BsLinkedin } from 'react-icons/bs';

import Link from '../styles/Link.styled';

const icon = {
    "gh" : <BsGithub />,
    "li" : <BsLinkedin />,
};

export default function Social ({ico, href}) {
    return (
        <Link className="social" href={href} target="_blank" rel="noreferrer">
            {icon[ico]}
        </Link>
      ); 
};