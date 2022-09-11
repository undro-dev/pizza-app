import { CategoryItem } from './CategoryItem.tsx';

type CategoriesProps = {
	value: number;
	onClickCategories: (i: number) => void;
};

export const Categories: React.FC<CategoriesProps> = ({
	value,
	onClickCategories,
}) => {
	const categories = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	];

	return (
		<div className='categories'>
			<ul>
				{categories.map((item, index) => (
					<CategoryItem
						key={item}
						onClickCategory={onClickCategories}
						item={item}
						index={index}
						activeIndex={value}
					/>
				))}
			</ul>
		</div>
	);
};
