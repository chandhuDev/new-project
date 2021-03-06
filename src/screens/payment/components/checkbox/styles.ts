import { css } from '@emotion/core'
import { theme } from '~/styles'

export const styles = {
  container: css`
    display: flex;
    align-items: center;

    margin: 30px 0;
  `,

  checkbox: css`
    border: 1px solid ${theme.dark[3]};
    border-radius: 5px;

    height: 18px;
    width: 18px;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: 13px;
  `,

  text: css`
    font-size: 14px;
    line-height: 16px;
    color: ${theme.dark[2]};
  `,
}
