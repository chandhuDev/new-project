import { css } from '@emotion/core'
import { theme } from '~/styles'

export const styles = {
  container: css`
    margin: 30px 0;
  `,

  error: css`
    color: ${theme.red[1]};
    opacity: 0.8;
    font-size: 12px;
  `,

  title: css`
    font-weight: 300;
    font-size: 16px;
    line-height: 19px;

    color: ${theme.dark[2]};
  `,

  spinner: css`
    animation: spin 1.2s infinite linear;

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,
}
