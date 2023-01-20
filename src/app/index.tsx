import { FC } from 'react';

import 'styles/app.scss';

import { Canvas } from 'components/canvas';
import { SettingBar } from 'components/setting-bar';
import { Toolbar } from 'components/toolbar';

export const App: FC = () => (
  <div className="app">
    <Toolbar />
    <SettingBar />
    <Canvas />
  </div>
);
