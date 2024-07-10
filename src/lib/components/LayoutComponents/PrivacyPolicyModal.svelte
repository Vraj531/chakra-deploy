<script lang="ts">
	import Cookie from 'js-cookie';
	import type { PageData } from '../../../routes/$types';

	export let data: PageData;

	const handleSubmit = async (e: Event) => {
		const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement));
		console.log('dat', data);
		try {
			if (!data?.user) {
				Cookie.set('privacy_policy', 'true');
				const modal = document.getElementById('privacy-policy-modal') as HTMLDialogElement;
				modal.close();
				return;
			}
			if (formData.privacy_policy === 'on') {
				const res = await fetch('/api/agree-policy', {
					method: 'POST',
					body: JSON.stringify({ privacy_policy: true }),
					headers: {
						'Content-Type': 'application/json'
					}
				});
				const json = await res.json();
				// console.log('form', json);
				if (json?.userAgreed) {
					const modal = document.getElementById('privacy-policy-modal') as HTMLDialogElement;
					modal.close();
				}
			}
			// console.log('dat', data);
		} catch (error) {
			console.log('error', error);
		}
	};
</script>

<dialog id="privacy-policy-modal" class="modal modal-bottom sm:modal-middle">
	<div class="modal-box md:w-11/12 md:max-w-5xl pb-0 flex flex-col justify-center">
		<div class="prose mx-auto md:p-4">
			<h1>Website Terms and Conditions of Use</h1>

			<h2>Introduction</h2>
			<p>
				Welcome to Career Chakra. These Terms of Service ("Terms") govern your use of our website
				located at <a href="/">https://www.careerchakra.com</a> (the "Site") and any related services
				provided by Career Chakra ("we," "us," "our"). By accessing or using our Site, you agree to comply
				with and be bound by these Terms. If you do not agree to these Terms, please do not use our Site.
			</p>

			<h2>1. Acceptance of Terms</h2>

			<p>
				By accessing or using our Site, you represent that you have read, understood, and agree to
				be bound by these Terms, as well as our Privacy Policy, which is incorporated by reference
				into these Terms.
			</p>

			<h2>2. Eligibility</h2>

			<p>
				You must be at least 18 years old to use our Site. By using our Site, you represent and
				warrant that you are at least 18 years old and that you have the right, authority, and
				capacity to enter into and abide by these Terms.
			</p>

			<h2>3. Account Registration</h2>

			<p>
				To access certain features of our Site, you must register for an account using your Google
				account. By registering, you agree to provide accurate, current, and complete information
				and to keep this information up-to-date. You are responsible for maintaining the
				confidentiality of your account credentials and for all activities that occur under your
				account.
			</p>

			<h2>4. User Content</h2>

			<h3>4.1. Resume Uploads</h3>

			<p>
				Our Site allows you to upload your resume and other related documents ("User Content"). By
				uploading User Content, you grant us a non-exclusive, worldwide, royalty-free,
				sublicensable, and transferable license to use, reproduce, distribute, display, and perform
				your User Content in connection with our Site and services.
			</p>
			<h3>4.2. Responsibility for User Content</h3>
			<p>
				You are solely responsible for your User Content. You represent and warrant that you own or
				have the necessary rights and permissions to upload and share your User Content and that
				your User Content does not violate any third-party rights or any applicable laws.
			</p>

			<h2>5. Use of the Site</h2>
			<h3>5.1. Job Listings</h3>

			<p>
				Our Site provides a platform for displaying job listings. We do not guarantee the accuracy,
				completeness, or availability of any job listings and are not responsible for any errors or
				omissions in the listings.
			</p>

			<h2>5.2. Prohibited Activities</h2>
			<p>
				You agree not to use our Site for any unlawful or prohibited activities, including but not
				limited to:
			</p>
			<ul>
				<li>Uploading or sharing false or misleading information.</li>
				<li>
					Impersonating any person or entity or falsely stating or otherwise misrepresenting your
					affiliation with a person or entity.
				</li>
				<li>Engaging in any activity that disrupts or interferes with our Site or services.</li>
			</ul>
			<h2>6. User Data</h2>
			<h3>6.1. Collection and Use</h3>

			<p>
				We collect and use personal data in accordance with our Privacy Policy, which details the
				types of data we collect, the purposes for which we use it, and how we protect it. By using
				our Site, you consent to the collection and use of your data as described in our Privacy
				Policy.
			</p>

			<h3>6.2. Data Security</h3>
			<p>
				We implement appropriate technical and organizational measures to protect your data against
				unauthorized access, alteration, disclosure, or destruction. However, no method of
				transmission over the internet or electronic storage is completely secure, and we cannot
				guarantee absolute security.
			</p>

			<h3>6.3. Data Retention</h3>

			<p>
				We retain your personal data only for as long as necessary to fulfill the purposes for which
				it was collected, as outlined in our Privacy Policy, unless a longer retention period is
				required or permitted by law.
			</p>
			<h3>6.4. User Rights</h3>
			<p>
				You have certain rights regarding your personal data, including the right to access,
				correct, delete, and restrict its use. For more information on your rights and how to
				exercise them, please refer to our Privacy Policy.
			</p>
			<h2>7. Intellectual Property</h2>
			<p>
				All content and materials on our Site, including but not limited to text, graphics, logos,
				and software, are the property of Career Chakra or its licensors and are protected by
				intellectual property laws. You agree not to reproduce, distribute, or create derivative
				works from any content or materials on our Site without our prior written consent.
			</p>

			<h2>8. Privacy</h2>
			<p>
				Your use of our Site is also governed by our Privacy Policy, which can be found at [Privacy
				Policy URL]. Please review our Privacy Policy to understand our practices regarding the
				collection, use, and disclosure of your personal information.
			</p>
			<h2>9. Disclaimers</h2>
			<p>
				Our Site and services are provided on an "as-is" and "as-available" basis. We make no
				warranties, express or implied, regarding the availability, reliability, or accuracy of our
				Site or services. We disclaim all warranties, including but not limited to, the warranties
				of merchantability, fitness for a particular purpose, and non-infringement.
			</p>
			<h2>10. Limitation of Liability</h2>
			<p>
				To the maximum extent permitted by law, Career Chakra shall not be liable for any indirect,
				incidental, special, consequential, or punitive damages, or any loss of profits or revenues,
				whether incurred directly or indirectly, or any loss of data, use, goodwill, or other
				intangible losses, resulting from your use or inability to use our Site or services,
				unauthorized access to our servers, interruption or cessation of transmission to or from our
				Site, bugs, viruses, trojan horses, or any errors or omissions in any content posted,
				emailed, transmitted, or otherwise made available through our Site or services.
			</p>

			<h2>11. Indemnification</h2>
			<p>
				You agree to indemnify and hold harmless Career Chakra, its affiliates, officers, directors,
				employees, and agents from and against any claims, liabilities, damages, losses, and
				expenses, including without limitation reasonable legal and accounting fees, arising out of
				or in any way connected with your access to or use of our Site or services, your User
				Content, or your violation of these Terms.
			</p>

			<h2>12. Termination</h2>
			<p>
				We may terminate or suspend your access to our Site and services at any time, without prior
				notice or liability, for any reason, including if we believe you have breached these Terms.
				Upon termination, your right to use our Site and services will immediately cease.
			</p>

			<h2>14. Changes to Terms</h2>
			<p>
				We reserve the right to modify these Terms at any time. If we make material changes to these
				Terms, we will notify you by email or through our Site. Your continued use of our Site
				following any changes constitutes your acceptance of the revised Terms.
			</p>

			<h2>15. Contact Information</h2>
			<p>
				If you have any questions about these Terms, please contact us at: Career Chakra, <a
					href="mailto:help@careerchakra.com">help@careerchakra.com</a
				>
				. By using our Site, you acknowledge that you have read, understood, and agree to be bound by
				these Terms.
			</p>
			<form
				on:submit|preventDefault={handleSubmit}
				class="sticky bottom-0 bg-white pb-4 flex flex-col w-full"
			>
				<div class="form-control">
					<label class="label cursor-pointer">
						<span class="label-text">I agree to the terms of service and policy</span>

						<input
							type="checkbox"
							name="privacy_policy"
							class="checkbox checkbox-primary"
							required
						/>
					</label>
				</div>
				<button class="btn btn-primary" type="submit">Submit</button>
			</form>
		</div>
	</div>
</dialog>
