import { error, json } from '@sveltejs/kit';
import type { DummyData } from '$lib/dummyData';
import { db } from '$lib/server/drizzle/turso-db';
import { bookMarkedJobs } from '$lib/server/drizzle/turso-schema';
import { generateIdFromEntropySize } from 'lucia';

export const POST = async ({ locals, request }) => {
	if (!locals.user) {
		throw error(404, { message: 'Not found' });
	}

	const req = (await request.json()) as DummyData;
	const bookmarkId = generateIdFromEntropySize(16);

	const res = await db.insert(bookMarkedJobs).values({
		id: bookmarkId,
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
	console.log('req', res);

	return json({ success: true });
};
