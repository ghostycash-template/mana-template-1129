import { createSlice } from "@reduxjs/toolkit";
import { blogi } from "../assets";

const ui = createSlice({
    name: "ui",
    initialState: {
        navOpen: false,
        sideNavOpen: false,
        alert: {
            message: '',
            type: 'success',
        },
        blogs: []
    },
    reducers: {
        setNavOpen: (state, action) => {
            state.navOpen = action.payload;
        },
        setBlogs: (state, action) => {
            state.blogs = action.payload;
        },
        setSideNavOpen: (state, action) => {
            state.sideNavOpen = action.payload
        },
        setAlert: (state, action) => {
            state.alert.message = action.payload.message;
            state.alert.type = action.payload.type;
        },
    }
})

export const { setNavOpen, setBlogs, setSideNavOpen, setAlert } = ui.actions;
export default ui.reducer;