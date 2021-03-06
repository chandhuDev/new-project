import { css } from '@emotion/core'
import { theme } from '~/styles'

export const styles = {
  title: css`
    color: ${theme.dark[1]};

    font-size: 28px;
    font-weight: 500;
    line-height: 33px;

    margin: 10px 0 4px 0;
  `,

  subtitle: css`
    color: ${theme.dark[2]};

    font-weight: 300;
    font-size: 16px;
    line-height: 19px;

    margin: 0;
    margin-bottom: 22px;
  `,
}
