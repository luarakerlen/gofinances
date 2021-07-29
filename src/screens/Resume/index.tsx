import React, { useState, useEffect } from 'react';
import { HistoryCard } from '../../components/HistoryCard';
import { Container, Header, Title } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { categories } from '../../utils/categories';

interface TransactionDataProps {
	type: 'positive' | 'negative';
	name: string;
	amount: string;
	category: string;
	date: string;
}

export function Resume() {
	async function loadData() {
		const dataKey = '@gofinance:transactions';
		const response = await AsyncStorage.getItem(dataKey);
		const responseFormatted = response ? JSON.parse(response) : [];

		const expensives = responseFormatted.filter(
			(expensive: TransactionDataProps) => expensive.type === 'negative'
		);

		const totalByCategory = [];

		categories.forEach(category => {
			let categorySum = 0;

			expensives.forEach((expensive: TransactionDataProps) => {
				if(expensive.category === category.key) {
					categorySum += Number(expensive.amount);
				}
			});

			totalByCategory.push({
				name: category.name,
				total: categorySum,
			})
		});
	}

	useEffect(() => {
		loadData();
	});

	return (
		<Container>
			<Header>
				<Title>Resumo por categoria</Title>
			</Header>

			<HistoryCard title='Compras' amount='R$ 150,50' color='red' />
		</Container>
	);
}
