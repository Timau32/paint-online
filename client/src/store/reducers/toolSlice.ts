import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import tools from '../../interfaces/toolsType';
import { undoCreator, redoCreator } from '../actionCreators/Canvas';

type ToolState = {
  tool: tools;
  undo: string[];
  redo: string[];
  triggerUndo: number;
  triggerRedo: number;
  username: string;
  triggerSave: number;
};

const initialState: ToolState = {
  tool: 'Brush',
  undo: [''],
  redo: [''],
  triggerRedo: 0,
  triggerUndo: 0,
  username: '',
  triggerSave: 0,
};

export const toolSlice = createSlice({
  initialState,
  name: 'tool',
  reducers: {
    setTool(state, action: PayloadAction<tools>) {
      state.tool = action.payload;
    },

    setTriggerUndo(state) {
      state.triggerUndo += 1;
    },

    setTriggerRedo(state) {
      state.triggerRedo += 1;
    },

    setTriggerSave(state) {
      state.triggerSave += 1;
    },

    setUndo(state, action: PayloadAction<string>) {
      state.undo.push(action.payload);
    },

    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },

  extraReducers: (buidlder) => {
    buidlder.addCase(undoCreator.fulfilled.type, (state, action: PayloadAction<string>) => {
      if (action.payload !== 'empty') {
        state.redo.push(action.payload);
        state.undo.pop();
      }
    });

    buidlder.addCase(redoCreator.fulfilled.type, (state, action: PayloadAction<string>) => {
      if (action.payload !== 'empty') {
        state.undo.push(action.payload);
        state.redo.pop();
      }
    });
  },
});

const toolReducer = toolSlice.reducer;
export const { setTool, setTriggerRedo, setTriggerUndo, setUndo, setUsername, setTriggerSave } = toolSlice.actions;

export default toolReducer;
