import { makeAutoObservable } from 'mobx';

class CanvasState {
  private canvas = null;

  constructor() {
    makeAutoObservable(this);
  }

  public setCanvas(canvas: any) {
    this.canvas = canvas;
  }
}

export default new CanvasState();
