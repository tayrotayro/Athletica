import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/db/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compareSync } from 'bcrypt-ts-edge'
import { authConfig } from './auth.config'

export const config = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        //Find user in DB
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string
          }
        })

        // Check if user exists and if the pass matches
        if (user && user.password) {
          const isMatch = compareSync(credentials.password as string, user.password)

          //if password is correct, return user
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role
            }
          }
        }
        // if user does not exists or password does not match then return null
        return null
      }

    })
  ],
  callbacks: {
    async session({ session, user, trigger, token }: any) {
      // set user ID from token
      session.user.id = token.sub
      session.user.role = token.role
      session.user.name = token.name
      
      // if there is an update, set the user name
      if (trigger === 'update') {
        session.user.name = user.name
      }

      return session
    },
    async jwt({ token, user, trigger, session}: any) {
      // assign user fields to token
      if (user) {
        token.role = user.role

        // if user has no name then use email
        if (user.name === 'NO_NAME') {
          token.name = user.email!.split('@')[0]

          // update database to reflect token name
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name }
          })
        }
      }
      return token;
    },
    ...authConfig.callbacks,
  }
}

export const { handlers, auth, signIn, signOut} = NextAuth(config)