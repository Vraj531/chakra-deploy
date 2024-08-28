import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
// let count = 0;

// function generateRandomString(length: number): string {
// 	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
// 	let result = '';
// 	for (let i = 0; i < length; i++) {
// 		const randomIndex = Math.floor(Math.random() * characters.length);
// 		result += characters.charAt(randomIndex);
// 	}
// 	return result;
// }

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

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.user) error(401, { message: 'Unauthorised' });
	const body = await request.json();
	const { userInput } = body;
	if (!userInput) error(400, { message: 'Bad request' });
	const res = await fetch(
		'http://ec2-3-15-224-90.us-east-2.compute.amazonaws.com:5000/chat_stream',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				country: 'USA',
				user_id: locals.user.id,
				user_input: userInput
			})
		}
	);
	// console.log('res', res);
	if (!res.ok) error(500, { message: 'Error from api service' });
	return res;
};
