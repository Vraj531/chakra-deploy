CREATE TABLE `bookmarked_jobs` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`location` text,
	`has_remote` integer,
	`published_date` text NOT NULL,
	`experience` text,
	`job_posting_url` text,
	`clearance_required` integer,
	`min_salary` text,
	`max_salary` text,
	`salary_currency` text,
	`job_type` text NOT NULL,
	`company_name` text NOT NULL,
	`company_logo` text,
	`company_website_url` text NOT NULL,
	`company_linkedin_url` text,
	`job_description` text NOT NULL,
	`country_name` text,
	`company_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `guest_resumes` (
	`id` text PRIMARY KEY NOT NULL,
	`file_location` text NOT NULL,
	`pdf_url` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `users` RENAME COLUMN `google_id` TO `provider_id`;--> statement-breakpoint

ALTER TABLE `users` ADD `provider` text DEFAULT 'google' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `password` text;