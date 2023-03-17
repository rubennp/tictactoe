import styled from "styled-components";

const BttnSocial = styled.a`
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

export default BttnSocial;