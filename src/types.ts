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

/** Represents user model. */
export interface User {
  _id?: string
  firebaseId?: string

  role?: 'user' | 'admin'
  paymentCompleted?: boolean
  shareCount : number,
  tapsCount: number,
  isVerified: boolean,
  cardStatus:boolean,
  contacts: {
    name?: string
    bio?: string

    phone?: string
    email?: string
    website?: string

    location?: string
    company?: string
    position?: string
    avatarUrl?: any
    coverUrl?: any
    first_name?:any
    last_name?:any
  }

  identities: UserIdentities
  hideIdentities:hideIdentities
  createdAt?: number
  updatedAt?: number
  //cardStatus?:boolean
}

export interface UserIdentities {
  instagram: string
  snapchat: string
  twitter: string
  facebook: string
  linkedin: string
  youtube: string
  tiktok: string
  spotify: string
  appleMusic: string
  paypal: string
  whatsapp: string
  twitch: string
  telegram: string
  pinterest: string
  googlepay:string
  phonepe:string,
  paytm:string,
  freelancer:string,
  calendly:string,
}
export interface hideIdentities {
  instagram: boolean
  snapchat: boolean
  twitter: boolean
  facebook: boolean
  linkedin: boolean
  youtube: boolean
  tiktok: boolean
  spotify: boolean
  appleMusic: boolean
  paypal: boolean
  whatsapp: boolean
  twitch: boolean
  telegram: boolean
  pinterest: boolean
 
}