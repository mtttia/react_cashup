import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Languages from '../enums/enumLanguages';
import Theme from '../enums/enumTheme';

interface SettingState {
  language: Languages;
  theme: Theme;
  isFirstRun: boolean;
}

const settingState: SettingState = {
  language: Languages.it,
  theme: Theme.Light,
  isFirstRun: true
};

const settingSlice = createSlice({
  name: 'setting',
  initialState: settingState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Languages>) => {
      state.language = action.payload;
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setIsFirstRun: (state, action: PayloadAction<boolean>) => {
      state.isFirstRun = action.payload;
    },

  },
});

export const { setLanguage, setTheme, setIsFirstRun } = settingSlice.actions;

export default settingSlice.reducer;
