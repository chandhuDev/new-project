import React, { FC, useEffect } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { StripeCardElementOptions } from '@stripe/stripe-js'
import { Loader } from 'react-feather'

import { PaymentData } from '~/types'
import { theme } from '~/styles'
import { styles } from './styles'

interface CheckoutFormProps {
  setCardFormFilled: (filled: boolean) => void

  cardElementOptions: StripeCardElementOptions
  loading: boolean
  error?: string

  setPaymentData: ({ stripe, element }: PaymentData) => any
}

export const CheckoutForm: FC<CheckoutFormProps> = ({
  setCardFormFilled,
  cardElementOptions,
  loading,
  error,
  setPaymentData,
}) => {
  // 'stripe' and 'elements' must be in the component wrapped into <Elements />
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    // pass Stripe data to the parent component
    if (stripe && elements && !loading) {
      setPaymentData({ stripe, element: elements.getElement(CardElement)! })
    }
  }, [stripe, elements, loading])

  return (
    <form css={styles.container}>
      <p css={styles.title}>Fill your billing information</p>

      {loading ? (
        <Loader css={styles.spinner} color={theme.blue[1]} size={24} strokeWidth={1.5} />
      ) : (
        <CardElement
          options={cardElementOptions}
          onChange={(e) => setCardFormFilled(e.complete)}
        />
      )}

      {error && <p css={styles.error}>{error}</p>}
    </form>
  )
}
