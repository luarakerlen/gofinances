import { Feather } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface CategoryProps {
	isActive: boolean,
}

export const Container = styled(GestureHandlerRootView)`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
	width: 100%;
	height: ${RFValue(113)}px;
	background-color: ${({ theme }) => theme.colors.primary};
	align-items: center;
	justify-content: flex-end;
	padding-bottom: 19px;
`;

export const Title = styled.Text`
	font-size: ${RFValue(18)}px;
	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ theme }) => theme.colors.shape};
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
	width: 100%;
	padding: ${RFValue(15)}px;
	align-items: center;
	flex-direction: row;

	background-color: ${({theme, isActive}) => isActive ? theme.colors.secondary_light : theme.colors.background};
`;

export const Icon = styled(Feather)`
	font-size: ${RFValue(20)}px;
	margin-right: 16px;
`;

export const Name = styled.Text`
	font-size: ${RFValue(14)}px;
	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ theme }) => theme.colors.text_dark};
`;

export const Separator = styled.View`
	width: 100%;
	height: 1px;
	background-color: ${({ theme }) => theme.colors.text_dark};
`;

export const Footer = styled.View`
	width: 100%;
	padding: 24px;
`;
