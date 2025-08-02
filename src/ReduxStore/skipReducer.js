import { createSlice } from "@reduxjs/toolkit";

const initialState={
    skip:0,
}

export const SkipSliceReducer = createSlice({
    initialState,
    name:"SkipSliceReducer",
    reducers:{
        increaseSkip:(state)=>{
            tate.skip+=10;
        }
    }
})

export const{increaseSkip} = SkipSliceReducer.actions;