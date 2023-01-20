import canvasState from 'store/canvasState';

const RANDOM = 16;

export const downloadImage = () => {
  const dataURL = canvasState.canvas?.toDataURL();

  if (!dataURL) {
    return;
  }

  const a = document.createElement('a');

  a.href = dataURL;
  a.download = `${(+new Date()).toString(RANDOM)}.jpg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
