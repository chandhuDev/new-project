import React, { FC } from 'react'
import { useForm } from 'react-hook-form'

import { PaymentFormData } from '~/types'
import { styles } from './styles'
import { FormItem, Button } from '..'

interface FormProps {
  type: 'billing' | 'shipping'
  renderPhoneInput: boolean

  showFields?: boolean
  loading?: boolean
  error?: string
  submitButtonDisabled?: boolean
  defaultFormData?: PaymentFormData

  onSubmit: (data: PaymentFormData) => any
  onClickGoBackButton?: () => any
}

export const Form: FC<FormProps> = ({
  onSubmit,
  type,
  onClickGoBackButton,
  showFields = true,
  submitButtonDisabled = false,
  renderPhoneInput,
  error,
  loading = false,
  defaultFormData,
}) => {
  const { register, handleSubmit, errors, trigger } = useForm<PaymentFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: defaultFormData,
  })

  return (
    <form css={styles.container} onSubmit={handleSubmit(onSubmit)}>
      {showFields && (
        <div css={styles.inputs}>
          <FormItem
            name="firstName"
            registerRef={register({ required: true })}
            label="First name"
            placeholder="Your first name..."
            error={Boolean(errors.firstName)}
            trigger={trigger}
          />
          <FormItem
            name="lastName"
            registerRef={register({ required: true })}
            label="Last name"
            placeholder="Your last name..."
            error={Boolean(errors.lastName)}
            trigger={trigger}
          />
          <FormItem
            name="country"
            registerRef={register({ required: true })}
            label="Country"
            placeholder="Your country..."
            error={Boolean(errors.country)}
            trigger={trigger}
          />
          <FormItem
            name="addressLine1"
            registerRef={register({ required: true })}
            label="Address line 1"
            placeholder="Address line 1..."
            error={Boolean(errors.addressLine1)}
            trigger={trigger}
          />
          <FormItem
            name="addressLine2"
            registerRef={register({ required: false })}
            label="Address line 2 (optional)"
            placeholder="Address line 2..."
            trigger={trigger}
          />
          <FormItem
            name="city"
            registerRef={register({ required: true })}
            label="City"
            placeholder="Your city..."
            error={Boolean(errors.city)}
            trigger={trigger}
          />
          <FormItem
            name="state"
            registerRef={register({ required: true })}
            label="State/Province"
            placeholder="Your state..."
            error={Boolean(errors.state)}
            trigger={trigger}
          />
          <FormItem
            name="zipCode"
            registerRef={register({ required: true })}
            label="Postal/Zip Code"
            placeholder="Your zip code..."
            error={Boolean(errors.zipCode)}
            trigger={trigger}
          />

          {renderPhoneInput && (
            <FormItem
              name="phone"
              registerRef={register({ required: true })}
              label="Phone number"
              placeholder="Your phone..."
              error={Boolean(errors.phone)}
              trigger={trigger}
              isPhoneNumber
            />
          )}
        </div>
      )}

      {error && <p css={styles.error}>{error}</p>}

      {type === 'billing' ? (
        <div css={styles.button.billing}>
          <Button
            text="Go back"
            style={styles.button.goBack}
            disabled={loading}
            onClick={onClickGoBackButton!}
          />

          <Button type="submit" text="Purchase" disabled={submitButtonDisabled} />
        </div>
      ) : (
        <div css={styles.button.shipping.container}>
          <Button
            style={styles.button.shipping.base}
            text="Next"
            disabled={false}
            type="submit"
          />
        </div>
      )}
    </form>
  )
}
