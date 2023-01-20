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

  public undo() {
    const ctx = this.canvas!.getContext('2d');

    if (this.undoList.length) {
      this.undoAndRedoWriter(this.undoList, this.redoList, ctx);
    } else {
      ctx!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
    }
  }

  public redo() {
    const ctx = this.canvas!.getContext('2d');

    if (this.redoList.length) {
      this.undoAndRedoWriter(this.redoList, this.undoList, ctx);
    }
  }

  private undoAndRedoWriter(
    undoList: string[],
    redoList: string[],
    ctx: Nullable<CanvasRenderingContext2D>,
  ) {
    const dataUrl = undoList.pop();

    if (ctx && dataUrl) {
      redoList.push(this.canvas!.toDataURL());
      const image = new Image();

      image.src = dataUrl;
      image.onload = () => {
        ctx!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
        ctx!.drawImage(image, 0, 0, this.canvas!.width, this.canvas!.height);
      };
    }
  }
}

export default new CanvasState();
