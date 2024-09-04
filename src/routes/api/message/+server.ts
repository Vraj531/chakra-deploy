import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { addMessage } from '$lib/server/drizzle/dbChatModel';

// export const GET: RequestHandler = async () => {
// 	const encoder = new TextEncoder();

// 	// Function to simulate sending chunks of data
// 	const stream = new ReadableStream({
// 		start(controller) {
// 			const sendChunk = () => {
// 				if (count >= 10) {
// 					controller.close();
// 				} else {
// 					count += 1;

// 					controller.enqueue(
// 						encoder.encode(
// 							JSON.stringify({ message: `Chunk ${count}`, content: generateRandomString(5) }) + '\n'
// 						)
// 					);
// 					setTimeout(sendChunk, 1000);
// 				}
// 			};

// 			sendChunk();
// 		}
// 	});
// 	// console.log('stream', stream);
// 	return new Response(stream, {
// 		headers: {
// 			'Content-Type': 'application/json',
// 			'Transfer-Encoding': 'chunked'
// 		}
// 	});
// };

type TRequestMessage = {
	id: string;
	conversationId: string;
	content: string;
	userId: string;
	system: boolean;
	timestamp: number;
};

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.user) error(401, { message: 'Unauthorised' });
	const body = await request.json();
	// console.log('body', body);
	const { conversationId, content, system, timestamp, id } = body as TRequestMessage;
	try {
		addMessage({ id, conversationId, content, userId: locals.user.id, system, timestamp });
	} catch (error) {
		console.log('error saving message to db', error);
	}
	const signal = request.signal;
	if (!content) error(400, { message: 'Bad request' });
	const res = await fetch(
		'http://ec2-3-15-224-90.us-east-2.compute.amazonaws.com:5000/chat_stream',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			signal,
			body: JSON.stringify({
				country: 'USA',
				user_id: locals.user.id,
				user_input: content
			})
		}
	);

	if (!res.ok) error(500, { message: 'Error from api service' });
	return res;
	// return new Response('ok', { status: 200 });
};

export const PUT: RequestHandler = async ({ locals, request }) => {
	if (!locals.user) error(401, { message: 'Unauthorised' });
	const body = await request.json();

	// save message to db
	const { conversationId, content, system, timestamp, id } = body as TRequestMessage;
	try {
		addMessage({ id, conversationId, content, userId: locals.user.id, system, timestamp });
	} catch (err) {
		console.log('error saving message to db', err);
		error(500, { message: 'Error saving message to db' });
	}
	return new Response('ok', { status: 200 });
};
