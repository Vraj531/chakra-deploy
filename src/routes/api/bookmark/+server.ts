import { error, json } from '@sveltejs/kit';
import type { JobListing } from '$lib/dummyData';
import { db } from '$lib/server/drizzle/turso-db';
import { bookMarkedJobs } from '$lib/server/drizzle/turso-schema';
import { generateIdFromEntropySize } from 'lucia';
import { eq } from 'drizzle-orm';

export const POST = async ({ locals, request }) => {
	if (!locals.user) {
		throw error(404, { message: 'Not found' });
	}

	const req = (await request.json()) as JobListing;
	const bookmarkId = generateIdFromEntropySize(16);

	try {
		const res = await db
			.select()
			.from(bookMarkedJobs)
			.where(eq(bookMarkedJobs.company_id, req.company_id));
		if (!res.length) {
			await db.insert(bookMarkedJobs).values({
				id: bookmarkId,
				jobId: req.id.toString(),
				company_name: req.company_name,
				company_website_url: req.company_website_url,
				job_description: req.job_description,
				title: req.title,
				location: req.location,
				max_salary: req.max_salary?.toLocaleString() || 'not found',
				user_id: locals.user.id,
				min_salary: req.min_salary?.toLocaleString() || 'not found',
				job_type: req.job_type,
				published_date: req.published_date,
				job_posting_url: req.job_posting_url,
				clearance_required: req.clearance_required,
				company_id: req.company_id,
				company_logo: req.company_logo,
				company_linkedin_url: req.company_linkedin_url,
				country_name: req.country_name,
				experience: req.experience,
				has_remote: req.has_remote,
				salary_currency: req.salary_currency
			});
			return json({ success: true, message: 'added bookmark' });
		}
		return json({ success: false, message: 'bookmark exists' });
		// console.log('req', res);
	} catch (error) {
		// console.log('error', error);
		return json({ success: false, message: 'failed to add bookmark' });
	}
};
