import React from 'react';
import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock = () => {
	return (
		<>
			<h1 className={styles.root}>Ничего не найдено :(</h1>
			<p className={styles.description}>
				К сожалению данная страница отсутсвует в нашем интернет магазине!!!
			</p>
		</>
	);
};
