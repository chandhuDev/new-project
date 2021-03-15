import React, { FC, useState, useEffect, useMemo } from 'react'
import { RouteComponentProps } from '@reach/router'
import qs from 'querystring'
import { Truck, CreditCard, Navigation } from 'react-feather'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, StripeCardElementOptions } from '@stripe/stripe-js'
import { observer } from 'mobx-react'

import { PaymentFormData } from '~/types'
import { STRIPE_PUBLISHABLE_KEY, API_URL } from '~/config'
import { theme } from '~/styles'
import { Header, Separator, Form, Checkbox, CheckoutForm,ThankYou } from './components'
import { PaymentStore } from './store'
import { styles } from './styles'

const emptyPaymentForm: PaymentFormData = {
  firstName: '',
  lastName: '',
  country: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zipCode: '',
  phone: '',
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

export const PaymentScreen: FC<RouteComponentProps> = observer(({ navigate }) => {
  const [screen, setScreen] = useState<'shipping' | 'billing' | 'thank-you'>('shipping')
  const [loading, setLoading] = useState(false)

  // parse auth token from query string
  const token = useMemo(
    () => (qs.parse(window.location.search.substring(1))?.token as string) || '',
    [],
  )

  // init payment store using token
  const store = useMemo(() => new PaymentStore(token), [])

  const [shippingFormData, setShippingFormData] = useState(emptyPaymentForm)
  const [billingFormData, setBillingFormData] = useState(emptyPaymentForm)

  const [cardFormFilled, setCardFormFilled] = useState(false)
  const [hideBillingForm, setHideBillingForm] = useState(true)

  // use shipping info for billing when checkbox checked
  useEffect(() => {
    if (hideBillingForm) {
      setBillingFormData(shippingFormData)
    }
  }, [hideBillingForm, screen])

  const purchase = async () => {
    try {
      setLoading(true)

      // try to confirm Stripe payment
      const paymentResult = await store.confirmPayment()

      // if there are any errors, display it and abort execution
      if (paymentResult.error) {
        console.error(paymentResult.error)
        store.paymentError = paymentResult.error.message!

        return
      }

      // if payment is succeeded, save transaction details to the database through the API
      if (paymentResult.paymentIntent?.status === 'succeeded') {
        console.log("payment done",token);

        await fetch(`${API_URL}/payment/transactions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({
            shippingInfo: shippingFormData,
            billingInfo: billingFormData,
            timestamp: Date.now(),
          }),
        }).then((response)=>{
          console.log("response",response);
        })

        vet()
      //   <script>
      //   window.postMessage("Sending data from WebView");
      // </script>
        // navigate to '/payment/finish' after saving transaction info
     //   setScreen('thank-you')
       // navigate?.('/finish')
        //Navigation.
      }
    } catch (error) {
      // TODO: return payment
      store.savingTransactionError = 'Payment failed'
    } finally {
      setLoading(false)
    }
  }
const vet=()=>{
  <script>
    alert('aa');
  window.postMessage("Sending data from WebView");
</script>
 setScreen('thank-you')
}
  return (
    
    <main css={[styles.container, screen === 'billing' && styles.containerBilling]}>
      <section css={styles.content}>
        
        {
          screen==='thank-you'?null: 
          (<Header
          Icon={screen === 'shipping' ? Truck : CreditCard}
          title={screen === 'shipping' ? 'Order details' : 'Billing'}
        />)
        }
         {/* <Header
        //   Icon={screen === 'shipping' ? Truck : CreditCard}
        //   title={screen === 'shipping' ? 'Order details' : 'Billing'}
        // /> */}

        <Separator />
        {/* {
          screen==='thank-you'?(
            <ThankYou/>
          ):null
        } */}
        {screen === 'shipping' ? (
          <Form
            type="shipping"
            onSubmit={async (formData: PaymentFormData) => {
              if (!token) {
                await store.createUserWithPhone(formData.phone)
                await store.fetchClientSecret()
              }

              setShippingFormData(formData)
              setScreen('billing')
            }}
            renderPhoneInput={!token}
          />
        ) : 
        screen==='thank-you'?
        <ThankYou/>
        :
          (
          <>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                setPaymentData={store.setPaymentData}
                setCardFormFilled={setCardFormFilled}
                cardElementOptions={CARD_ELEMENT_OPTIONS}
                loading={!store.clientSecret}
                error={store.paymentError}
              />
            </Elements>

            <Separator />

            <Checkbox checked={hideBillingForm} onCheckChanged={setHideBillingForm} />

            <Form
              type="billing"
              onClickGoBackButton={() => setScreen('shipping')}
              showFields={!hideBillingForm}
              defaultFormData={shippingFormData}
              onSubmit={(formData: PaymentFormData) => {
                setShippingFormData(formData)

                 purchase()
              }}
              submitButtonDisabled={!cardFormFilled || store.loading}
              error={store.savingTransactionError}
              renderPhoneInput={!token}
              loading={loading}
            />
          </>
        )}
      </section>
    </main>
  )
})

const CARD_ELEMENT_OPTIONS: StripeCardElementOptions = {
  hidePostalCode: true,
  style: {
    base: {
      color: theme.dark[2],
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      fontWeight: '500',
      '::placeholder': {
        color: '#ced6e0',
      },
    },

    invalid: {
      color: '#ff4757',
      iconColor: '#ff4757',
    },
  },
}
