import { sendPasswordResetEmail } from '$lib/config/emailMessages';
import { db } from '$lib/server/drizzle/turso-db';
import { tokenTable, userTable } from '$lib/server/drizzle/turso-schema';
import { verifyCaptcha } from '$lib/server/verifyCaptcha';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { generateIdFromEntropySize } from 'lucia';

interface RequestBody {
	expectedAction: 'FORGOT_PASSWORD';
	email: string;
	token: string;
}

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const { email, expectedAction = 'LOGIN', token } = body as RequestBody;
	// console.log('request', body);

	const CaptchaResponse = await verifyCaptcha(token, expectedAction);

	if (CaptchaResponse < 0.8) {
		error(401, { message: 'Unauthorised', id: 'INVALID', code: '401' });
	}
	//we are using drizzle kit
	const user = await db.select().from(userTable).where(eq(userTable.email, email));
	if (!user.length) {
		error(404, { message: 'User not found', id: 'NOT_FOUND', code: '404' });
	}
	const id = generateIdFromEntropySize(16);
	const tokenValue = generateIdFromEntropySize(10);
	const expiresAt = Date.now() + 1000 * 60 * 60 * 2; // 2 hours
	await db.insert(tokenTable).values({
		id,
		token: tokenValue,
		userId: user[0].id,
		expiresAt
	});
	//send email
	const res = await sendPasswordResetEmail(email, tokenValue);
	if (res?.statusCode === 200) {
		return json({ success: true });
	} else {
		error(500, { message: 'Something went wrong', id: 'INTERNAL_SERVER_ERROR', code: '500' });
	}
};
