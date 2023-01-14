import { makeAutoObservable } from 'mobx';

import { Tool } from 'tools/tool';

class ToolState {
  private tool!: Tool;

  constructor() {
    makeAutoObservable(this);
  }

  public setTool(toll: Tool) {
    this.tool = toll;
  }

  public setFillColor(color: string) {
    this.tool.fillColor = color;
  }

  public setStrokeColor(color: string) {
    this.tool.strokeColor = color;
  }

  public setLineWidth(width: number) {
    this.tool.lineWidth = width;
  }
}

export default new ToolState();
