import React, { useEffect, useState } from 'react';
import { Categories } from '../components/Categories';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Sort } from '../components/Sort';

export const Home = () => {
	const URL = 'https://63149cb7fa82b738f74ac8f0.mockapi.io/items';
	const [items, setItems] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [categoryId, setCategoryId] = useState(0);
	const [sortType, setSortType] = useState({
		name: 'популярности',
		sortProperty: 'rating',
	});

	useEffect(() => {
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
		const sortBy = sortType.sortProperty.replace('-', '');
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		setLoading(true);

		fetch(`${URL}?${category}&sortBy=${sortBy}&order=${order}`)
			.then(res => res.json())
			.then(arr => {
				setItems(arr);
				setLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sortType.sortProperty]);

	return (
		<>
			<div className='content__top'>
				<Categories
					value={categoryId}
					onClickCategories={i => setCategoryId(i)}
				/>
				<Sort sortType={sortType} onChangeSort={i => setSortType(i)} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading
					? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
					: items.map(obj => <PizzaBlock key={obj.id} {...obj} />)}
			</div>
		</>
	);
};
