import nodemailer from 'nodemailer';
import * as aws from '@aws-sdk/client-ses';

import { EMAIL_ACCESS_ID, EMAIL_SECRET_KEY } from '$env/static/private';

// const FROM_EMAIL = 'gouravdeb@gmail.com';
const FROM_EMAIL = 'help@careerchakra.com';

export default async function sendEmail(
	email: string,
	subject: string,
	bodyHtml?: string,
	bodyText?: string
) {
	const ses = new aws.SES({
		apiVersion: '2012-10-17',
		region: 'us-west-2',
		credentials: {
			accessKeyId: EMAIL_ACCESS_ID,
			secretAccessKey: EMAIL_SECRET_KEY
		}
	});
	// create Nodemailer SES transporter
	const transporter = nodemailer.createTransport({
		SES: { ses, aws }
	});

	try {
		if (!bodyText) {
			await transporter.sendMail({
				from: FROM_EMAIL,
				to: email,
				subject: subject,
				html: bodyHtml
			});
		} else if (!bodyHtml) {
			await transporter.sendMail({
				from: FROM_EMAIL,
				to: email,
				subject: subject,
				text: bodyText
			});
		} else {
			await transporter.sendMail(
				{
					from: FROM_EMAIL,
					to: email,
					subject: subject,
					html: bodyHtml,
					text: bodyText
				}
				// (err, info) => cb(err, info)
			);
		}
		// console.log('E-mail sent successfully!');
		return {
			statusCode: 200,
			message: 'E-mail sent successfully.'
		};
	} catch (error) {
		// console.log(`Error sending email: ${JSON.stringify(error)}`);
		return { statusCode: 500, message: `Error sending email: ${JSON.stringify(error)}` };
	}
}
