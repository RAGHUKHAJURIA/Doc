import {createSlice} from '@reduxjs/toolkit';


export const alertSlice = createSlice({
    name: "alerts",
    initialState:{
        loading:false
    },
    reducers:{
        showLoadings: (state) => {
            state.loading = true
        },
        hideLoading: (state) => {
            state.loading = false;
        }
    }
})

export const {showLoadings, hideLoading} = alertSlice.actions;