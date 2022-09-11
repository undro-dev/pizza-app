import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import filter from './slices/filterSlice.ts';
import cart from './slices/cartSlice.ts';
import pizzas from './slices/pizzaSlice.ts';

export const store = configureStore({
	reducer: {
		filter,
		cart,
		pizzas,
	},
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
