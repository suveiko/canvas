import { FC } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { Canvas } from 'components/canvas';
import { SettingBar } from 'components/setting-bar';
import { Toolbar } from 'components/toolbar';

const PATH = 16;

export const RoutesPage: FC = () => (
  <Routes>
    <Route
      path="/:id"
      element={
        <>
          <Toolbar />
          <SettingBar />
          <Canvas />
        </>
      }
    />
    <Route path="/" element={<Navigate to={`f${(+new Date()).toString(PATH)}`} />} />
  </Routes>
);
