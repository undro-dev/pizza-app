import { useState } from 'react';
import { CategoryItem } from './CategoryItem';

export const Categories = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	const categories = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	];

	const onClickCategory = index => {
		setActiveIndex(index);
	};

	return (
		<div className='categories'>
			<ul>
				{categories.map((item, index) => (
					<CategoryItem
						key={item}
						onClickCategory={onClickCategory}
						item={item}
						index={index}
						activeIndex={activeIndex}
					/>
				))}
			</ul>
		</div>
	);
};
