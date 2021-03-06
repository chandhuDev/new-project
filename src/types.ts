import { StripeCardElement, Stripe } from '@stripe/stripe-js'

export interface PaymentData {
  stripe: Stripe
  element: StripeCardElement
}

export interface PaymentFormData {
  firstName: string
  lastName: string
  country: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zipCode: string
  phone: string
}
