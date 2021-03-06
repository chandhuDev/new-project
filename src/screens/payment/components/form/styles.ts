import { css } from '@emotion/core'
import { theme } from '~/styles'

export const styles = {
  container: css`
    margin-top: 30px;
  `,

  inputs: css`
    display: grid;
    gap: 16px;
  `,

  button: {
    shipping: {
      container: css`
        display: flex;
        justify-content: flex-end;

        margin-top: 30px;
      `,

      base: css`
        margin-right: 23px;
      `,
    },

    billing: css`
      display: grid;
      justify-content: flex-end;
      grid-template-columns: auto auto;
      gap: 20px;

      padding-top: 25px;
    `,

    goBack: css`
      opacity: 0.8;
    `,
  },

  error: css`
    color: ${theme.red[1]};
    opacity: 0.8;
    font-size: 12px;
  `,
}
