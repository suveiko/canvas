import { Tool } from './tool';

import { Nullable } from 'types/types';

const TWO = 2;

export class Circle extends Tool {
  private target!: HTMLElement;

  private mouseDown!: boolean;

  private startX!: number;

  private startY!: number;

  private saved!: string;

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

  private mouseUpHandler() {
    this.mouseDown = false;
  }

  private mouseDownHandler(event: MouseEvent) {
    this.target = event.target as HTMLElement;
    this.mouseDown = true;
    const canvasData = this.canvas!.toDataURL();

    if (this.ctx) {
      this.ctx.beginPath();
      this.startX = event.pageX - this.target.offsetLeft;
      this.startY = event.pageY - this.target.offsetTop;
      this.saved = canvasData;
    }
  }

  private mouseMoveHandler(event: MouseEvent) {
    this.target = event.target as HTMLElement;

    if (this.mouseDown) {
      const currentX = event.pageX - this.target.offsetLeft;
      const currentY = event.pageY - this.target.offsetTop;
      const width = currentX - this.startX;
      const height = currentY - this.startY;
      const radius = Math.sqrt(width ** TWO + height ** TWO);

      this.draw(this.startX, this.startY, radius);
    }
  }

  private draw(x: number, y: number, radius: number) {
    const image = new Image();

    image.src = this.saved;
    image.onload = () => {
      if (this.ctx && this.canvas) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, TWO * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
      }
    };
  }
}
