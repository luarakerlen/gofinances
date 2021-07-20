import styled, { css } from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

interface TransactionProps {
	type: "positive" | "negative";
}

export const Container = styled.View`
	background-color: ${({ theme }) => theme.colors.shape};
	border-radius: 5px;
	padding: 17px 24px;
	margin-bottom: 16px;
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ theme }) => theme.colors.text_dark};
	font-size: ${RFValue(14)}px;
`;
export const Amount = styled.Text<TransactionProps>`
	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ theme, type }) =>
		type === "positive" ? theme.colors.success : theme.colors.attention};
	font-size: ${RFValue(20)}px;
	margin-top: 2px;
`;
export const Footer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-top: 19px;
`;
export const Category = styled.View`
	flex-direction: row;
	align-items: center;
`;
export const Icon = styled(Feather)`
	font-size: ${RFValue(20)}px;
	color: ${({ theme }) => theme.colors.text};
`;
export const CategoryName = styled.Text`
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.text};
	font-family: ${({ theme }) => theme.fonts.regular};
	margin-left: 17px;
`;
export const Date = styled.Text`
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.text};
	font-family: ${({ theme }) => theme.fonts.regular};
`;
