import styled from "styled-components";

const Button = styled.div`
    color: maroon;
    background-color: oldlace;
    padding: .5rem;
    box-shadow: 0 5px 5px rgba(0, 0, 0, .25);

    &:hover {
        cursor: pointer;
        box-shadow: 0 1px 2px rgba(0, 0, 0, .25);
        color: lightsalmon;
        background-color: maroon;
    }
`;

export default Button;

