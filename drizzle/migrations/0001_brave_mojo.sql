DROP TABLE `bookmarked_jobs`;--> statement-breakpoint
ALTER TABLE `users` RENAME COLUMN `google_id` TO `provider_id`;--> statement-breakpoint
DROP INDEX IF EXISTS `users_google_id_unique`;--> statement-breakpoint
ALTER TABLE `users` ADD `provider` text DEFAULT 'google' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `password` text;--> statement-breakpoint
CREATE UNIQUE INDEX `users_provider_id_unique` ON `users` (`provider_id`);--> statement-breakpoint
ALTER TABLE `guest_resumes` DROP COLUMN `email`;