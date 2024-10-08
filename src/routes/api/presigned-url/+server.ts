import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ACCESS_ID, SECRET_KEY } from '$env/static/private';
import { uploadLimiter } from '$lib/server/rateLimiter';
import { updateUserPolicy } from '$lib/server/drizzle/dbModel';
import { BUCKET } from '$lib/constants';

const client = new S3Client({
	credentials: { accessKeyId: ACCESS_ID, secretAccessKey: SECRET_KEY },
	region: 'us-east-2'
});

export const POST: RequestHandler = async (event) => {
	const { request, locals } = event;
	if (!locals.user && (await uploadLimiter.isLimited(event))) {
		error(429, {
			message: 'capped'
		});
	}
	if (locals.user && locals.session && locals.session.id) {
		await updateUserPolicy(locals.user.id, true, locals.session?.id);
	}
	const res = await request.formData();
	const filename = res.get('filename') as File;
	const type = res.get('type');

	const username = locals.user ? locals.user.email.split('@')[0] : 'guest-user';
	//inserts into the s3 bucket
	try {
		const command = new PutObjectCommand({
			Bucket: BUCKET,
			Key: `${username}/${filename}`,
			ContentType: type as string
		});
		const uploadUrl = await getSignedUrl(client, command, { expiresIn: 540 });
		return json({ uploadUrl });
	} catch (err) {
		console.log('error', err);
		error(404, { message: 'Not found' });
	}
};
