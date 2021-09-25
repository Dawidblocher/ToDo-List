import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  
    *, *::before, *::after{
        box-sizing: border-box;
    }

    html {
        font-size: 62.5%;
    }

    body {
        font-size: 1.6rem;
        background-color: #1A1A1A;
        padding: 40px;
        font-family: 'Roboto', sans-serif;
    }
`;

export default GlobalStyle;
