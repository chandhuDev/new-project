import { css } from '@emotion/core'
import { Children } from 'react'

export const styles = {
  body:css`
    overflow: hidden;
  `,
  container: css`
    padding: 125px 0 0;
    box-sizing: border-box;
    background: rgb(24, 44, 97);
    position:relative;
    // background: linear-gradient(
    //   180deg,
    //   rgba(24, 44, 97, 1) 0%,
    //   rgba(27, 156, 252, 1) 100%
    // );
    background: #E5E5E5;
    // overflow: hidden;
    width: 100%;
    // height: 92%;
    margin: auto;
    left: 0;
    // border-radius: 25px
  `,

  containerBilling: css`
    height: 10vh;
  `,

  content: css`
    height: 100%;
    background-color: #ffffff;
    padding-top: 30px;
    padding-bottom: 30px;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
    z-index: 3;
    position: relative;
    width: 95%;
    margin: 0 auto;
  `,
  avatar: css`
    margin-Top: -50px;
    margin-Bottom: 10px;
    width:120px;
    height:120px;
    border-radius:50%;
    // border:5px solid #fff;
    border:3px solid #fff;
    object-fit: cover;
  `,
  headerContainer: css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top:-50px;
    margin-right: 15px;
    margin-left: 15px;

  `,
  countContainer:css`
    display: flex;
    justify-content:space-between;
    width: 100%;
    margin-top:-50px;
    margin-top:-35px;
  `,
  countContainerBx:css`
      // width:28%;
      text-align:center;
  `,
  ccHeader:css`
    font-size:16px;
    color:#2858c6;
    font-weight:700;
  `,
  ccValue:css`
  font-size:16px;
  font-weight:700;
  margin-left:5px;
  color:gray;
  `,
  itemLabel:css`
      font-size:10px;
      line-height:14px;
      color:rgba(35, 90, 203, 0.8);
      text-transform: capitalize;
  `,
  profileBx:css`
  display:flex;
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
    margin-right: 15px;
    margin-left: 15px;

  `,
  infoItem:css`
    // margin-bottom:10px;
    margin-bottom:10px;
  `,
  socialBox:css`
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    // margin-right: 15px;
    // margin-left: 15px;
  `,
  socialItem:css`
    // width:25%;
    display: flex;
    justify-content: center;
    // margin-bottom:15px;
    margin-bottom:20px;
  `,
  socialIcon:css`
    height:45px;
    width:45px;
    // height:50px;
    // width:50px;
  `,
  headerBxContainer:css`
    position:absolute;
    top:0;
    left:0;
    height: 195px;
    width:100%;
    z-index:0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    // border-radius:10px 10px 0 0; 
  `,
  bottonBg:css`
    width:100%;
    height:300px;
    position:absolute;
    top:0;
    left:0;
    z-index:1;
  `,
  gradientBg:css`      
    position: absolute;
    width: 100%;
    height: 200px;
    z-index: 2;
    top:110px;
    left: 0;
  `,
  profileNameHeader:css`
    position:relative;
    // width:100%;
    display: flex;
    flex-direction: column;
    border-bottom:1.3px solid #f2f2f2;
    padding-bottom:10px;
    margin-top:30px;
    margin-right: 15px;
    margin-left: 15px;
    

  `,
  profileNameContent:css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `,
  profileNameContainer:css`
  display: flex;
  `,
  nameValue:css`
  // font-size:16px;
  font-size: 24px;
  color: #000;
  font-weight: 600;
  // margin-top: 5px;
  opacity: 0.95;
  margin-right: 5px;
  `,
  verifyIcon:css`
    margin-left:2px;
    margin-top:2px;
    height:18px;
    width:18px;

  `,
  bioValue:css`
  font-size: 10px;
  line-height: 14px;
  color:rgba(35, 90, 203, 0.8);
  text-transform: capitalize;
  max-width: "85%";
  display:block;
  margin-top:10px;
  `,
  itemLink:css`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    text-decoration: none;
  `,
  saveButton:css`
    text-decoration: none;
    background: rgba(34, 90, 203, 1);
    padding: 8px 28px;
    border-radius: 50px;
    text-decoration: none;
    color: #FFF;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
  `,
  triggerIcon:css`
    height: 20px;
  `,
  scrollingBox:css`
    overflow: auto;
    // height: calc(100vh - 320px);
    // height: calc(100vh - 335px);
  `
}
