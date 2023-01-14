import { Brush } from './brush';

import { Nullable } from 'types/types';

export class Eraser extends Brush {
  constructor(
    protected canvas: Nullable<HTMLCanvasElement>,
    protected socket: WebSocket,
    protected id: string,
  ) {
    super(canvas, socket, id);
  }

  protected draw(x: number, y: number) {
    if (this.ctx) {
      this.ctx.strokeStyle = 'white';
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
  }
}
