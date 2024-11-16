import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface QueryState {
  value: string;
}

const initialState: QueryState = {
  value: '',
};

export const querySlice = createSlice({
  name: 'queries',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setQuery } = querySlice.actions;

export default querySlice.reducer;
