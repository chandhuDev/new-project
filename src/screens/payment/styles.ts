import { css } from '@emotion/core'

export const styles = {
  container: css`
    min-height: 100vh;

    padding: 125px 10px 0 10px;
    box-sizing: border-box;

    background: rgb(24, 44, 97);
    background: linear-gradient(
      180deg,
      rgba(24, 44, 97, 1) 0%,
      rgba(27, 156, 252, 1) 100%
    );
  `,

  containerBilling: css`
    height: 10vh;
  `,

  content: css`
    height: 100%;

    background-color: #ffffff;
    padding: 30px;

    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
    width:300px;
    margin:0 auto;
  `,
}
