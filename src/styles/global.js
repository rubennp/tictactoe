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
        align-items: stretch;
        height: 100%;

        header, section, footer {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
        }

        section p {
            margin: 0 0 2.5em; 
            font-size: 1.5em;
            color: darkslategrey;
        }

        footer {
            padding: 2em;
            flex-direction: row;

            * {
                margin: .1em;
            }

            p {
                font-size: .75em;
                font-family: 'Courier New', Courier, monospace
            }
        }
    }

    .guanya {
        background-color: oldlace;
        color: olivedrab;

        span { font-size: 48px; }
    }

    h1 {
        font-size: 1vw;
        font-weight: 700;
        font-size: 5rem;
        color: lightsalmon;
        text-shadow: 1px 1px 1px black;
    }

    p {
        font-weight: 400;
        font-size: 2vw;
    }

    span { vertical-align: middle; }
`;