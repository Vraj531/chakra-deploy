import { sqliteTable, AnySQLiteColumn, text, foreignKey, integer } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const users = sqliteTable("users", {
	id: text("id").primaryKey().notNull(),
	email: text("email").notNull(),
	name: text("name").notNull(),
	provider_id: text("provider_id").notNull(),
	picture: text("picture").default("").notNull(),
	timestamp: text("timestamp").default("sql`(CURRENT_TIMESTAMP)`"),
	provider: text("provider").default("google").notNull(),
	password: text("password"),
});

export const sessions = sqliteTable("sessions", {
	id: text("id").primaryKey().notNull(),
	user_id: text("user_id").notNull().references(() => users.id),
	expires_at: integer("expires_at").notNull(),
});

export const resumes = sqliteTable("resumes", {
	id: text("id").primaryKey().notNull(),
	user_id: text("user_id").notNull().references(() => users.id),
	email: text("email").notNull(),
	file_location: text("file_location").notNull(),
	pdf_url: text("pdf_url").notNull(),
});

export const guest_resumes = sqliteTable("guest_resumes", {
	id: text("id").primaryKey().notNull(),
	file_location: text("file_location").notNull(),
	pdf_url: text("pdf_url").notNull(),
});