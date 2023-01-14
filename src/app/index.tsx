import { FC } from 'react';

import 'styles/app.scss';

import { BrowserRouter } from 'react-router-dom';

import { RoutesPage } from 'components/routes-page';

export const App: FC = () => (
  <BrowserRouter>
    <div className="app">
      <RoutesPage />
    </div>
  </BrowserRouter>
);
