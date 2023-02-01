import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './styles/GlobalStyle';
import Theme from './styles/Theme';
import { ThemeProvider } from 'styled-components';

import Routes from './Routes';

ReactDOM.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={Theme}>
      <Routes />
    </ThemeProvider>
  </>,

  document.getElementById('root')
);
