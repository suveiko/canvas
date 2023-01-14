import { FC } from 'react';
import 'styles/toolbar.scss';

const STYLES = [
  'brush',
  'rect',
  'circle',
  'eraser',
  'line',
  'rainbow-rect',
  'undo',
  'redo',
  'save',
];

export const Toolbar: FC = () => (
  <div className="tool-bar">
    {STYLES.map(style => (
      <button
        aria-label="button"
        key={style}
        type="button"
        className={`tool-bar__btn ${style}`}
      />
    ))}
    <input type="color" />
  </div>
);
