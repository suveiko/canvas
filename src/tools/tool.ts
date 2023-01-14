import { Nullable } from 'types/types';

export class Tool {
  protected ctx: Nullable<CanvasRenderingContext2D>;

  constructor(protected canvas: Nullable<HTMLCanvasElement>) {
    this.canvas = canvas;
    this.ctx = canvas!.getContext('2d');

    this.destroyEvents();
  }

  private destroyEvents() {
    if (this.canvas) {
      this.canvas.onmousemove = null;
      this.canvas.onmousedown = null;
      this.canvas.onmouseup = null;
    }
  }
}
