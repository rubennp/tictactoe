import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Cabin Sketch', cursive;
        text-align: center;
        margin: 0;
        padding: 0;
    }

    html, body, div#root {
        height: 100%;
        width: 100%;
    }

    button {
        border: none;
    }

    main {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: .5fr 1fr 1fr .5fr;
        justify-items: center;
        align-items: center;
        height: 100%;

        header, section, footer {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
        }

        header h1 {
            font-weight: 700;
            font-size: 5rem;
            color: lightsalmon;
            text-shadow: 1px 1px 1px black;
        }

        section header p {  // info botons
            padding: 2em;
            font-weight: 400;
            font-size: 1.5em;
        }

        footer {
            padding: 2em;
            flex-direction: row;

            * {
                margin: .1em;
            }
        }
    }

    .guanya {
        background-color: oldlace;
        color: olivedrab;
        font-size: 60px;
    }
`;