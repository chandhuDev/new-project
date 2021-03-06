import { css } from '@emotion/core'
import { theme } from '~/styles'

export const styles = {
  label: css`
    color: rgba(35, 90, 203, 0.8);

    font-size: 10px;
    line-height: 14px;

    margin: 0;
    margin-bottom: 5px;
  `,

  input: css`
    color: ${theme.dark[1]};

    font-size: 14px;
    line-height: 16px;

    border: none;
    outline: none;
    padding: 0;
    margin: 0;

    ::placeholder {
      color: #e0e4ea;
    }
  `,

  error: css`
    color: ${theme.red[1]};
    opacity: 0.8;

    margin: 0;
    margin-top: 3px;

    font-size: 11px;
  `,
}
