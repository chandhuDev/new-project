import { css } from '@emotion/core'
import { Children } from 'react'

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
    z-index: 3;
    position: relative;
    width:300px;
    margin: -150px auto 0;
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
      font-size:12px;
      line-height:16px;
      color:#86a0d6;
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
    margin-top:15px;
    border-bottom:1.3px solid #f2f2f2;
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
    height:35px;
    width:35px;
  `,
  headerBxContainer:css`
    position:relative;
    height:230px;
    margin:0 -10px;
  `,
  bottonBg:css`
    width:100%;
    position:absolute;
    bottom:0;
  `,
  gradientBg:css`      
    position: relative;
    width: 100%;
    margin-top: 80px;
  `,
  profileNameHeader:css`
      position:relative;
      width:100%;
      display: flex;
      flex-direction: column;
      border-bottom:1.3px solid #f2f2f2;
      padding-bottom:10px;
      margin-top:30px;
  `,
  profileNameContent:css`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  nameValue:css`
  font-size:16px;
  color: #2f3542;
  font-weight: 500;
  margin-top: 5px;
  opacity: 0.95;
  `,
  verifyIcon:css`
    margin-left:10px;
    margin-top:5px;
  `,
  bioValue:css`
  font-size: 12px;
  line-height: 16px;
  color: #86a0d6;
  text-transform: capitalize;
  `

}
