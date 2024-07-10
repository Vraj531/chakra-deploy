import nodemailer from 'nodemailer';
import * as aws from '@aws-sdk/client-ses';

import { EMAIL_ACCESS_ID, EMAIL_SECRET_KEY } from '$env/static/private';

const FROM_EMAIL = 'gouravdeb@gmail.com';
//import { z } from "zod";
export default async function sendEmail(
	email: string,
	subject: string,
	bodyHtml?: string,
	bodyText?: string
) {
	const ses = new aws.SES({
		apiVersion: '2010-12-01',
		region: 'ap-south-1',
		credentials: {
			accessKeyId: EMAIL_ACCESS_ID || '',
			secretAccessKey: EMAIL_SECRET_KEY || ''
		}
	});

	// create Nodemailer SES transporter
	const transporter = nodemailer.createTransport({
		SES: { ses, aws }
	});

	try {
		if (!bodyText) {
			transporter.sendMail(
				{
					from: FROM_EMAIL,
					to: email,
					subject: subject,
					html: bodyHtml
				},
				(err) => {
					if (err) {
						throw new Error(`Error sending email: ${JSON.stringify(err)}`);
					}
				}
			);
		} else if (!bodyHtml) {
			transporter.sendMail(
				{
					from: FROM_EMAIL,
					to: email,
					subject: subject,
					text: bodyText
				},
				(err) => {
					if (err) {
						throw new Error(`Error sending email: ${JSON.stringify(err)}`);
					}
				}
			);
		} else {
			transporter.sendMail(
				{
					from: FROM_EMAIL,
					to: email,
					subject: subject,
					html: bodyHtml,
					text: bodyText
				},
				(err) => {
					if (err) {
						throw new Error(`Error sending email: ${JSON.stringify(err)}`);
					}
				}
			);
		}
		console.log('E-mail sent successfully!');
		return {
			statusCode: 200,
			message: 'E-mail sent successfully.'
		};
	} catch (error) {
		console.log(`Error sending email: ${JSON.stringify(error)}`);
	}
}
