import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 
    *, *::before, *::after{
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        font-family: 'Roboto', sans-serif;
    }

    html {
        font-size: 62.5%;
    }

    body {
        font-size: 1.6rem;
        background-color: #1A1A1A;
        padding: 40px;
        font-family: 'Roboto', sans-serif;
        margin: 0;
    }
`;

export default GlobalStyle;
