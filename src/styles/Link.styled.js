import styled from "styled-components";

const Link = styled.a`
    text-decoration: none;

    &.social {
        * {
            color: black;
        }

        svg {
            border-radius: .5em;
            background-color: #f0f0f0;
            padding: .5em;

            &:hover {
                * {
                    color: white;
                }

                background-color: black;
            }
        }
    }

    &.bio {
        display: flex;
        align-items: center;

        p {
            text-overflow: clip;
            white-space: nowrap;
            opacity: 0;
            width: 0;
            color: #afafaf;
            transform: translateX(50px);
            transition: transform .25s, width 0s, opacity .25s ease-out;
        }

        &:hover p {
            width: 100%;
            opacity: 1;
            transform: translateX(0);
        }

        img {
            height: 50px;
            width: 50px;
            object-fit: contain;
            border-radius: 100%;
            box-shadow: 1px 1px 5px rgba(0,0,0, .5);
            transition: box-shadow .1s linear;
        }

        &:hover img {
            content: url("./img/ruben-emoji-2.png");
            box-shadow: 1px 1px 50px 0px dodgerblue;
            transform: rotate(-2deg);
        }
    }
`;

export default Link;