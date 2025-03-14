'use server'
import { shippingAddressSchema, signInFormSchema, signUpFormSchema } from "../validators"
import { signIn, signOut } from '@/auth'
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { hashSync } from "bcrypt-ts-edge"
import { prisma } from '@/db/prisma'
import { formatError } from "../utils"
import { ShippingAddress } from "@/types"
import { auth } from "@/auth"

// Sign in user with credentials
export async function signInWithCredentials(prevState: unknown, formData: FormData) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password')
    })

    await signIn('credentials', user)

    return { success: true, message: 'Signed in successfully'}
  } catch (e) {
    if (isRedirectError(e)) {
      throw e
    }

    return { success: false, message: 'Invalid email or password'}
  }
}

// Sign user out
export async function signOutUser() {
  await signOut();
}

// Sign up user
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    })

    const unHasedPassword = user.password

    user.password = hashSync(user.password, 10)

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password
      }
    })

    await signIn('credentials', {
      email: user.email,
      password: unHasedPassword
    })

    return { success: true, message: "User registered successfully"}
  } catch (e) {
    if (isRedirectError(e)) {
      throw e
    }

    return { success: false, message: formatError(e) }
  }
}

export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  })

  if (!user) throw new Error('User not found');
  return user;
}

// Update users address
export async function updateUserAddress(data: ShippingAddress) {
  try {
    const session = await auth();
    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id }
    })
    if (!currentUser) throw new Error('User not found')

    const address = shippingAddressSchema.parse(data)

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { address: address}
    })

    return {
      success: true,
      message: 'User updated successfully',
    }
  } catch (e) {
    return { 
      success: false,
      message: formatError(e)
    }
  }
}