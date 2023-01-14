import { makeAutoObservable } from 'mobx';

import { Nullable } from 'types/types';

class CanvasState {
  public canvas!: Nullable<HTMLCanvasElement>;

  protected undoList: string[] = [];

  protected redoList: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public setCanvas(canvas: Nullable<HTMLCanvasElement>) {
    this.canvas = canvas;
  }

  public pushToUndo(data: string) {
    this.undoList.push(data);
  }

  public pushToRedo(data: string) {
    this.redoList.push(data);
  }
}

export default new CanvasState();
