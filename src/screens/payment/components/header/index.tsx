import React, { FC } from 'react'
import { Icon as TIcon } from 'react-feather'

import { theme } from '~/styles'
import { styles } from './styles'

interface HeaderProps {
  Icon: TIcon
  title: string
}

export const Header: FC<HeaderProps> = ({ Icon, title }) => {
  return (
    <section>
      <Icon color={theme.blue[1]} size={28} />

      <p css={styles.title}>{title}</p>

      <p css={styles.subtitle}>
        purchase your personalized identity card to unlock the full application experience
      </p>
    </section>
  )
}
