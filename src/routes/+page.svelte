<script lang="ts">
	import { PUBLIC_CLOUDFRONT } from '$env/static/public';
</script>

<section class="bg-gradient-to-b from-gray-50 to-amber-200">
	<div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
		<div class="mx-auto place-self-center lg:col-span-12">
			<h1
				class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"
			>
				Find Your Dream Job with AI Power
			</h1>
			<p
				class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
			>
				At Career Chakra, we are dedicated to connecting job seekers with their ideal careers
				through the power of advanced AI technology. Our platform is designed to provide you with
				the most relevant job matches, ensuring you never miss out on the latest and greatest
				opportunities.
			</p>
			<a
				href="/google"
				class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-xl bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
			>
				Find your Next Job
				<svg
					class="w-5 h-5 ml-2 -mr-1"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
						clip-rule="evenodd"
					></path></svg
				>
			</a>
		</div>
		<!-- <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
			<img
				src={`${PUBLIC_CLOUDFRONT}/office1.jpg`}
				alt="mockup"
				class="w-full ml-24 max-h-svh"
				loading="lazy"
			/>
		</div> -->
	</div>
</section>
<section class="bg-gradient-to-t from-gray-50 to-amber-200">
	<div
		class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6"
	>
		<div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
			<h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
				How It Works
			</h2>
			<p class="mb-4">
				Upload your resume, add your additional skills, and let our sophisticated AI take care of
				the rest. Our advanced technology analyzes your skills, experience, and career goals to
				match you with the best job opportunities tailored specifically to your profile. With our
				database updated daily, you will always have recent to the freshest job listings,
				eliminating the frustration of expired job posts.
			</p>
			<p>
				We are strategists, designers and developers. Innovators and problem solvers. Small enough
				to be simple and quick.
			</p>
		</div>
		<div class="grid grid-cols-2 gap-4 mt-8">
			<img
				class="w-full rounded-lg"
				src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
				alt="office content 1"
			/>
			<img
				class="mt-4 w-full lg:mt-10 rounded-lg"
				src={`${PUBLIC_CLOUDFRONT}/office3.jpg`}
				alt="office content 2"
			/>
		</div>
	</div>
</section>

<section class="bg-gradient-to-b from-gray-50 to-amber-200">
	<div class="py-8 px-4 flex mx-auto max-w-screen-xl sm:py-16 lg:px-6 justify-evenly">
		<div class="max-w-screen-md">
			<h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
				The Problem with Traditional Job Portals
			</h2>
			<p class="mb-8 font-light text-gray-500 sm:text-xl dark:text-gray-400">
				Many job seekers struggle to find the right opportunities due to the inherent limitations of
				traditional job portals. These platforms often feature expired or inactive job posts,
				leading to wasted time and resentment. Basic keyword matching and lack of personalized
				recommendations mean users frequently receive irrelevant job suggestions. Additionally, the
				user experience on these sites can be cumbersome, with complex interfaces and inefficient
				search functions making navigation difficult. Perhaps most concerning is the prevalence of
				fake job listings, which can mislead job seekers and waste valuable time. Infrequent updates
				further exacerbate these issues, resulting in missed opportunities as new job postings are
				not added promptly.
			</p>
			<!-- <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
				<a
					href="/"
					class="inline-flex items-center justify-center px-4 py-2.5 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
				>
					Get started
				</a>
			</div> -->
		</div>
		<div>
			<img
				class="w-full rounded-lg max-h-96"
				src={`${PUBLIC_CLOUDFRONT}/office7.jpg`}
				alt="office content 1"
			/>
		</div>
	</div>
</section>
<section class="bg-gradient-to-t from-gray-50 to-amber-200">
	<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
		<div class="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
			<h2 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
				Why Choose Us?
			</h2>
			<p class="mb-4 font-light">
				At Career Chakra, we understand these disappointments and have designed our platform to
				address these challenges head-on. Our cutting-edge AI technology ensures you receive job
				recommendations that truly fit your qualifications and aspirations. We take extra steps to
				verify job listings, minimizing the risk of encountering fake postings and ensuring you are
				presented with genuine opportunities. Our commitment to keeping job listings current means
				you will always have access to the latest openings, without the clutter of expired
				positions.
			</p>
			<p class="mb-4 font-medium">
				Our user-friendly design makes navigating the platform a seamless and efficient experience,
				so you can focus on what matters most – finding your next career opportunity.
			</p>
			<!-- <a
				href="/"
				class="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700"
			>
				Learn more
				<svg
					class="ml-1 w-6 h-6"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
						clip-rule="evenodd"
					></path></svg
				>
			</a> -->
		</div>
	</div>
</section>
<section class="bg-gradient-to-b from-gray-50 to-amber-200">
	<div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
		<div class="max-w-screen-md">
			<h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
				Join Us Today
			</h2>
			<p class="mb-8 font-light text-gray-500 sm:text-xl dark:text-gray-400">
				Take the next step in your career journey with Career Chakra. Upload your resume today and
				discover the opportunities waiting for you. Whether you are a seasoned professional or just
				starting out, we are here to help you find the perfect job.
			</p>
			<div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
				<!-- <a
					href="/"
					class="inline-flex items-center justify-center px-4 py-2.5 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
				>
					Get started
				</a> -->
			</div>
		</div>
	</div>
</section>

<!-- <style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style> -->
