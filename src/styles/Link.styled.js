import styled from "styled-components";

const Link = styled.a`
    text-decoration: none;

    &.social {
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
    }

    &.bio {
        display: flex;
        align-items: center;

        p {
            white-space: nowrap;
            visibility: hidden;
            text-overflow: clip;
            opacity: 0;
            width: 0;
            color: #afafaf;
            transition: width 1s, visibility 1s, opacity .25s linear;
        }

        &:hover p {
            visibility: visible;
            opacity: 1;
            width: 100%;
        }

        img {
            position: relative;
            height: 55px;
            width: 55px;
            object-fit: contain;
            border-radius: 100%;
            box-shadow: 1px 1px 5px 1px rgba(0,0,0, .5);

            &:hover {
                content: url("./img/ruben-emoji-2.png");
                box-shadow: 1px 1px 5px rgba(0,0,0, .2);
            }
        }
    }
`;

export default Link;