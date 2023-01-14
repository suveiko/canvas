import { ChangeEvent, FC } from 'react';

import 'styles/toolbar.scss';

import canvasState from 'store/canvasState';
import toolState from 'store/toolState';
import { Brush } from 'tools/brush';
import { Circle } from 'tools/circle';
import { Eraser } from 'tools/eraser';
import { Line } from 'tools/line';
import { Rect } from 'tools/rect';

const BUTTONS = [
  {
    className: 'brush',
    onClick: () =>
      toolState.setTool(
        new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId),
      ),
  },
  {
    className: 'rect',
    onClick: () =>
      toolState.setTool(
        new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionId),
      ),
  },
  {
    className: 'circle',
    onClick: () =>
      toolState.setTool(
        new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionId),
      ),
  },
  {
    className: 'eraser',
    onClick: () =>
      toolState.setTool(
        new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionId),
      ),
  },
  {
    className: 'line',
    onClick: () =>
      toolState.setTool(
        new Line(canvasState.canvas, canvasState.socket, canvasState.sessionId),
      ),
  },
  {
    className: 'rainbow-rect',
    onClick: () => {},
  },
  {
    className: 'undo',
    onClick: () => canvasState.undo(),
  },
  {
    className: 'redo',
    onClick: () => canvasState.redo(),
  },
  {
    className: 'save',
    onClick: () => {},
  },
] as const;

export const Toolbar: FC = () => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    toolState.setFillColor(event.currentTarget.value);
    toolState.setStrokeColor(event.currentTarget.value);
  };

  return (
    <div className="tool-bar">
      {BUTTONS.map(({ className, onClick }) => (
        <button
          aria-label="button"
          key={className}
          type="button"
          onClick={onClick}
          className={`tool-bar__btn ${className}`}
        />
      ))}
      <input type="color" onChange={onChange} />
    </div>
  );
};
