import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './auth';

jest.mock('expo-auth-session', () => {
	return {
		startAsync: () => {
			return {
				type: 'success',
				params: {
					access_token: 'google-token',
				},
			};
		},
	};
});

describe('Auth Hook', () => {
	it('should be able to sign in with google account existing', async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () =>
					Promise.resolve({
						id: `userInfo.id`,
						email: `userInfo.email`,
						name: `userInfo.given_name`,
						photo: `userInfo.picture`,
						locale: `userInfo.locale`,
						verified_email: `userInfo.verified_email`,
					}),
			})
		) as jest.Mock;

		const { result } = renderHook(() => useAuth(), {
			wrapper: AuthProvider,
		});

		await act(() => result.current.signIWithGoogle());

		const user = result.current.user;
    console.log('user: ', user)
		expect(user).toBeTruthy();
	});
});
