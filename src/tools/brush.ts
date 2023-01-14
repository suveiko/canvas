import { Tool } from './tool';

import { Nullable } from 'types/types';

export class Brush extends Tool {
  private target!: HTMLElement;

  private mouseDown!: boolean;

  constructor(
    protected canvas: Nullable<HTMLCanvasElement>,
    protected socket: WebSocket,
    protected id: string,
  ) {
    super(canvas, socket, id);

    this.listen();
  }

  private listen() {
    if (this.canvas) {
      this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
      this.canvas.onmousedown = this.mouseDownHandler.bind(this);
      this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    }
  }

  private mouseUpHandler(event: MouseEvent) {
    this.target = event.target as HTMLElement;
    this.mouseDown = false;

    if (this.mouseDown) {
      this.socket.send(
        JSON.stringify({
          method: 'draw',
          id: this.id,
          figure: {
            type: 'finish',
          },
        }),
      );
    }
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
      this.socket.send(
        JSON.stringify({
          method: 'draw',
          id: this.id,
          figure: {
            type: 'brush',
            x: event.pageX - this.target.offsetLeft,
            y: event.pageY - this.target.offsetTop,
          },
        }),
      );
    }
  }

  static draw(ctx: Nullable<CanvasRenderingContext2D>, x: number, y: number) {
    ctx!.lineTo(x, y);
    ctx!.stroke();
  }
}
