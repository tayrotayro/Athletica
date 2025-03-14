export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Prosotre"
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_NAME || "A modern ecommerce store"
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 4

export const signInDefaultValues = {
  email: process.env.ENV === 'LOCAL' ? 'taylor@gmail.com' : '',
  password: process.env.ENV === 'LOCAL' ? 'Hello123' : '',
}

export const signUpDefaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export const shippingAddressDefaultValues = {
  fullName: process.env.ENV === 'LOCAL' ? 'John Doe' : '',
  streetAddress: process.env.ENV === 'LOCAL' ? '123 Main st' : '',
  city: process.env.ENV === 'LOCAL' ? 'anytown' : '',
  postalCode: process.env.ENV === 'LOCAL' ? '12345' : '',
  country: process.env.ENV === 'LOCAL' ? 'USA' : ''
}

// Pink from logo
// #db518c
// rgba(219,81,140,255)

// Blue from logo
// #13a1ee
// rgba(19,161,238,255)