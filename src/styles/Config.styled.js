import styled from "styled-components";

const ConfigStyled = styled.div`
    display: flex;
    flex-direction: row;

    div {   
        svg.icoFitxa {
            color: #3f3f3f;
            font-size: 32px;
        }

        div {
            width: 4em;
            height: 4em;
            margin: .5em 1em 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 100%;

            svg {
                font-size: 3em;
            }
        }
    }
`;

export default ConfigStyled;