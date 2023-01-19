import { Brush } from './brush';

import { Nullable } from 'types/types';

export class Eraser extends Brush {
  constructor(
    protected readonly canvas: Nullable<HTMLCanvasElement>,
    protected readonly socket: WebSocket,
    protected readonly id: string,
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
