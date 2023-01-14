import { makeAutoObservable } from 'mobx';

class ToolState {
  private tool = null;

  constructor() {
    makeAutoObservable(this);
  }

  public setTool(toll: any) {
    this.tool = toll;
  }
}

export default new ToolState();
