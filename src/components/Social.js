import styled from 'styled-components';

import { BsGithub, BsLinkedin } from 'react-icons/bs';

const icon = {
    "gh" : <BsGithub />,
    "lk" : <BsLinkedin />,
};

export default function Social ({social, href}) {
    return (
        <SocialBtn href={href} target="_blank" rel="noreferrer">
            {icon[social]}
        </SocialBtn>
      ); 
};

const SocialBtn = styled.a`
    * {
        vertical-align: top;
        color: black;
    }

    svg {
        border-radius: .5em;
        display: inline-block;
        background-color: #f0f0f0;
        padding: .5em;

        &:hover {
            * {
                color: white;
            }

            background-color: black;
        }
    }
`;