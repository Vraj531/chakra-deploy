import { getUserIdFromToken, verifyUser } from '$lib/server/drizzle/dbModel.js';
import { error, fail } from '@sveltejs/kit';

export const load = async ({ params }) => {
	try {
		const token = params.token;
		const res = await getUserIdFromToken(token);
		if (!res) {
			error(401, { message: 'Invalid token!' });
		}
		// console.log('res', res, token);
		if (!res.userId) {
			error(403, { message: 'User does not exist' });
		}

		if (res.expiresAt < Date.now()) {
			return { heading: 'Verification status', message: 'Token has expired!' };
		}

		const verificationStatus = await verifyUser(res.userId, token);
		if (!verificationStatus) {
			error(500, { message: 'User verification failed!' });
		}
		return {
			heading: 'Verification status',
			message: 'User has been verified successfully! Login to get started'
		};
	} catch (error) {
		return fail(500, { error });
	}
};
