import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { addMessage } from '$lib/server/drizzle/dbChatModel';
import { CHAT_LAMBDA_URL } from '$env/static/private';
import { messageLimiter } from '$lib/server/rateLimiter';

//TODO : need to put a limit for not logged in users!

type TRequestMessage = {
	id: string;
	conversationId: string;
	content: string;
	userId: string;
	system: boolean;
	timestamp: number;
	sessionId: string;
	country: string;
};

const url = CHAT_LAMBDA_URL;
// const url = 'http://ec2-3-15-224-90.us-east-2.compute.amazonaws.com:5000/chat_stream';

export const POST: RequestHandler = async (event) => {
	const { locals, request } = event;
	const limit = await messageLimiter.isLimited(event);
	// console.log('limit', limit);
	if (!locals.user && limit) {
		return error(401, { message: 'capped' });
	}
	const body = await request.json();
	// console.log('body', body);
	const { conversationId, content, system, timestamp, id, sessionId, country } =
		body as TRequestMessage;
	try {
		if (locals.user) {
			addMessage({ id, conversationId, content, userId: locals.user.id, system, timestamp });
		}
	} catch (error) {
		console.log('error saving message to db', error);
	}
	const signal = request.signal;
	if (!content) error(400, { message: 'Bad request' });
	console.log('starting stream from backend');

	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			signal,
			body: JSON.stringify({
				country: country,
				user_id: !locals?.user?.id
					? `${sessionId}-${conversationId}`
					: `${locals.user.id}-${conversationId}`,
				user_input: content
			})
		});

		if (!res.ok) error(500, { message: 'Error from api service' });
		return res;
	} catch (err) {
		return error(500, { message: 'Error from chat service' });
	}
	// console.log('res', res);

	// return new Response('ok', { status: 200 });
};

export const PUT: RequestHandler = async ({ locals, request }) => {
	if (!locals.user) error(401, { message: 'Unauthorised' });
	const body = await request.json();

	// save message to db
	const { conversationId, content, system, timestamp, id } = body as TRequestMessage;
	try {
		const res = await addMessage({
			id,
			conversationId,
			content,
			userId: locals.user.id,
			system,
			timestamp
		});
		console.log('message status', res);
		return new Response('ok', { status: 200 });
	} catch (err) {
		console.log('error saving message to db', err);
		error(500, { message: 'Error saving message to db' });
	}
	error(500, { message: 'Error saving message to db' });
};
