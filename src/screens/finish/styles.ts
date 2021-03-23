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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    display: flex;
    width: 320px;
    margin: 0 auto;
    text-align: center;
  `,
  avatar: css`
    margin-Top: -50px;
    margin-Bottom: 10px;
    width:120px;
    height:120px;
    border-radius:50%;
    border:5px solid #fff;
  `,
  headerContainer: css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top:-50px;
  `,
  countContainer:css`
    display: flex;
    justify-content:space-between;
    width: 100%;
    margin-top:-50px;
  `,
  countContainerBx:css`
      width:20%;
      text-align:center;
  `,
  ccHeader:css`
    font-size:16px;
    color:#2858c6;
    font-weight:700;
  `,
  ccValue:css`
  font-size:14px;
  font-weight:700;
  margin-left:5px;
  color:gray;
  `,
  itemLabel:css`
      font-size:10;
      color:rgb(35, 90, 203);
      text-transform: capitalize;
  `,
  itemValue:css`
    font-size: 14px;
    color:#2f3542;
    font-weight:500;
    margin-top:5px;
    opacity: 0.95;
    width:94%;
  `,
  infoBox:css`
    margin-top:50px;
  `,
  infoItem:css`
      color:red;
  `,
  socialBox:css`
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
  `,
  socialItem:css`
    width:25%;
    display: flex;
    justify-content: center;
    margin-bottom:15px;
  `,
  socialIcon:css`
  height:50px;
  width:50px;
  `,
  heading:css`
  margin-bottom:15px;
  font-size: 16px;
  color: #2f3542;
  font-weight: 500;
  margin-top: 5px;
  opacity: 0.95;
  line-height: 24px;
  `,
  button:css`
  background: none;
    border: none;
    color:#2858c6;
    padding:10px;
  `
}
