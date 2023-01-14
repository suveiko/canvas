import { FC } from 'react';

import 'styles/canvas.scss';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from 'constants/canvas';

export const Canvas: FC = () => (
  <div className="canvas">
    <canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
  </div>
);
