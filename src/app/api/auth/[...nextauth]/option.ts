import prisma from "@/Db/db.config";
import { User } from "@/generated/prisma";
import NextAuth, { ISODateString } from "next-auth"
import { AuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";


export type customeSession = {
    user: customeUser,
    expires: ISODateString
}

export type customeUser = {
    id: string | null,
    name: string | null,
    email: string | null,
}

export const authOptions: AuthOptions = {
    pages: {
        signIn: "/logIn",
        error: "/error",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ account, profile }: any) {
            if (account.provider === "google") {
                return profile.email_verified && profile.email.endsWith("@gmail.com")
            }
            return true
        },
        async jwt({ token, user }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (user) {
                token.user = user
            }
            return token
        },
        async session({ session, token, user }: { session: customeSession, token: JWT, user: User }) {
            session.user = token.user as customeUser
            return session
        }
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        // image?: true,
                    }
                })

                if (user) {

                    return { ...user, id: user.id.toString() }
                } else {
                    return null
                }
            }
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                }
            }
        })

    ]
}

export default NextAuth(authOptions)