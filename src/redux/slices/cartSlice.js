import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    totalPrice: 0,
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addItem(state, action) {
            state.items.push(action.payload)
        },


        minusItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload);
            if (findItem) {
                findItem.count--
            }
        },
        removeItem(state, action) {
            state.items.filter((obj) => obj.id !== action.payload);
        }
        ,
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        }
    }
});

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id) => (state) => state.cart.items.find((obj) => obj.id === id);

export const {addItem, removeItem, minusItem, clearItems} = cartSlice.actions;

export default cartSlice.reducer;
