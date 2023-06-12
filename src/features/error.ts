import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
  errors: string[];
}

const initialState: ErrorState = {
  errors: []
};

const errorSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    pushError: (state, action: PayloadAction<string>) => {
      state.errors.push(action.payload);
    },
    popError: (state) =>
    {
      state.errors.pop();
    },
    clearErrors: (state) =>
    {
      state.errors = [];
    }
  },
});

export const { pushError, popError, clearErrors } = errorSlice.actions;

export default errorSlice.reducer;
