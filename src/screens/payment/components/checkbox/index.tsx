import React, { FC } from 'react'
import { Check } from 'react-feather'

import { theme } from '~/styles'
import { styles } from './styles'

interface CheckboxProps {
  checked: boolean
  onCheckChanged: (checked: boolean) => any
}

export const Checkbox: FC<CheckboxProps> = ({ checked, onCheckChanged }) => {
  return (
    <div css={styles.container} onClick={() => onCheckChanged(!checked)}>
      <div css={styles.checkbox}>
        {checked && <Check size={14} color={theme.blue[1]} strokeWidth={3} />}
      </div>

      <span css={styles.text}>Use the same info as for shipping</span>
    </div>
  )
}
