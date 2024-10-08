<script lang="ts">
	import AOS from 'aos';
	import 'aos/dist/aos.css';
	import { onMount } from 'svelte';

	onMount(() => AOS.init({ duration: 1200, offset: 200 }));
</script>

<body>
	<section class="bg-white text-gray-600 body-font relative overflow-hidden">
		<div
			class="container mx-auto flex lg:px-20 md:px-10 px-5 py-5 md:flex-row flex-col items-center"
		>
			<div
				data-aos="fade-right"
				class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
			>
				<h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
					Find Your Dream Job <br class="hidden lg:inline-block" />with AI Power
				</h1>
				<p class="mb-8 leading-relaxed">
					At Career Chakra, we're all about connecting you with your ideal career through the magic
					of advanced AI technology. Say goodbye to irrelevant job suggestions and expired posts.
					Our platform keeps you updated with the freshest opportunities tailored just for you.
				</p>
				<div class="flex justify-center">
					<a
						href="/chakraai-new"
						class="inline-flex text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg"
						>Try Now</a
					>
				</div>
			</div>
			<div data-aos="fade-left" class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
				<img
					style="box-shadow: 4px 5px 30px 3px #FFF9E6;"
					class="object-cover object-center rounded"
					alt="hero"
					src="https://images.unsplash.com/photo-1506784926709-22f1ec395907?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				/>
			</div>
		</div>
		<img
			data-aos="fade-up"
			src="/nvidia_inception.webp"
			alt="nvidia-inception"
			class="max-w-40 mx-auto pb-10"
		/>
	</section>

	<section
		class="text-gray-600 body-font relative"
		style="background-color: #FFF9E6;"
		data-aos="fade-right"
		data-aos-offset="150"
	>
		<div class="container px-5 py-24 mx-auto">
			<div class="flex flex-col text-center w-full mb-20">
				<h3 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
					Why Choose Us?
				</h3>
			</div>
			<div class="flex flex-wrap">
				<div
					class="xl:w-1/2 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60"
				>
					<h2 class="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
						Exclusive Focus on USA, Canada and Indian Jobs
					</h2>
					<p class="leading-relaxed text-base mb-4">
						We specialize exclusively in job openings across the United States, Canada and Indian,
						ensuring you get access to the most relevant and up-to-date opportunities in your
						desired location.
					</p>
				</div>
				<div
					class="xl:w-1/2 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60"
				>
					<h2 class="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
						Real-Time Updates
					</h2>
					<p class="leading-relaxed text-base mb-4">
						Our database is updated multiple times daily, so you never miss out on the latest job
						openings. Stay ahead of the curve with fresh opportunities as soon as they hit the
						market.
					</p>
				</div>
			</div>
		</div>
	</section>

	<section class="text-gray-600 body-font overflow-hidden relative bg-white">
		<div class="ripple" style="top: -30rem; left: -30rem;"></div>
		<div class="ripple" style="top: -45rem; left: -45rem;"></div>
		<div class="ripple" style="top: -60rem; left: -60rem;"></div>

		<div class="text-center pt-20 mb-20" data-aos="fade-down" data-aos-offset="150">
			<h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">Features</h1>
			<p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">
				Experience cutting-edge features designed to revolutionize your job search process. From
				AI-powered matching to tailor-fit searches, find your dream job effortlessly.
			</p>
			<div class="flex mt-6 justify-center">
				<div class="w-16 h-1 rounded-full bg-yellow-500 inline-flex"></div>
			</div>
		</div>
		<div class="container lg:px-20 md:px-10 px-5 pb-24 mx-auto flex flex-wrap">
			<div class="flex flex-wrap -m-4">
				<div class="p-4 lg:w-1/2 md:w-full" data-aos="fade-right">
					<div
						class="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col"
					>
						<div
							class="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500 flex-shrink-0"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-8 h-8"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
								/>
							</svg>
						</div>
						<div class="flex-grow">
							<h2 class="text-gray-900 text-lg title-font font-medium mb-3">
								AI Powered Job Search
							</h2>
							<p class="leading-relaxed text-base">
								Discover job opportunities like never before with our AI-powered job search feature.
								Let advanced algorithms match you with the perfect career.
							</p>
							<a
								href="/chakraai-new"
								class="link-hover text-lg text-yellow-500 mt-2 flex gap-2 items-center"
								>Chakra AI

								<svg
									fill="currentColor"
									height="24px"
									width="24px"
									version="1.1"
									id="Layer_1"
									xmlns="http://www.w3.org/2000/svg"
									xmlns:xlink="http://www.w3.org/1999/xlink"
									viewBox="0 0 330 330"
									xml:space="preserve"
									><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
										id="SVGRepo_tracerCarrier"
										stroke-linecap="round"
										stroke-linejoin="round"
									></g><g id="SVGRepo_iconCarrier">
										<path
											id="XMLID_27_"
											d="M15,180h263.787l-49.394,49.394c-5.858,5.857-5.858,15.355,0,21.213C232.322,253.535,236.161,255,240,255 s7.678-1.465,10.606-4.394l75-75c5.858-5.857,5.858-15.355,0-21.213l-75-75c-5.857-5.857-15.355-5.857-21.213,0 c-5.858,5.857-5.858,15.355,0,21.213L278.787,150H15c-8.284,0-15,6.716-15,15S6.716,180,15,180z"
										></path>
									</g></svg
								>
							</a>
						</div>
					</div>
				</div>
				<div class="p-4 lg:w-1/2 md:w-full" data-aos="fade-left">
					<div
						class="h-full flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col"
					>
						<div
							class="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500 flex-shrink-0"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-10 h-10"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m7.848 8.25 1.536.887M7.848 8.25a3 3 0 1 1-5.196-3 3 3 0 0 1 5.196 3Zm1.536.887a2.165 2.165 0 0 1 1.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 1 1-5.196 3 3 3 0 0 1 5.196-3Zm1.536-.887a2.165 2.165 0 0 0 1.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863 2.077-1.199m0-3.328a4.323 4.323 0 0 1 2.068-1.379l5.325-1.628a4.5 4.5 0 0 1 2.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.33 4.33 0 0 0 10.607 12m3.736 0 7.794 4.5-.802.215a4.5 4.5 0 0 1-2.48-.043l-5.326-1.629a4.324 4.324 0 0 1-2.068-1.379M14.343 12l-2.882 1.664"
								/>
							</svg>
						</div>
						<div class="flex-grow">
							<h2 class="text-gray-900 text-lg title-font font-medium mb-3">
								Tailor Fit Job Search
							</h2>
							<p class="leading-relaxed text-base">
								Experience a job search tailored to your unique skills and preferences. Find the
								perfect job match with our tailor-fit search feature.
							</p>
							<a
								href="/upload"
								class="link-hover text-lg text-yellow-500 mt-2 flex gap-2 items-center"
								>Find a Job

								<svg
									fill="currentColor"
									height="24px"
									width="24px"
									version="1.1"
									id="Layer_1"
									xmlns="http://www.w3.org/2000/svg"
									xmlns:xlink="http://www.w3.org/1999/xlink"
									viewBox="0 0 330 330"
									xml:space="preserve"
									><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
										id="SVGRepo_tracerCarrier"
										stroke-linecap="round"
										stroke-linejoin="round"
									></g><g id="SVGRepo_iconCarrier">
										<path
											id="XMLID_27_"
											d="M15,180h263.787l-49.394,49.394c-5.858,5.857-5.858,15.355,0,21.213C232.322,253.535,236.161,255,240,255 s7.678-1.465,10.606-4.394l75-75c5.858-5.857,5.858-15.355,0-21.213l-75-75c-5.857-5.857-15.355-5.857-21.213,0 c-5.858,5.857-5.858,15.355,0,21.213L278.787,150H15c-8.284,0-15,6.716-15,15S6.716,180,15,180z"
										></path>
									</g></svg
								>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="bg-white text-gray-900 body-font">
		<div class="container lg:px-20 md:px-10 px-5 pb-0 mx-auto flex flex-wrap">
			<div class="flex flex-col text-center w-full mb-20">
				<h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900">How It Works</h1>
				<p class="lg:w-2/3 mx-auto mt-2 leading-relaxed text-base">
					Experience the seamless process of finding your dream job with our platform. Our
					step-by-step approach ensures you get the most out of your job search.
				</p>
			</div>

			<div class="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">
				<div class="h-full w-6 absolute inset-0 flex items-center justify-center">
					<div class="h-full w-1 bg-yellow-200 pointer-events-none"></div>
				</div>
				<div
					data-aos="fade-up"
					class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-yellow-500 text-white relative z-10 title-font font-medium text-sm"
				>
					1
				</div>
				<div
					data-aos="fade-up"
					class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row"
				>
					<div
						class="flex-shrink-0 w-24 h-24 bg-yellow-100 text-yellow-500 rounded-full inline-flex items-center justify-center"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-12 h-12"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
							/>
						</svg>
					</div>
					<div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
						<h2 class="font-medium title-font text-gray-900 mb-1 text-xl">Upload Your Resume</h2>
						<p class="leading-relaxed">
							Start by uploading your resume. Our platform will analyze it to understand your skills
							and experience.
						</p>
					</div>
				</div>
			</div>
			<div class="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
				<div class="h-full w-6 absolute inset-0 flex items-center justify-center">
					<div class="h-full w-1 bg-yellow-200 pointer-events-none"></div>
				</div>
				<div
					data-aos="fade-up"
					class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-yellow-500 text-white relative z-10 title-font font-medium text-sm"
				>
					2
				</div>
				<div
					data-aos="fade-up"
					class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row"
				>
					<div
						class="flex-shrink-0 w-24 h-24 bg-yellow-100 text-yellow-500 rounded-full inline-flex items-center justify-center"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-12 h-12"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
							/>
						</svg>
					</div>
					<div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
						<h2 class="font-medium title-font text-gray-900 mb-1 text-xl">Add Additional Skills</h2>
						<p class="leading-relaxed">
							Include any additional skills you have to ensure the best matches. The more we know,
							the better the results.
						</p>
					</div>
				</div>
			</div>
			<div class="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
				<div class="h-full w-6 absolute inset-0 flex items-center justify-center">
					<div class="h-full w-1 bg-yellow-200 pointer-events-none"></div>
				</div>
				<div
					data-aos="fade-up"
					class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-yellow-500 text-white relative z-10 title-font font-medium text-sm"
				>
					3
				</div>
				<div
					data-aos="fade-up"
					class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row"
				>
					<div
						class="flex-shrink-0 w-24 h-24 bg-yellow-100 text-yellow-500 rounded-full inline-flex items-center justify-center"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-12 h-12"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
							/>
						</svg>
					</div>
					<div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
						<h2 class="font-medium title-font text-gray-900 mb-1 text-xl">Get Matched</h2>
						<p class="leading-relaxed">
							Let our advanced AI do the work. You'll receive job matches that fit your profile
							perfectly, keeping you updated with the latest opportunities.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section data-aos="fade-right" class="text-gray-600 body-font relative">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"
			><path
				fill="#fff9e6"
				fill-opacity="1"
				d="M0,128L80,128C160,128,320,128,480,133.3C640,139,800,149,960,149.3C1120,149,1280,139,1360,133.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
			></path></svg
		>
		<div class="" style="background-color: #FFF9E6;">
			<div class="container px-5 pb-24 mx-auto relative">
				<svg
					class="absolute w-24 h-24 lg:top-20 lg:right-20 md:top-5 md:right-5 top-5 right-0 lg:opacity-15 opacity-10"
					xmlns="http://www.w3.org/2000/svg"
					shape-rendering="geometricPrecision"
					text-rendering="geometricPrecision"
					image-rendering="optimizeQuality"
					fill-rule="evenodd"
					clip-rule="evenodd"
					viewBox="0 0 507 511.92"
					><path
						d="M120.31 165.84h223.17a5.62 5.62 0 0 1 5.61 5.61v95.56c0 3.08-2.53 5.6-5.61 5.6H120.31c-3.08 0-5.61-2.52-5.61-5.6v-95.56c0-3.09 2.53-5.61 5.61-5.61zM223.35 0c61.61 0 117.49 25.07 157.96 65.38 40.48 40.48 65.39 96.19 65.39 157.97 0 45.06-13.44 87.18-36.38 122.24L507 450.96l-66.69 60.96-93.24-102.58c-35.4 23.59-78 37.36-123.72 37.36-61.61 0-117.49-25.07-157.97-65.38C24.91 340.84 0 285.13 0 223.35c0-61.61 25.07-117.49 65.38-157.97C105.86 24.91 161.57 0 223.35 0zm140.27 83.08c-35.89-35.89-85.54-58.17-140.27-58.17-54.73 0-104.38 22.28-140.27 58.17-35.89 35.89-58.17 85.54-58.17 140.27 0 52.99 20.89 101.22 54.79 136.81V131.55c0-4.57 3.71-8.28 8.28-8.28H375.8c4.58 0 8.29 3.71 8.29 8.28v208.07c23.69-32.68 37.7-72.88 37.7-116.27 0-54.73-22.29-104.38-58.17-140.27zM96.27 375.67c34.42 28.76 78.77 46.12 127.08 46.12 54.73 0 104.38-22.28 140.27-58.17 1.32-1.32 2.62-2.66 3.9-4.02V139.84H96.27v235.83zm30.94-60.5c-5.1 0-9.24-4.13-9.24-9.23 0-5.1 4.14-9.24 9.24-9.24h80.18c5.1 0 9.23 4.14 9.23 9.24 0 5.1-4.13 9.23-9.23 9.23h-80.18zm130.13 42.6a9.27 9.27 0 0 1-9.27-9.27 9.27 9.27 0 0 1 9.27-9.27h78.92a9.27 9.27 0 0 1 9.27 9.27 9.27 9.27 0 0 1-9.27 9.27h-78.92zm-130.13-.03c-5.1 0-9.24-4.14-9.24-9.24 0-5.1 4.14-9.24 9.24-9.24h80.18c5.1 0 9.23 4.14 9.23 9.24 0 5.1-4.13 9.24-9.23 9.24h-80.18zm130.13-42.54c-5.12 0-9.27-4.15-9.27-9.26a9.27 9.27 0 0 1 9.27-9.27h78.92a9.27 9.27 0 0 1 9.27 9.27c0 5.11-4.15 9.26-9.27 9.26h-78.92zm-82.13-123.84h16.62v30.27c0 6.35-.54 11.19-1.63 14.51-1.08 3.31-3.26 6.13-6.55 8.44-3.28 2.29-7.48 3.45-12.6 3.45-5.41 0-9.6-.77-12.57-2.28-2.98-1.52-5.28-3.74-6.9-6.67-1.62-2.92-2.58-6.54-2.87-10.85l15.8-2.23c.02 2.44.23 4.25.62 5.43.38 1.2 1.05 2.15 1.98 2.89.64.48 1.54.71 2.71.71 1.86 0 3.22-.71 4.09-2.14.86-1.43 1.3-3.84 1.3-7.23v-34.3zm25.66 27.91c0-9.1 2.43-16.18 7.31-21.24 4.88-5.08 11.66-7.6 20.37-7.6 8.92 0 15.8 2.49 20.63 7.46 4.82 4.98 7.23 11.96 7.23 20.92 0 6.51-1.05 11.85-3.15 16.01-2.11 4.17-5.17 7.41-9.15 9.73-3.99 2.32-8.96 3.48-14.91 3.48-6.04 0-11.04-1-15.01-3-3.95-2.01-7.17-5.17-9.63-9.51-2.46-4.32-3.69-9.74-3.69-16.25zm16.54.04c0 5.61 1.01 9.66 3.02 12.11 2.02 2.45 4.77 3.69 8.24 3.69 3.55 0 6.32-1.21 8.27-3.61 1.95-2.41 2.93-6.72 2.93-12.96 0-5.24-1.03-9.07-3.06-11.48-2.05-2.43-4.8-3.63-8.3-3.63-3.34 0-6.03 1.23-8.05 3.68-2.04 2.45-3.05 6.53-3.05 12.2zm48.12-27.95h31.03c5.16 0 9.13 1.34 11.9 4 2.77 2.65 4.15 5.95 4.15 9.88 0 3.3-.98 6.13-2.97 8.47-1.31 1.59-3.24 2.82-5.77 3.74 3.85.96 6.67 2.61 8.49 4.96 1.81 2.34 2.72 5.29 2.72 8.83 0 2.89-.65 5.49-1.93 7.8-1.3 2.31-3.07 4.12-5.3 5.47-1.4.83-3.5 1.44-6.3 1.82-3.73.5-6.2.76-7.43.76h-28.59v-55.73zm16.69 22.56h7.23c2.58 0 4.39-.46 5.4-1.38 1.01-.93 1.52-3.65 1.52-5.41 0-1.62-.52-2.89-1.52-3.8-1.01-.91-2.79-1.37-5.29-1.37h-7.34v11.96zm0 21.88h8.45c2.85 0 4.86-.54 6.04-1.59 1.17-1.05 1.76-3.83 1.76-5.6 0-1.65-.58-2.98-1.74-3.97-1.16-1-3.19-1.51-6.1-1.51h-8.41v12.67z"
					/></svg
				>
				<div
					class="flex flex-col items-center lg:items-start lg:w-2/3 mx-auto sm:flex-row sm:items-center"
				>
					<h1 class="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">
						Ready to transform your job search experience? Join Career Chakra today and unlock the
						power of AI-driven job matching!
					</h1>
					<a
						href="/upload"
						class="flex-shrink-0 text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-md mt-10 sm:mt-0 ali"
						>Get Started</a
					>
				</div>
			</div>
		</div>
	</section>
</body>

<style>
	@keyframes ripple {
		0% {
			transform: scale(0.2);
			opacity: 0.8;
		}
		20% {
			transform: scale(0.5);
			opacity: 0.8;
		}
		50% {
			transform: scale(1);
			opacity: 0.4;
		}
		80% {
			transform: scale(1.8);
			opacity: 0.2;
		}
		100% {
			transform: scale(2.5);
			opacity: 0;
		}
	}
	@-webkit-keyframes ripple {
		0% {
			transform: scale(0.2);
			opacity: 0.8;
		}
		20% {
			transform: scale(0.5);
			opacity: 0.8;
		}
		50% {
			transform: scale(1);
			opacity: 0.4;
		}
		80% {
			transform: scale(1.8);
			opacity: 0.2;
		}
		100% {
			transform: scale(2.5);
			opacity: 0;
		}
	}
	.ripple {
		position: absolute;
		height: 80rem;
		width: 80rem;
		border: 3px solid #fefcbf; /* yellow-100 color */
		border-radius: 50%;
		background-color: transparent;
		opacity: 0;
		animation: ripple 10s infinite;
	}
	.ripple:nth-child(2) {
		animation-delay: 0.8s;
	}
	.ripple:nth-child(3) {
		animation-delay: 1.6s;
	}
</style>
