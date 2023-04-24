import { MouseEvent, ChangeEvent } from 'react';

import { setTool, setTriggerRedo, setTriggerSave, setTriggerUndo } from '../store/reducers/toolSlice';
import { setFillColor } from '../store/reducers/settingsSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import tools from '../interfaces/toolsType';
import '../styles/toolbar.scss';

const Toolbar = () => {
  const { fillColor } = useAppSelector((state) => state.settingsReducer)
  const dispatch = useAppDispatch();
  const onBtnClick = (event: MouseEvent<HTMLButtonElement>) => {
    const { dataset } = event.target as HTMLButtonElement;
    dispatch(setTool(dataset.type as tools));
  };

  const onColorChange = (event: ChangeEvent<HTMLInputElement>) => dispatch(setFillColor(event.target.value));

  const onUndoClick = () => dispatch(setTriggerUndo());
  const onRedoclick = () => dispatch(setTriggerRedo());
  const onSaveClick = () => dispatch(setTriggerSave());

  return (
    <div className="toolbar">
      <button className="toolbar__btn" onClick={onBtnClick}>
        <i data-type="Brush" className="fa-solid fa-paintbrush"></i>
      </button>
      <button className="toolbar__btn rect" data-type="Rect" onClick={onBtnClick}></button>
      <button className="toolbar__btn" onClick={onBtnClick}>
        <i className="fa-regular fa-circle" data-type="Circle"></i>
      </button>
      <button className="toolbar__btn lastik" data-type="Lastik" onClick={onBtnClick} />
      <button className="toolbar__btn line" data-type="Line" onClick={onBtnClick} />
      <input type="color" className="toolbar__btn" value={fillColor} onChange={onColorChange} />
      <button className="toolbar__btn undo" onClick={onUndoClick} />
      <button className="toolbar__btn redo" onClick={onRedoclick} />
      <button className="toolbar__btn save" onClick={onSaveClick} />
    </div>
  );
};

export default Toolbar;
