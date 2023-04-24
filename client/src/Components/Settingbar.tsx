import { ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setLineWidth, setStrokeColor } from '../store/reducers/settingsSlice';
import '../styles/toolbar.scss';

const Settingbar = () => {
  const { strokeColor, lineWidth } = useAppSelector((state) => state.settingsReducer);
  const dispatch = useAppDispatch();

  const onLineChange = (event: ChangeEvent<HTMLInputElement>) => dispatch(setLineWidth(+event.target.value));
  const onStrokeChange = (event: ChangeEvent<HTMLInputElement>) => dispatch(setStrokeColor(event.target.value));
  return (
    <div className="setting-bar">
      <label htmlFor="line-width"> Толщина линии </label>
      <input type="number" id="line-width" max={50} min={1} onChange={onLineChange} value={lineWidth} />
      <label htmlFor="stroke-color"> Цвет обводки </label>
      <input type="color" id="stroke-color" value={strokeColor} onChange={onStrokeChange} />
    </div>
  );
};

export default Settingbar;
