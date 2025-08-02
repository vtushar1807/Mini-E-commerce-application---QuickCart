import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems : [],
    totalQuantity:0,
    totalAmount:0,
}

export const CartSliceReducer = createSlice({

    initialState,
    name:"CartSliceReducer",
    reducers:{
        addItemToCart:(state,action)=>{

            const newItem=action.payload;
            state.cartItems.push(newItem);
            state.totalQuantity++;
            state.totalAmount+=newItem.price;
        },

        removeItemFromCart:(state, action)=>{
            const itemToDelete=action.payload;
            const restItems = state.cartItems.filter((item) => item.id!==itemToDelete.id)
            state.cartItems=restItems;
            state.totalQuantity--;
            state.totalAmount-=itemToDelete.price;
        }


    }
})

export const {addItemToCart, removeItemFromCart}=CartSliceReducer.actions;