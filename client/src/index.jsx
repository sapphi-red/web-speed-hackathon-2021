import React from 'react';
import { render, hydrate } from 'react-dom';

import { AppContainer } from './containers/AppContainer';
import { ActiveUserProvider } from './providers/ActiveUserProvider';
import { ModalTypeProvider } from './providers/ModalTypeProvider';
import { OnReachBottomProvider } from './providers/OnReachBottomProvider';

const app = (
  <ActiveUserProvider>
    <ModalTypeProvider>
      <OnReachBottomProvider>
        <AppContainer />
      </OnReachBottomProvider>
    </ModalTypeProvider>
  </ActiveUserProvider>
);
const root = document.querySelector('#app');

if (location.pathname === '/terms') {
  hydrate(app, root);
} else {
  render(app, root);
}
