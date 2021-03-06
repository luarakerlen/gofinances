import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(RectButton).attrs({
	activeOpacity: 0.7,
})`
	background-color: ${({ theme }) => theme.colors.shape};
	flex-direction: row;
	justify-content: space-between;
	border-radius: 5px;
	align-items: center;
	padding: 18px 16px;
`;

export const Category = styled.Text`
	font-size: ${RFValue(14)}px;
	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ theme }) => theme.colors.text_dark};
`;

export const Icon = styled(Feather)`
	font-size: ${RFValue(20)}px;
	color: ${({ theme }) => theme.colors.text};
`;
