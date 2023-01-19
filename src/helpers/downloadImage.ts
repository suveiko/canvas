import canvasState from 'store/canvasState';

export const downloadImage = () => {
  const dataURL = canvasState.canvas?.toDataURL();

  console.log(dataURL);
  if (!dataURL) {
    return;
  }

  const a = document.createElement('a');

  a.href = dataURL;
  a.download = `${canvasState.sessionId}.jpg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
