import normalize from 'emotion-normalize';

import { css, Global } from '@emotion/react';

export const GlobalStyle = () => (
  <Global
    styles={css`
      ${normalize}

      * {
        font-family: 'Rajdhani', sans-serif;
        box-sizing: border-box;
        word-break: keep-all;
      }

      html {
        background-color: #000;
      }

      body {
        margin: 0;
      }

      a {
        text-decoration: none;
        cursor: pointer;
      }

      img {
        user-select: none;
        user-drag: none;
        -webkit-user-drag: none;
      }

      input {
        outline: 0;
      }

      button {
        border: 0;
        outline: 0;
        background-color: transparent;
        cursor: pointer;
      }

      &::selection {
        color: rgba(255, 255, 255, 0.65);
        -webkit-text-fill-color: rgba(255, 255, 255, 0.65);
        background-color: #373fff;
      }
    `}
  />
);
