import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = props => (
	<ContentLoader
		speed={2}
		width={280}
		height={465}
		viewBox='0 0 280 465'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
		{...props}
	>
		<circle cx='142' cy='142' r='125' />
		<rect x='1' y='284' rx='10' ry='10' width='280' height='21' />
		<rect x='0' y='329' rx='12' ry='12' width='280' height='88' />
		<rect x='6' y='430' rx='10' ry='10' width='90' height='27' />
		<rect x='191' y='430' rx='10' ry='10' width='90' height='27' />
	</ContentLoader>
);

export default Skeleton;
