type CategoryItemProps = {
	item: string;
	index: number;
	onClickCategory: any;
	activeIndex: number;
};

export const CategoryItem: React.FC<CategoryItemProps> = ({
	item,
	index,
	onClickCategory,
	activeIndex,
}) => {
	return (
		<li
			className={activeIndex === index ? 'active' : ''}
			onClick={() => onClickCategory(index)}
		>
			{item}
		</li>
	);
};
