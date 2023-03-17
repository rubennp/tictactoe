import { BsGithub, BsLinkedin } from 'react-icons/bs';

import BttnSocial from '../styles/BttnSocial.styled';

const icon = {
    "gh" : <BsGithub />,
    "li" : <BsLinkedin />,
};

export default function Social ({ico, href}) {
    return (
        <BttnSocial href={href} target="_blank" rel="noreferrer">
            {icon[ico]}
        </BttnSocial>
      ); 
};