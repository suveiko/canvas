import { RefObject } from 'react';

import canvasState from 'store/canvasState';
import toolState from 'store/toolState';
import { Brush } from 'tools/brush';
import { CanvasObject, Methods } from 'types/types';

export const socketApi = (
  id?: string,
  canvasRef?: RefObject<HTMLCanvasElement>,
  drawHandler?: (msq: CanvasObject) => void,
) => {
  const socket = new WebSocket('ws://localhost:3000/');

  canvasState.setSocket(socket);
  if (id) {
    toolState.setTool(new Brush(canvasRef!.current, socket, id));
    canvasState.setSessionId(id);
  }

  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        id,
        username: canvasState.username,
        method: Methods.CONNECTION,
      }),
    );
  };

  socket.onmessage = (event: MessageEvent) => {
    const msq = JSON.parse(event.data);

    switch (msq.method) {
      case Methods.CONNECTION:
        break;
      case Methods.DRAW:
        if (drawHandler) {
          drawHandler(msq);
        }
        break;
      default:
        break;
    }
  };
};
