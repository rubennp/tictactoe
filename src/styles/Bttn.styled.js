import styled from "styled-components";

const Bttn = styled.button`
    color: maroon;
    background-color: oldlace;
    padding: 1rem;
    box-shadow: 0 5px 5px rgba(0, 0, 0, .25);
    border-radius: 10px;

    &:hover {
        cursor: pointer;
        box-shadow: 0 1px 2px rgba(0, 0, 0, .25);
        color: lightsalmon;
        background-color: maroon;
    }
`;

export default Bttn;

