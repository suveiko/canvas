import { Tool } from './tool';

import { Nullable } from 'types/types';

export class Rect extends Tool {
  private target!: HTMLElement;

  private mouseDown!: boolean;

  private startX!: number;

  private startY!: number;

  private saved!: string;

  private width!: number;

  private height!: number;

  constructor(
    protected readonly canvas: Nullable<HTMLCanvasElement>,
    protected readonly socket: WebSocket,
    protected readonly id: string,
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
            type: 'rect',
            x: this.startX,
            y: this.startY,
            width: this.width,
            height: this.height,
          },
        }),
      );
    }
  }

  private mouseDownHandler(event: MouseEvent) {
    this.mouseDown = true;
    this.target = event.target as HTMLElement;

    this.startX = event.pageX - this.target.offsetLeft;
    this.startY = event.pageY - this.target.offsetTop;

    if (this.ctx) {
      this.ctx.beginPath();
    }
  }

  private mouseMoveHandler(event: MouseEvent) {
    this.target = event.target as HTMLElement;

    const currentX = event.pageX - this.target.offsetLeft;
    const currentY = event.pageY - this.target.offsetTop;

    this.width = currentX - this.startX;
    this.height = currentY - this.startY;

    if (this.canvas) {
      this.saved = this.canvas.toDataURL();
    }

    if (this.mouseDown) {
      this.draw(this.startX, this.startY, this.width, this.height);
    }
  }

  private draw(x: number, y: number, w: number, h: number) {
    const image = new Image();

    image.src = this.saved;
    image.onload = async () => {
      if (this.ctx && this.canvas) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.fill();
        this.ctx.stroke();
      }
    };
  }

  public static staticDraw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
  ) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
    ctx.stroke();
  }
}
