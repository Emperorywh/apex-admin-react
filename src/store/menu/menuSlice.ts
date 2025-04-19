import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
    name: "menu",
    initialState: {
        inlineCollapsed: false
    },
    reducers: {
        changeInlineCollapsed: (state, action) => {
            state.inlineCollapsed = action.payload
        },
    }
})

export const { changeInlineCollapsed } = menuSlice.actions;

export default menuSlice.reducer;