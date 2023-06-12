import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string | null;
  accessToken: string | null;
  uid: string | null;
  isLoading: boolean;
}
export interface UserInterface
{
  email: string;
  accessToken: string;
  uid: string;
}

const initialState: UserState = {
  email: null,
  accessToken: null,
  uid: null,
  isLoading: true
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInterface>) => {
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.uid = action.payload.uid;
      state.isLoading = false;
    },    
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
