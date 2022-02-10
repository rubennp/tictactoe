import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html, body, div#root {
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
    }

    .guanya {
        background-color: lightgrey;
        font-size: 3.5rem !important;
    }
`;