import lucia from "lucia-auth";
import { sveltekit } from "lucia-auth/middleware";
import prisma from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { dev } from "$app/environment";
import { google } from '@lucia-auth/oauth/providers';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } from '$env/static/private';

export const auth = lucia({
    adapter: prisma(new PrismaClient()),
    env: dev ? "DEV" : "PROD",
    middleware: sveltekit(),
    transformDatabaseUser: (userData) => {
        return {
            userId: userData.id,
            name: userData?.name,
        };
    }
});

export type Auth = typeof auth;

export const googleAuth = google(auth, {
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    redirectUri: GOOGLE_REDIRECT_URI,
})