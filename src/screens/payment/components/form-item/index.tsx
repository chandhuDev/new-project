import React, { FC } from 'react'

import { styles } from './styles'

interface FormItemProps {
  label: string
  name: string
  placeholder: string
  registerRef: any // used by react-hook-form

  trigger: (name: any) => Promise<any>

  isPhoneNumber?: boolean
  error?: boolean
}

export const FormItem: FC<FormItemProps> = ({
  label,
  placeholder,
  registerRef,
  name,
  error,
  trigger,
  isPhoneNumber = false,
}) => (
  <div>
    <p css={styles.label}>{label}</p>

    <input
      name={name}
      ref={registerRef}
      css={styles.input}
      onChange={(e) => {
        e.persist()

        // if this input used for the phone number, allow only numbers
        if (isPhoneNumber) {
          e.target.value = e.target.value.replace(/[^\d]/, '')
        }

        // trigger an error if any
        if (error) {
          trigger(name)
        }
      }}
      placeholder={placeholder}
    />

    {error && <p css={styles.error}>required</p>}
  </div>
)
