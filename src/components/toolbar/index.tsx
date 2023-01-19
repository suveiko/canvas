import { ChangeEvent, FC } from 'react';

import 'styles/toolbar.scss';
import { BUTTONS } from './buttons';

import toolState from 'store/toolState';

export const Toolbar: FC = () => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    toolState.setFillColor(event.currentTarget.value);
    toolState.setStrokeColor(event.currentTarget.value);
  };

  return (
    <div className="tool-bar">
      {BUTTONS.map(({ className, onClick }) => (
        <button
          aria-label="button"
          key={className}
          type="button"
          onClick={onClick}
          className={`tool-bar__btn ${className}`}
        />
      ))}
      <input type="color" onChange={onChange} />
    </div>
  );
};
