import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'error',
  initialState: null,
  reducers: {
    showError: (state, action) => action.payload,
    clearError: () => null
  },
});

export const { showError, clearError } = errorSlice.actions;
export default errorSlice.reducer;