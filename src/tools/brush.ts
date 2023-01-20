import { Tool } from './tool';

import { Nullable } from 'types/types';

export class Brush extends Tool {
  private target!: HTMLElement;

  private mouseDown!: boolean;

  constructor(protected canvas: Nullable<HTMLCanvasElement>) {
    super(canvas);

    this.listen();
  }

  private listen() {
    if (this.canvas) {
      this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
      this.canvas.onmousedown = this.mouseDownHandler.bind(this);
      this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    }
  }

  private mouseUpHandler() {
    this.mouseDown = false;
  }

  private mouseDownHandler(event: MouseEvent) {
    this.mouseDown = true;
    this.target = event.target as HTMLElement;

    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.moveTo(
        event.pageX - this.target.offsetLeft,
        event.pageY - this.target.offsetTop,
      );
    }
  }

  private mouseMoveHandler(event: MouseEvent) {
    this.target = event.target as HTMLElement;

    if (this.mouseDown) {
      this.draw(
        event.pageX - this.target.offsetLeft,
        event.pageY - this.target.offsetTop,
      );
    }
  }

  protected draw(x: number, y: number) {
    if (this.ctx) {
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
  }
}
