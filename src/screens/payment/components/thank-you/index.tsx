import React, { FC } from 'react'
import { useForm } from 'react-hook-form'

import { PaymentFormData } from '~/types'
import { styles } from './styles'
import { FormItem, Button } from '..'

interface FormProps {
//   type: 'billing' | 'shipping'
//   renderPhoneInput: boolean

//   showFields?: boolean
//   loading?: boolean
//   error?: string
//   submitButtonDisabled?: boolean
//   defaultFormData?: PaymentFormData

//   onSubmit: (data: PaymentFormData) => any
//   onClickGoBackButton?: () => any
}

export const ThankYou: FC<FormProps> = ({
//   onSubmit,
//   type,
//   onClickGoBackButton,
//   showFields = true,
//   submitButtonDisabled = false,
//   renderPhoneInput,
//   error,
//   loading = false,
//   defaultFormData,
}) => {
//   const { register, handleSubmit, errors, trigger } = useForm<PaymentFormData>({
//     mode: 'onBlur',
//     reValidateMode: 'onBlur',
//     defaultValues: defaultFormData,
//   })

  return (
   <div>
       Thank You
   </div>
  )
}
