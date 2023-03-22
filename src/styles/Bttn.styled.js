import styled from "styled-components";

const Bttn = styled.button`
    color: maroon;
    background-color: oldlace;
    padding: 1rem;
    box-shadow: 0 5px 5px rgba(0, 0, 0, .25);
    border-radius: 10px;
    transition: box-shadow, background-color .25s linear;

    &.juga {
        width: 25%;
        font-size: 1.5em;
    }

    &.jugador {
        width: 6em;
        height: 6em;
        margin: .5em 1em 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;

        svg {
            font-size: 3em;
        }
    }

    &.opcionsJoc {
        margin: 0 .5em; 
        font-size: 1.5em;
    }
    
    &:hover {
        cursor: pointer;
        box-shadow: 0 1px 2px rgba(0, 0, 0, .25);
        color: lightsalmon;
        background-color: maroon;
    }
`;

export default Bttn;

