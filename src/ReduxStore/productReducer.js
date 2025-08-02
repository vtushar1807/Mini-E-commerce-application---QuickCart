import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items:[],
}

export const ProductSliceReducer = createSlice({
    initialState,
    name:"ProductSliceReducer",
    reducers:{

        addTen:(state, action)=>{
            
    state.items.push(...action.payload);     

        }
    }
})

export const {addTen} = ProductSliceReducer.actions;