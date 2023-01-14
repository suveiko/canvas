import { Nullable } from 'types/types';

export class Tool {
  protected ctx: Nullable<CanvasRenderingContext2D>;

  protected socket!: WebSocket;

  protected id = '';

  constructor(
    protected canvas: Nullable<HTMLCanvasElement>,
    protected webSocket: WebSocket,
    protected userId: string,
  ) {
    this.canvas = canvas;
    this.ctx = canvas!.getContext('2d');
    this.socket = webSocket;
    this.id = userId;

    this.destroyEvents();
  }

  public set fillColor(color: string) {
    this.ctx!.fillStyle = color;
  }

  public set strokeColor(color: string) {
    this.ctx!.strokeStyle = color;
  }

  public set lineWidth(width: number) {
    this.ctx!.lineWidth = width;
  }

  private destroyEvents() {
    if (this.canvas) {
      this.canvas.onmousemove = null;
      this.canvas.onmousedown = null;
      this.canvas.onmouseup = null;
    }
  }
}
