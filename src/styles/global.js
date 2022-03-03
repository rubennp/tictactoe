import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html, body, div#root {
        font-family: 'Cabin Sketch', cursive;
        text-align: center;
        height: 100%;
        width: 100%;
        margin: 0;
    }

    main {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        justify-items: center;
        align-items: center;
        height: 100%;

        section {
            display: flex;
            flex-direction: column;
            justify-items: flex-end;
            align-items: center;

            p { 
                margin: 0 0 2.5em; 
                font-size: 1.5em;
                color: darkslategrey;
            }
        }

        footer {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
        }
    }

    .guanya {
        background-color: oldlace;
        color: olivedrab;

        span {
            font-size: 48px;
        }
    }

    h1 {
        font-weight: 700;
        font-size: 5rem;
        color: lightsalmon;
        text-shadow: 1px 1px 1px black;
    }

    p {
        font-weight: 400;
        font-size: 2rem;
    }

    span { vertical-align: middle; }
`;