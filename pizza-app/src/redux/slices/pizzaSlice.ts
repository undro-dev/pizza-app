import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

interface Pizza {
	id: number;
	imageUrl: string;
	name: string;
	price: number;
	sizes: number[];
	types: number[];
}

enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

interface PizzaSliceState {
	items: Pizza[];
	status: Status;
}

export interface SearchPizzaParams {
	URL: string;
	order: string;
	sortBy: string;
	category: string;
	search: string;
	currentPage: string;
}

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
	'pizza/fetchPizzas',
	async params => {
		const { URL, order, sortBy, category, search, currentPage } = params;
		const { data } = await axios.get<Pizza[]>(
			`${URL}?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
		);
		return data;
	}
);

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Pizza[]>) {
			state.items = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchPizzas.pending, state => {
			state.status = Status.LOADING;
			state.items = [];
		});

		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;
		});

		builder.addCase(fetchPizzas.rejected, state => {
			state.status = Status.ERROR;
			state.items = [];
		});
	},
});

export const { setItems } = pizzaSlice.actions;
export const selectPizzaData = (state: RootState) => state.pizzas;

export default pizzaSlice.reducer;
