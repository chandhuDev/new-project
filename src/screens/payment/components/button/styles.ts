import { css } from '@emotion/core'
import { theme } from '~/styles'

export const styles = {
  container: css`
    color: ${theme.blue[2]};

    border: none;
    background-color: transparent;
    padding: 0;
    outline: none;
    font-size: 16px;
  `,

  disabled: css`
    color: ${theme.blue[2]};
    opacity: 70%;
  `,
}
