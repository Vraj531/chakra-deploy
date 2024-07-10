import { addInterestedJob } from '$lib/server/drizzle/dbModel';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		return json({
			status: 401,
			body: {
				message: 'Unauthorized'
			}
		});
	}

	const { jobId } = await request.json();
	// console.log('first', jobId);
	const res = await addInterestedJob(locals.user.id, jobId);
	if (res) return json({ status: 200, body: { message: 'Job added to interested jobs' } });
	return json({ status: 500, body: { message: 'Something went wrong' } });
};
