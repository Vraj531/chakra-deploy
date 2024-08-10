import { getUserIdFromToken, updatePassword } from '$lib/server/drizzle/dbModel.js';
import { validatePassword } from '$lib/utils/validatePassword.js';
import { error, type Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, params }) => {
		const token = params.token;
		const formData = await request.formData();
		const password = formData.get('password');
		if (!token) {
			error(500, { message: 'Token not found!' });
		}
		// password validation
		// console.log('password', formData, password);
		const validationResult = validatePassword(password);
		if (typeof password !== 'string') {
			error(500, { message: 'Password is not a string' });
		}
		if (typeof validationResult === 'string') {
			error(500, { message: validationResult });
		}
		// Get user id from token
		const tokenRes = await getUserIdFromToken(token);
		if (!tokenRes) {
			error(401, { message: 'Invalid token!' });
		}

		//check if expired
		if (tokenRes.expiresAt < Date.now()) {
			error(500, { message: 'Token has expired!' });
		}
		// Update user password
		const updateRes = await updatePassword(tokenRes.userId as string, password, token);
		if (!updateRes) {
			error(500, { message: 'Password update failed!' });
		}
		return {
			status: true,
			message: 'Password has been updated successfully!'
		};
	}
} satisfies Actions;
