import { lazy } from 'react'

export const PaymentScreen = lazy(() =>
  import('./payment').then(({ PaymentScreen }) => ({ default: PaymentScreen })),
)
