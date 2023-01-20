import { Tool } from './tool';

import { Nullable } from 'types/types';

export class Line extends Tool {
  private target!: HTMLElement;

  private name: string;

  private currentX!: number;

  private currentY!: number;

  private mouseDown!: boolean;

  private saved!: string;

  constructor(protected readonly canvas: Nullable<HTMLCanvasElement>) {
    super(canvas);
    this.listen();
    this.name = 'Line';
  }

  listen() {
    this.canvas!.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas!.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas!.onmousemove = this.mouseMoveHandler.bind(this);
  }

  mouseDownHandler(event: MouseEvent) {
    this.target = event.target as HTMLElement;

    this.mouseDown = true;
    this.currentX = event.pageX - this.target.offsetLeft;
    this.currentY = event.pageY - this.target.offsetTop;
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.currentX, this.currentY);
    }

    this.saved = this.canvas!.toDataURL();
  }

  mouseUpHandler() {
    this.mouseDown = false;
  }

  mouseMoveHandler(event: MouseEvent) {
    this.target = event.target as HTMLElement;

    if (this.mouseDown) {
      this.draw(
        event.pageX - this.target.offsetLeft,
        event.pageY - this.target.offsetTop,
      );
    }
  }

  draw(x: number, y: number) {
    const image = new Image();

    image.src = this.saved;
    image.onload = () => {
      if (this.ctx && this.canvas) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.moveTo(this.currentX, this.currentY);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
      }
    };
  }
}
