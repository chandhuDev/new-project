import { lazy } from 'react'

export const PaymentScreen = lazy(() =>
  import('./payment').then(({ PaymentScreen }) => ({ default: PaymentScreen })),
)
export const ProfileScreen = lazy(() =>
  import('./profile').then(({ ProfileScreen }) => ({ default: ProfileScreen })),
)
