import { Brush } from 'tools/brush';
import { Rect } from 'tools/rect';
import { Draw, Figure, Nullable } from 'types/types';

export const drawFigure = (ctx?: Nullable<CanvasRenderingContext2D>, figure?: Figure) => {
  switch (figure!.type) {
    case Draw.BRUSH:
      if (ctx) {
        Brush.draw(ctx, figure!.x, figure!.y);
      }
      break;
    case Draw.FINISH:
      if (ctx) {
        ctx.beginPath();
      }
      break;
    case Draw.RECT:
      if (ctx) {
        Rect.staticDraw(ctx, figure!.x, figure!.y, figure!.width, figure!.height);
      }
      break;
    default:
      break;
  }
};
