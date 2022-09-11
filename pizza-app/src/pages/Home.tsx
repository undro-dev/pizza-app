import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { Categories } from '../components/Categories.tsx';
import { Pagination } from '../components/Pagination/index.tsx';
import { PizzaBlock } from '../components/PizzaBlock/index.tsx';
import { useSelector } from 'react-redux';
import Skeleton from '../components/PizzaBlock/Skeleton.tsx';
import { list } from '../components/Sort.tsx';
import {
	fetchPizzas,
	SearchPizzaParams,
	selectPizzaData,
} from '../redux/slices/pizzaSlice.ts';

import { SortPopup } from '../components/Sort.tsx';
import {
	selectFilter,
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/slices/filterSlice.ts';
import { useAppDispatch } from '../redux/store.ts';

const URL = 'https://63149cb7fa82b738f74ac8f0.mockapi.io/items';

export const Home: React.FC = () => {
	const navigate = useNavigate();
	const { items, status } = useSelector(selectPizzaData);

	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selectFilter);

	const dispatch = useAppDispatch();

	const onClickCategory = (id: number) => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = (number: number) => {
		dispatch(setCurrentPage(number));
	};
	const getPizzas = async () => {
		// setLoading(true);

		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const sortBy = sort.sortProperty.replace('-', '');
		const category = categoryId > 0 ? `&category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		dispatch(
			fetchPizzas({
				URL,
				order,
				sortBy,
				category,
				search,
				currentPage: String(currentPage),
			})
		);

		window.scrollTo(0, 0);
	};

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(
				window.location.search.substring(1)
			) as unknown as SearchPizzaParams;

			const sort = list.find((obj: any) => obj.sortProperty === params.sortBy);

			if (sort) {
				params.sortBy = sort;
			}

			dispatch(
				setFilters({
					searchValue: params.search,
					categoryId: Number(params.category),
					currentPage: Number(params.currentPage),
					sort: sort || list[0],
				})
			);

			isSearch.current = true;
		}
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (!isSearch.current) {
			getPizzas();
		}

		isSearch.current = false;
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`);
		}

		isMounted.current = true;
	}, [categoryId, sort.sortProperty, currentPage]);

	const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));

	return (
		<>
			<div className='content__top'>
				<Categories value={categoryId} onClickCategories={onClickCategory} />
				<SortPopup />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			{status === 'error' ? (
				<div className='content__error-info'>
					<h2>Произошла ошибка 😕</h2>
					<p>
						К сожалению не удалось получить пиццы. Попробуйте повторить позже!
					</p>
				</div>
			) : (
				<div className='content__items'>
					{status === 'loading' ? skeletons : pizzas}
				</div>
			)}

			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</>
	);
};
