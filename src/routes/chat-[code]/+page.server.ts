import type { PageServerLoad } from './$types';
import { getConversationsAndMessages } from '$lib/server/drizzle/dbChatModel';

export const load: PageServerLoad = async ({ params, locals }) => {
	// if (!locals.user) error(401, { message: 'Unauthorised' });
	// if (!params.code) return;
	const res = await getConversationsAndMessages({
		conversationId: params.code,
		userId: locals?.user?.id
	});
	// console.log('res', res);
	return res;
};

//* this not in use!!
// export const actions = {
// 	sendMessage: async ({ request, locals }) => {
// 		if (!locals.user) error(401, { message: 'Unauthorised' });
// 		const data = await request.formData();
// 		const userInput = data.get('userInput');
// 		console.log('userInput', userInput);

// 		if (!userInput) error(400, { message: 'Bad request' });
// 		const res = await fetch(
// 			'http://ec2-3-15-224-90.us-east-2.compute.amazonaws.com:5000/chat_stream',
// 			{
// 				method: 'POST',
// 				headers: { 'Content-Type': 'application/json' },
// 				body: JSON.stringify({
// 					country: 'USA',
// 					user_id: locals.user.id,
// 					user_input: userInput
// 				})
// 			}
// 		);
// 		// if (!res.ok) error(500, { message: 'Error from api service' });
// 		console.log('res', res);
// 		return res;
// 	}
// } satisfies Actions;
