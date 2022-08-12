import React from 'react';
import { render } from '@testing-library/react-native';
import { Profile } from '../../screens/Profile';

test('check if show correctly user name input placeholder', () => {
	const { debug } = render(<Profile />);

	debug();
});
