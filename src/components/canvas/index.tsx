import 'styles/canvas.scss';
import { useEffect, useRef, useState } from 'react';

import { Button, Input, Modal } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from 'constants/canvas';
import canvasState from 'store/canvasState';
import toolState from 'store/toolState';
import { Brush } from 'tools/brush';
import { CanvasObject } from 'types/types';

export const Canvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const [modal, setModal] = useState(true);

  const { id } = useParams();

  const mouseDownHandler = () => {
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

    switch (figure!.type) {
      case 'brush':
        if (ctx) {
          Brush.draw(ctx, figure!.x, figure!.y);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket('ws://localhost:3000/');

      canvasState.setSocket(socket);
      if (id) {
        toolState.setTool(new Brush(canvasRef.current, socket, id));
        canvasState.setSessionId(id);
      }

      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            id,
            username: canvasState.username,
            method: 'connection',
          }),
        );
      };

      socket.onmessage = (event: MessageEvent) => {
        const msq = JSON.parse(event.data);

        switch (msq.method) {
          case 'connection':
            break;
          case 'draw':
            drawHandler(msq);
            break;
          default:
            break;
        }
      };
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
