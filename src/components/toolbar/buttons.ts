import { downloadImage } from 'helpers/downloadImage';
import canvasState from 'store/canvasState';
import toolState from 'store/toolState';
import { Brush } from 'tools/brush';
import { Circle } from 'tools/circle';
import { Eraser } from 'tools/eraser';
import { Line } from 'tools/line';
import { Rect } from 'tools/rect';

export const BUTTONS = [
  {
    className: 'brush',
    onClick: () => toolState.setTool(new Brush(canvasState.canvas)),
  },
  {
    className: 'rect',
    onClick: () => toolState.setTool(new Rect(canvasState.canvas)),
  },
  {
    className: 'circle',
    onClick: () => toolState.setTool(new Circle(canvasState.canvas)),
  },
  {
    className: 'eraser',
    onClick: () => toolState.setTool(new Eraser(canvasState.canvas)),
  },
  {
    className: 'line',
    onClick: () => toolState.setTool(new Line(canvasState.canvas)),
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
    onClick: () => downloadImage(),
  },
] as const;
