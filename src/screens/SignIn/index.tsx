import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import { SignInSocialButton } from '../../components/SignInSocialButton';

import {
	Container,
	Footer,
	Header,
	SignInTitle,
	Title,
	TitleWrapper,
	FooterWrapper,
} from './styles';
import { ActivityIndicator, Alert, Platform } from 'react-native';

export function SignIn() {
	const [isLoading, setIsLoading] = useState(false);
	const { signIWithGoogle, signIWithApple } = useAuth();
	const theme = useTheme();

	async function handleSignInWithGoogle() {
		try {
			setIsLoading(true);
			return await signIWithGoogle();
		} catch (error) {
			console.log(error);
			Alert.alert('Não foi possível conectar com a conta Google');
			setIsLoading(false);
		}
	}

	async function handleSignInWithApple() {
		try {
			setIsLoading(true);
			return await signIWithApple();
		} catch (error) {
			console.log(error);
			Alert.alert('Não foi possível conectar com a conta Apple');
			setIsLoading(false);
		}
	}

	return (
		<Container>
			<Header>
				<TitleWrapper>
					<LogoSvg width={RFValue(120)} height={RFValue(68)} />
					<Title>
						Controle suas{'\n'}
						finanças de forma{'\n'}
						muito simples
					</Title>
				</TitleWrapper>
				<SignInTitle>
					Faça seu login com{'\n'}
					uma das contas abaixo
				</SignInTitle>
			</Header>
			<Footer>
				<FooterWrapper>
					<SignInSocialButton
						onPress={handleSignInWithGoogle}
						title='Entrar com Google'
						svg={GoogleSvg}
					/>
					{Platform.OS === 'ios' && (
						<SignInSocialButton
							onPress={handleSignInWithApple}
							title='Entrar com Apple'
							svg={AppleSvg}
						/>
					)}
				</FooterWrapper>
				{isLoading && (
					<ActivityIndicator
						color={theme.colors.shape}
						style={{ marginTop: 18 }}
					/>
				)}
			</Footer>
		</Container>
	);
}
