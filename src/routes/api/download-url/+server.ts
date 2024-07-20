import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ACCESS_ID, LAMBDA_URL, SECRET_KEY } from '$env/static/private';
import { addGuestResume, addResume } from '$lib/server/drizzle/dbModel';
import { downloadLimiter } from '$lib/server/rateLimiter';

const client = new S3Client({
	region: 'us-east-2',
	credentials: { accessKeyId: ACCESS_ID, secretAccessKey: SECRET_KEY }
});

interface RequestFileProp {
	s3Url: string;
	sessionId: string;
	filename: string;
	expiresIn: number;
	inputText: string;
}

interface IResponse {
	statusCode: number;
	body: string;
}

export const POST: RequestHandler = async (event) => {
	if (!event.locals.user && (await downloadLimiter.isLimited(event))) {
		return error(401, { message: 'Unauthorized' });
	}
	const { request, locals } = event;

	const { expiresIn, filename, inputText } = (await request.json()) as RequestFileProp;

	const userEmail = locals.user ? locals.user.email : 'guestuser@gmail.com';
	const username = !locals.user ? 'guest-user' : locals.user.email.split('@')[0];
	// console.log('session id log', locals.session?.id);

	const command = new GetObjectCommand({
		Bucket: 'nikhil-pipeline-storage',
		Key: `${username}/${filename}`,
		ResponseContentDisposition: `attachment; filename="${filename}"`
	});
	const downloadUrl = await getSignedUrl(client, command, {
		expiresIn: Number(expiresIn) * 60
	});

	if (downloadUrl) {
		try {
			// console.log('value sent', {
			// 	id,
			// 	email: userEmail
			// });
			if (!locals.user) {
				await addGuestResume({ filename: `${username}/${filename}`, pdfUrl: downloadUrl });
				// if(!res)
			} else {
				const userid = locals.user.id;
				const res = await addResume({
					email: userEmail,
					fileLocation: `${username}/${filename}`,
					pdfUrl: downloadUrl,
					userId: userid
				});
				if (!res) error(500, { message: 'error adding resume' });
			}

			// console.log('res', inputText, 'key', `${username}/${filename}`);

			const res = await fetch(LAMBDA_URL, {
				method: 'POST',
				body: JSON.stringify({
					additional_text: inputText,
					pdf_file_location: `s3://nikhil-pipeline-storage/${username}/${filename}`
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			// console.log('response', await res.json());
			const fullResponse = (await res.json()) as IResponse;
			if ('body' in fullResponse) {
				const body = JSON.parse(fullResponse.body);
				// if (!locals.user) {
				// 	//return only the first 5 elements
				// 	body = body.slice(0, 5);
				// }
				console.log('body', body.length);
				return json(body);
			} else return json({ error: 'error reading pdf' });
		} catch (error) {
			return json(error);
		}
	}
	error(500, { message: 'web service error' });
};
