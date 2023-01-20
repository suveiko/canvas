import { PATH } from 'components/routes-page/constants';
import canvasState from 'store/canvasState';

export const downloadImage = () => {
  const dataURL = canvasState.canvas?.toDataURL();

  if (!dataURL) {
    return;
  }

  const a = document.createElement('a');

  a.href = dataURL;
  a.download = `${(+new Date()).toString(PATH)}.jpg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
