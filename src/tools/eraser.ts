import { Brush } from './brush';

import { Nullable } from 'types/types';

export class Eraser extends Brush {
  constructor(protected canvas: Nullable<HTMLCanvasElement>) {
    super(canvas);
  }

  protected draw(x: number, y: number) {
    if (this.ctx) {
      this.ctx.strokeStyle = 'white';
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
  }
}
