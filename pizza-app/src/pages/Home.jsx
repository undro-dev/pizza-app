import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { SearchContext } from '../App';
import { Categories } from '../components/Categories';
import { Pagination } from '../components/Pagination';
import { PizzaBlock } from '../components/PizzaBlock';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from '../components/PizzaBlock/Skeleton';

import { Sort } from '../components/Sort';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

export const Home = () => {
	const { searchValue } = useContext(SearchContext);
	const URL = 'https://63149cb7fa82b738f74ac8f0.mockapi.io/items';
	const [items, setItems] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const { categoryId, sort, currentPage } = useSelector(state => state.filter);

	const dispatch = useDispatch();

	const onClickCategory = id => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = number => {
		dispatch(setCurrentPage(number));
	};

	useEffect(() => {
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const sortBy = sort.sortProperty.replace('-', '');
		const category = categoryId > 0 ? `&category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';
		setLoading(true);

		axios
			.get(
				`${URL}?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
			)
			.then(res => {
				setItems(res.data);
				setLoading(false);
			});

		window.scrollTo(0, 0);
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />);

	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));

	return (
		<>
			<div className='content__top'>
				<Categories value={categoryId} onClickCategories={onClickCategory} />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</>
	);
};
