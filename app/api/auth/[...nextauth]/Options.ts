//@ts-nocheck
import { NextAuthOptions } from "next-auth"
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as any,
            clientSecret: process.env.GITHUB_SECRET as any,
        }),
        // GitHubProvider({
        //     clientId: "ee263fe138922c960388",
        //     clientSecret: "71774eeb1d77033b401a207f7f5fc79d0448a805",
        // }),
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            return "/dashboard"
        },
        session: async ({ session, token }: any) => {
            if (session?.user) {
                session.user.id = token.sub;
            }
            return session;
        },
        jwt: async ({ user, token }: any) => {
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET
}  