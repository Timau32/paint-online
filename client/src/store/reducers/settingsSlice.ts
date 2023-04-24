import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ISettings from '../../interfaces/ISettings';

const initialState: ISettings = {
  lineWidth: 1,
  strokeColor: '#000000',
  fillColor: '#cccccc',
  id: '',
};

export const settingsSlice = createSlice({
  initialState,
  name: 'settings',
  reducers: {
    setLineWidth(state, action: PayloadAction<number>) {
      state.lineWidth = action.payload;
    },

    setStrokeColor(state, action: PayloadAction<string>) {
      state.strokeColor = action.payload;
    },

    setFillColor(state, action: PayloadAction<string>) {
      state.fillColor = action.payload;
    },

    setSessionId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
  },
});

const settingsReducer = settingsSlice.reducer;
export const { setFillColor, setStrokeColor, setLineWidth, setSessionId } = settingsSlice.actions;

export default settingsReducer;
