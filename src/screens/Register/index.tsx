import React, { useState, useEffect } from 'react';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { InputForm } from '../../components/Form/InputForm';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import {
	Container,
	Header,
	Title,
	Form,
	Fields,
	TransactionsTypes,
} from './styles';

interface FormData {
	name: string;
	amount: string;
}

const schema = Yup.object().shape({
	name: Yup.string().required('Nome é obrigatório'),
	amount: Yup.number()
		.typeError('Informe um valor numérico')
		.positive('O valor não pode ser negativo')
		.required('Valor é obrigatório'),
});

export function Register() {
	const navigation = useNavigation();
	const [categoryModalOpen, setCategoryModalOpen] = useState(false);
	const [transactionType, setTransactionType] = useState('');
	const [category, setCategory] = useState({
		key: 'category',
		name: 'Categoria',
	});

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	function handleTransactionsTypeSelect(type: 'positive' | 'negative') {
		setTransactionType(type);
	}

	function handleOpenSelectCategoryModal() {
		setCategoryModalOpen(true);
	}

	function handleCloseSelectCategoryModal() {
		setCategoryModalOpen(false);
	}

	async function handleRegister(form: FormData) {
		if (!transactionType) return Alert.alert('Selecione o tipo da transação');

		if (category.key === 'category')
			return Alert.alert('Selecione a categoria');

		const newTransaction = {
			id: String(uuid.v4()),
			name: form.name,
			amount: form.amount,
			type: transactionType,
			category: category.key,
			date: new Date(),
		};

		try {
			const dataKey = '@gofinance:transactions';
			
			const data = await AsyncStorage.getItem(dataKey);
			const currentData = data ? JSON.parse(data) : [];

			const dataFormatted = [...currentData, newTransaction];

			await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

			reset();
			setTransactionType('');
			setCategory({
				key: 'category',
				name: 'Categoria',
			});

			navigation.navigate('Listagem');
		} catch (error) {
			console.log(error);
			Alert.alert('Não foi possível salvar');
		}
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<Container>
				<Header>
					<Title>Cadastro</Title>
				</Header>

				<Form>
					<Fields>
						<InputForm
							name='name'
							control={control}
							placeholder='Nome'
							autoCapitalize='sentences'
							autoCorrect={false}
							error={errors.name && errors.name.message}
						/>
						<InputForm
							name='amount'
							control={control}
							placeholder='Valor'
							keyboardType='numeric'
							error={errors.amount && errors.amount.message}
						/>
						<TransactionsTypes>
							<TransactionTypeButton
								type='up'
								title='Entrada'
								onPress={() => handleTransactionsTypeSelect('positive')}
								isActive={transactionType === 'positive'}
							/>
							<TransactionTypeButton
								type='down'
								title='Saída'
								onPress={() => handleTransactionsTypeSelect('negative')}
								isActive={transactionType === 'negative'}
							/>
						</TransactionsTypes>
						<CategorySelectButton
							title={category.name}
							onPress={handleOpenSelectCategoryModal}
						/>
					</Fields>
					<Button title='Enviar' onPress={handleSubmit(handleRegister)} />
				</Form>

				<Modal visible={categoryModalOpen}>
					<CategorySelect
						category={category}
						setCategory={setCategory}
						closeSelectCategory={handleCloseSelectCategoryModal}
					/>
				</Modal>
			</Container>
		</TouchableWithoutFeedback>
	);
}
