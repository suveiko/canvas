import { FC } from 'react';

import 'styles/toolbar.scss';
import toolState from 'store/toolState';

const MIN_LINE_WIDTH = 1;
const MAX_LINE_WIDTH = 50;

export const SettingBar: FC = () => (
  <div className="setting-bar">
    <label htmlFor="line-width">Line width</label>
    <input
      onChange={event => toolState.setLineWidth(event.currentTarget.valueAsNumber)}
      id="line-width"
      type="number"
      defaultValue={MIN_LINE_WIDTH}
      min={MIN_LINE_WIDTH}
      max={MAX_LINE_WIDTH}
    />
    <label htmlFor="stroke-color">Line color</label>
    <input
      onChange={event => toolState.setStrokeColor(event.currentTarget.value)}
      id="stroke-color"
      type="color"
    />
  </div>
);
