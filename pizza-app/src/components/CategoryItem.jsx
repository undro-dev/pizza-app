export const CategoryItem = ({ item, index, onClickCategory, activeIndex }) => {
	return (
		<li
			className={activeIndex === index ? 'active' : ''}
			onClick={() => onClickCategory(index)}
		>
			{item}
		</li>
	);
};
