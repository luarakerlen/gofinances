import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import { Register } from '.';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../global/styles/theme';

jest.mock('@react-navigation/native', () => {
	return {
		useNavigation: jest.fn(),
	};
});

const Providers: React.FC = ({ children }) => (
	<ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Register Screen', () => {
	it('should be able to open category modal when user click on button', async () => {
		const { getByTestId } = render(<Register />, {
			wrapper: Providers,
		});

		const categoryModal = getByTestId('modal-category');
		const buttonModal = getByTestId('button-category');

		act(() => {
			fireEvent.press(buttonModal);
		});

		await waitFor(() => {
			expect(categoryModal.props.visible).toBeTruthy();
		}, { timeout: 2000 });
	});
});
