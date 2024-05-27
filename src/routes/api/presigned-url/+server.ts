import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ACCESS_ID, SECRET_KEY } from '$env/static/private';

const client = new S3Client({
	// apiVersion: "2006-03-01",
	credentials: { accessKeyId: ACCESS_ID, secretAccessKey: SECRET_KEY },
	// region: 'ap-south-1'
	region: 'us-east-2'
});

export const POST: RequestHandler = async ({ request, locals }) => {
	const res = await request.formData();
	const filename = res.get('filename') as File;
	const type = res.get('type');
	// const sessionId = res.get('sessionId');
	// const s3Command = new ListBucketsCommand({});
	// const { Owner, Buckets } = await client.send(s3Command);
	// console.log('owner, bucket', Owner, Buckets);

	if (!locals.user) {
		return error(404, { message: 'Not found' });
	}

	const userEmail = locals.user.email.split('@')[0];
	// console.log('user id', userId);
	//inserts into the s3 bucket
	try {
		const command = new PutObjectCommand({
			Bucket: 'nikhil-pipeline-storage',
			// Bucket: 'stream-bin',
			Key: `${userEmail}/${filename}`,
			ContentType: type as string
		});
		const uploadUrl = await getSignedUrl(client, command, { expiresIn: 540 });
		return json({ uploadUrl });
		// return uploadUrl;
	} catch (err) {
		console.log('error', err);
		error(404, { message: 'Not found' });
	}
};
