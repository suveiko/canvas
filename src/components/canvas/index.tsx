import 'styles/canvas.scss';
import { useEffect, useRef, useState } from 'react';

import { Button, Input, Modal } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import { socketApi } from 'api/socket-api';
import { drawFigure } from 'helpers/drawFigure';
import canvasState from 'store/canvasState';
import { CanvasObject } from 'types/types';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from './contants';

export const Canvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const [modal, setModal] = useState(true);

  const { id } = useParams();

  const mouseDownHandler = async () => {
    if (canvasRef.current) {
      canvasState.pushToUndo(canvasRef.current.toDataURL());
    }
  };

  const connectHandler = () => {
    if (userNameRef.current) {
      canvasState.setUserName(userNameRef.current.value);
    }

    setModal(false);
  };

  const drawHandler = (msq: CanvasObject) => {
    const { figure } = msq;
    let ctx;

    if (canvasRef.current) {
      ctx = canvasRef.current.getContext('2d');
    }

    drawFigure(ctx, figure);
  };

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      socketApi(id, canvasRef, drawHandler);
    }
  }, [canvasState.username]);

  return (
    <div className="canvas">
      <Modal opened={modal} onClose={() => {}} title="Introduce yourself!">
        <Input type="text" placeholder="Your name" ref={userNameRef} />
        <Button className="button" onClick={connectHandler}>
          Enter
        </Button>
      </Modal>
      <canvas
        onMouseDown={mouseDownHandler}
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />
    </div>
  );
});
