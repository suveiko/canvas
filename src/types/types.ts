export type Nullable<T> = T | null;

export interface CanvasObject {
  id: string;
  username: string;
  figure?: Figure;
  method?: Methods;
}

export interface Figure {
  type: Draw;
  x: number;
  y: number;
  height: number;
  width: number;
}

export enum Methods {
  CONNECTION = 'connection',
  DRAW = 'draw',
}

export enum Draw {
  BRUSH = 'brush',
  FINISH = 'finish',
  RECT = 'rect',
}
