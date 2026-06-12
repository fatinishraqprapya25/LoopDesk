import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import prisma from "./prisma.js";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    baseURL: "http://localhost:5000/api/v1/auth",
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "USER"
            },
            status: {
                type: "string",
                defaultValue: "ACTIVE"
            },
            avatar: {
                type: "string",
                required: false
            }
        }
    }
});