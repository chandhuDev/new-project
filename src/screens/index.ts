import { lazy } from 'react'

export const PaymentScreen = lazy(() =>
  import('./payment').then(({ PaymentScreen }) => ({ default: PaymentScreen })),
)
export const ProfileScreen = lazy(() =>
  import('./profile').then(({ ProfileScreen }) => ({ default: ProfileScreen })),
)
export const FinishScreen = lazy(() =>
  import('./finish').then(({ FinishScreen }) => ({ default: FinishScreen })),
)
