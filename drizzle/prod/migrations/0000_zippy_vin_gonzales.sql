CREATE TABLE `bookmarked_jobs` (
	`id` text PRIMARY KEY NOT NULL,
	`job_id` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`published_date` text NOT NULL,
	`company_name` text NOT NULL,
	`title` text NOT NULL,
	`location` text,
	`has_remote` integer,
	`experience` text,
	`job_posting_url` text,
	`clearance_required` integer,
	`min_salary` text,
	`max_salary` text,
	`salary_currency` text,
	`job_type` text NOT NULL,
	`company_logo` text,
	`company_website_url` text NOT NULL,
	`company_linkedin_url` text,
	`job_description` text NOT NULL,
	`country_name` text,
	`company_id` integer
);
--> statement-breakpoint
CREATE TABLE `guest_resumes` (
	`id` text PRIMARY KEY NOT NULL,
	`file_location` text NOT NULL,
	`pdf_url` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `interested_jobs` (
	`user_id` text,
	`job_id` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(`job_id`, `user_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `tokens` (
	`id` text PRIMARY KEY NOT NULL,
	`token` text NOT NULL,
	`type` text DEFAULT 'mail' NOT NULL,
	`expires_at` integer DEFAULT (unixepoch() + 600) NOT NULL,
	`user_id` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `resumes` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`email` text NOT NULL,
	`file_location` text NOT NULL,
	`pdf_url` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`provider_id` text NOT NULL,
	`provider` text DEFAULT 'google' NOT NULL,
	`password` text,
	`agreed_to_privacy_policy` integer,
	`is_verified` integer,
	`picture` text DEFAULT '' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `user_to_bookmark` (
	`user_id` text,
	`bookmark_id` text,
	`job_id` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(`bookmark_id`, `user_id`)
);
--> statement-breakpoint
CREATE INDEX `job_id_index` ON `bookmarked_jobs` (`job_id`);--> statement-breakpoint
CREATE INDEX `user_id_index` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_provider_id_unique` ON `users` (`provider_id`);--> statement-breakpoint
CREATE INDEX `email_index` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `user_id_bookmark_id_index` ON `user_to_bookmark` (`user_id`);