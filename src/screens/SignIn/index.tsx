import React, { useContext } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

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
import { Alert } from 'react-native';

export function SignIn() {
	const { user, signIWithGoogle, signIWithApple } = useAuth();

	async function handleSignInWithGoogle() {
		try {
			await signIWithGoogle();
		} catch (error) {
			console.log(error);
			Alert.alert('Não foi possível conectar com a conta Google');
		}
	}

	async function handleSignInWithApple() {
		try {
			await signIWithApple();
		} catch (error) {
			console.log(error);
			Alert.alert('Não foi possível conectar com a conta Apple');
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
					<SignInSocialButton
						onPress={handleSignInWithApple}
						title='Entrar com Apple'
						svg={AppleSvg}
					/>
				</FooterWrapper>
			</Footer>
		</Container>
	);
}
