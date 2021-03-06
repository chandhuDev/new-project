import { observable, action } from 'mobx'
import { PaymentData } from '~/types'
import { API_URL } from '~/config'

export class PaymentStore {
  @observable
  private paymentData?: PaymentData

  @observable
  public clientSecret = ''

  @observable
  public paymentError = ''

  @observable
  public savingTransactionError = ''

  @observable
  public loading = false

  constructor(private token: string) {
    // if token provided, fetch client secret
    if (token) {
      this.fetchClientSecret()
    }
  }

  @action
  public createUserWithPhone = async (phoneNumber: string) => {
    // create user and get their token
    const { token } = await this.createDatabaseUserWithPhone(`+${phoneNumber}`)
    this.token = token
  }

  @action
  public setPaymentData = (paymentData: PaymentData) => {
    this.paymentData = paymentData
  }

  private createDatabaseUserWithPhone = (
    phoneNumber: string,
  ): Promise<{ token: string }> =>
    fetch(`${API_URL}/auth/create-with-phone`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber }),
    }).then((r) => r.json())

  /** Request Stripe client secret from API */
  @action
  public fetchClientSecret = () => {
    return fetch(`${API_URL}/payment/get-client-secret`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.clientSecret = res.secret
      })
      .catch((error) => {
        this.paymentError = error.message
      })
  }

  /** Confirm payment using client secret received from API */
  @action
  public confirmPayment = () => {
    this.loading = true

    return this.paymentData!.stripe.confirmCardPayment(this.clientSecret, {
      payment_method: { card: this.paymentData!.element },
    }).finally(() => {
      this.loading = false
    })
  }
}
