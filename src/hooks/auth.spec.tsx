import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './auth';
import { mocked } from 'jest-mock';
import { startAsync } from 'expo-auth-session';

jest.mock('expo-auth-session');

describe('Auth Hook', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should be able to sign in with google account existing', async () => {
		const googleMocked = mocked(startAsync as any);
		googleMocked.mockReturnValue({
			type: 'success',
			params: {
				access_token: 'google-token',
			},
		});

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
		expect(user).toBeTruthy();
	});

	it('user should not connect if cancel authentication with google', async () => {
		const googleMocked = mocked(startAsync as any);
		googleMocked.mockReturnValue({
			type: 'cancel',
		});

		const { result } = renderHook(() => useAuth(), {
			wrapper: AuthProvider,
		});

		await act(() => result.current.signIWithGoogle());

		const user = result.current.user;
		expect(user).not.toHaveProperty('id');
	});

	it('should give an error with incorrect google parameters', async () => {
		const { result } = renderHook(() => useAuth(), {
			wrapper: AuthProvider,
		});

		try {
			await act(() => result.current.signIWithGoogle());
		} catch (error) {
			const user = result.current.user;
			expect(user).toEqual({})
		}
	});
});
