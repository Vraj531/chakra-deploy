import { relations } from "drizzle-orm/relations";
import { users, sessions, resumes } from "./schema";

export const sessionsRelations = relations(sessions, ({one}) => ({
	user: one(users, {
		fields: [sessions.user_id],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	sessions: many(sessions),
	resumes: many(resumes),
}));

export const resumesRelations = relations(resumes, ({one}) => ({
	user: one(users, {
		fields: [resumes.user_id],
		references: [users.id]
	}),
}));