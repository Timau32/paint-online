import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

const undoCreator = createAsyncThunk('canvas/undo', (canvas: HTMLCanvasElement, thunkApi) => {
  const { toolReducer } = thunkApi.getState() as RootState;
  const { undo } = toolReducer;

  const context = canvas.getContext('2d');
  const dataUrl = undo[undo.length - 1];
  const redoImg = canvas.toDataURL();
  context?.clearRect(0, 0, canvas.width, canvas.height);

  if (undo.length === 0) return 'empty';

  const img = new Image();
  img.src = dataUrl as string;
  img.onload = () => context?.drawImage(img, 0, 0, canvas!.width, canvas!.height);

  return redoImg;
});

const redoCreator = createAsyncThunk('canvas/redo', (canvas: HTMLCanvasElement, thunkApi) => {
  const { toolReducer } = thunkApi.getState() as RootState;
  const { redo } = toolReducer;
  const context = canvas.getContext('2d');
  const dataUrl = redo[redo.length - 1];

  if (redo.length === 0 || !dataUrl) return 'empty';

  const undoImg = canvas.toDataURL();
  context?.clearRect(0, 0, canvas.width, canvas.height);

  const img = new Image();
  img.src = dataUrl as string;
  img.onload = () => context?.drawImage(img, 0, 0, canvas.width, canvas.height);

  return undoImg;
});

export { undoCreator, redoCreator };

