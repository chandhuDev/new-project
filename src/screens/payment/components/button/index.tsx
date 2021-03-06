import React, { FC, ButtonHTMLAttributes } from 'react'
import { SerializedStyles } from '@emotion/core'
import { styles } from './styles'

interface ButtonProps {
  text: string
  onClick?: () => any
  style?: SerializedStyles
  disabled: boolean
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

export const Button: FC<ButtonProps> = ({
  text,
  onClick,
  style,
  disabled,
  type = 'button',
}) => (
  <button
    css={[styles.container, style, disabled && styles.disabled]}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
)
