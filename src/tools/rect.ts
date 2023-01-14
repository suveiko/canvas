import { Tool } from './tool';

import { Nullable } from 'types/types';

export class Rect extends Tool {
  private target!: HTMLElement;

  private mouseDown!: boolean;

  private startX!: number;

  private startY!: number;

  private saved!: string;

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
    const width = currentX - this.startX;
    const height = currentY - this.startY;

    if (this.canvas) {
      this.saved = this.canvas.toDataURL();
    }

    if (this.mouseDown) {
      this.draw(this.startX, this.startY, width, height);
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
}
