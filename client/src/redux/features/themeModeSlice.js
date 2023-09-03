import { createSlice } from '@reduxjs/toolkit';

export const themeModeSlice = createSlice({
    name: 'ThemeMode',
    initialState: {
        themeMode: 'dark',
    },
    reducers: {
        setThemeMode: (state, action) => {
            localStorage.setItem('themeMode', action.payload);
            state.themeMode = action.payload;
        },
    },
});

export const { setThemeMode, getThemeMode } = themeModeSlice.actions;

export default themeModeSlice.reducer;
