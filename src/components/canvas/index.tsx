import 'styles/canvas.scss';
import { useEffect, useRef } from 'react';

import { observer } from 'mobx-react-lite';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from 'constants/canvas';
import canvasState from 'store/canvasState';
import toolState from 'store/toolState';
import { Brush } from 'tools/brush';

export const Canvas = observer(() => {
  const canvasRef = useRef(null);

  const mouseDownHandler = () => {
    const currentRef = canvasRef.current as unknown as HTMLCanvasElement;

    canvasState.pushToUndo(currentRef.toDataURL());
  };

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, []);

  return (
    <div className="canvas">
      <canvas
        onMouseDown={mouseDownHandler}
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />
    </div>
  );
});
