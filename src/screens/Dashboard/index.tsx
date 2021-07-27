import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import {
	TransactionCard,
	TransactionCardProps,
} from '../../components/TransactionCard';
import {
	Container,
	Header,
	UserWrapper,
	UserInfo,
	Photo,
	User,
	UserGreeting,
	UserName,
	Icon,
	HighlightCards,
	Transactions,
	Title,
	TransactionList,
	LogoutButton,
} from './styles';

export interface DataListProps extends TransactionCardProps {
	id: string;
}

export function Dashboard() {
	const data: DataListProps[] = [
		{
			id: '1',
			type: 'positive',
			title: 'Desenvolvimento de site',
			amount: 'R$ 12.000',
			category: { name: 'Vendas', icon: 'dollar-sign' },
			date: '12/02/2021',
		},
		{
			id: '2',
			type: 'negative',
			title: 'iFood',
			amount: 'R$ 1.000',
			category: { name: 'Alimentação', icon: 'coffee' },
			date: '10/02/2021',
		},
		{
			id: '3',
			type: 'negative',
			title: 'Aluguel',
			amount: 'R$ 1.200',
			category: { name: 'Casa', icon: 'home' },
			date: '01/03/2021',
		},
	];

	return (
		<Container>
			<Header>
				<UserWrapper>
					<UserInfo>
						<Photo
							source={{
								uri: 'https://avatars.githubusercontent.com/u/26902816?v=4',
							}}
						/>
						<User>
							<UserGreeting>Olá,</UserGreeting>
							<UserName>Luara</UserName>
						</User>
					</UserInfo>
					<LogoutButton onPress={() => {}}>
						<Icon name='power' />
					</LogoutButton>
				</UserWrapper>
			</Header>

			<HighlightCards>
				<HighlightCard
					type='up'
					title='Entradas'
					amount='R$ 17.400,00'
					lastTransaction='Última entrada dia 13 de abril'
				/>
				<HighlightCard
					type='down'
					title='Saídas'
					amount='R$ 1.500,00'
					lastTransaction='Última saída dia 3 de abril'
				/>
				<HighlightCard
					type='total'
					title='Total'
					amount='R$ 15.400,00'
					lastTransaction='01 à 16 de abril'
				/>
			</HighlightCards>

			<Transactions>
				<Title>Listagem</Title>
				<TransactionList
					data={data}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <TransactionCard data={item} />}
				/>
			</Transactions>
		</Container>
	);
}
