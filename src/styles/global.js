import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html, body, div#root {
        height: 100%;
        width: 100%;
        margin: 0;
    }

    main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        color: white;
    }
`;