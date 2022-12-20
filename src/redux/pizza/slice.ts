import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {PizzaBlockPropTypes} from "../../components/PizzaBlock";
import {Pizza, Status} from "./types";

export type SearchParams = {
    sortBy: string, order: string, category: string, search: string, currentPage: string
}
type FetchPizzasArgs = Record<string, string>;

//типизурем   санку возвращаемый массив и тип данных
export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>('pizza/fetchPizzasStatus',
    async (params: FetchPizzasArgs) => {
        const {sortBy, order, category, search, currentPage} = params;
        const {data} = await axios.get<Pizza[]>(
            `https://628ff680dc4785236549b85d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
        );

        return data;
    });

interface PizzaSliceState {
    items: PizzaBlockPropTypes[],
    status: Status

}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        },
    },
    //Замена try catch
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCES;
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    }
    // extraReducers: {
    //     [fetchPizzas.pending]: (state) => {
    //         state.status = 'loading';
    //         state.items = [];
    //     },
    //     [fetchPizzas.fulfilled]: (state, action) => {
    //
    //         state.items = action.payload;
    //         state.status = 'success';
    //     },
    //     [fetchPizzas.rejected]: (state, action) => {
    //         console.log(action, 'rejected');
    //         state.status = 'error';
    //         state.items = [];
    //     },
    // },
});


export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;
