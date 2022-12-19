import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getCartFromLs} from "../../utils/getCartFromLs";
import {calcTotalPrice} from "../../utils/calcTotalPrice";
import {CartItem, CartSliceState} from "./types";


// типизирует тоолько обьект


const {items, totalPrice} = getCartFromLs()

const initialState: CartSliceState = {
    totalPrice,
    items
};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                })

                state.totalPrice = calcTotalPrice(state.items)
            }
            state.items.push(action.payload);

        },


        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find((obj) => obj.id === action.payload);
            if (findItem) {
                findItem.count--
            }
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items.filter((obj) => obj.id !== action.payload);
        }
        ,
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        }
    }
});


export const {addItem, removeItem, minusItem, clearItems} = cartSlice.actions;

export default cartSlice.reducer;
