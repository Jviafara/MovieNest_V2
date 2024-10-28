import { createSlice } from '@reduxjs/toolkit';

export const serverLoadSlice = createSlice({
    name: 'serverLoad',
    initialState: {
        serverLoadOpen: false,
    },
    reducers: {
        setServerLoadOpen: (state, action) => {
            state.serverLoadOpen = action.payload;
        },
    },
});

export const { setServerLoadOpen } = serverLoadSlice.actions;

export default serverLoadSlice.reducer;
