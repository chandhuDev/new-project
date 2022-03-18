import React, { FC, useState, useEffect, useMemo,ImageSourcePropType } from 'react'
import { RouteComponentProps } from '@reach/router'
import { observer } from 'mobx-react'
import { theme } from '~/styles'
import { styles } from './styles'
import { apiRequest } from '../../api-request'
import { SerializedStyles } from '@emotion/core'
import vcard from 'vcard-generator';
import {Helmet} from "react-helmet";
import MetaTags from 'react-meta-tags';

import { User } from '~/types'
var vCardsJS = require('vcards-js');

interface RouteComponentProps {
  text: string
  styles?: SerializedStyles
}


export const ProfileScreen: FC<RouteComponentProps> = observer(({ navigate }) => {
  const [user,setUser] = useState<User | undefined>(undefined)
  const [id,setID] = useState('')
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cardStatus, setUserCardStatus] = useState('1')
  
  // use shipping info for billing when checkbox checked
  useEffect(() => {
    var location = window.location.pathname.split("/")
    // setID(location[3])
    // if(location[3] != undefined){
    //   getUser(location[3]);
    //console.log('location>>>',location)
    if(location[1]=='tap'){
      setID(location[3])
    }
    else{
      setID(location[2])
    }
    //setID(location[2])
    if(location[2] != undefined){

      if(location[1]=='tap'){
    //    setID(location[3])
          apiRequest(`/users/check-block-card/${location[4]}`,{
            method:'GET',
          }).then((resp) => {
           // console.log('resp>>',resp.status)
            if(resp.status==200){
              getUser(location[3]);
               getUserTapCount(location[3])
               setUserCardStatus('1')
            }
            if(resp.status==410){
              setUserCardStatus('2')
            }
            if(resp.status==400){
              setUserCardStatus('3')
            }
            if(resp.status==500){
              setUserCardStatus('3')
            }
          // setUser(resp)
          // console.log(resp)
          //console.log('resp>>>',resp)
              // getUser(location[3]);
              // getUserTapCount(location[3])
          })
          .catch((error) =>{ 
            setError(error.message)
          })
          .finally(() => setLoading(false))

        // getUser(location[3]);
        // getUserTapCount(location[3])
      }
      else{
        getUser(location[2]);
      }
     // getUser(location[2]);

    }
  }, [])
  const getUser = (id:string) =>{
    setLoading(true)
    apiRequest(`/users/get-user-shared-profile/${id}`,{
      method:'GET',
    }).then((resp) => {
      setUser(resp)
    //  console.log(resp)
    })
    .catch((error) =>{ 
      setError(error.message)
    })
    .finally(() => setLoading(false))
  }
  const getUserTapCount = (id:string) =>{
    setLoading(true)
    apiRequest(`/users/get-user-tap-count/${id}`,{
      method:'GET',
    }).then((resp) => {
     // setUser(resp)
     // console.log(resp)
     //console.log('resp>>>',resp)
    })
    .catch((error) =>{ 
      setError(error.message)
    })
    .finally(() => setLoading(false))
  }

  const CONTACT_ITEMS: Array<{
    key: keyof Required<User>['contacts']
    link?: boolean
  }> = [
    
    { key: 'name' },
    { key: 'first_name' },
    { key: 'last_name' },
    { key: 'bio' },
    { key: 'phone' },
    { key: 'email' },
    { key: 'website', link: true },
    { key: 'company' },
    { key: 'position' },
    { key: 'location' },
  ]
  const SOCIAL_LINKS: Record<keyof User['identities'], any> = {
    telegram: 'https://t.me',
    twitter: 'https://twitter.com',
    facebook: 'https://facebook.com',
    // facebook: 'fb://page/',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com/in',
    pinterest: 'https://pinterest.com',
    twitch: 'https://twitch.tv',
    youtube: 'https://youtube.com/c',
    spotify: 'https://open.spotify.com/user',
    snapchat: 'https://snapchat.com/add',
    tiktok: 'https://vm.tiktok.com/',
    paypal: 'https://paypal.me',
    whatsapp: 'https://wa.me',
    appleMusic: 'https://music.apple.com',
    googlepay: 'https://pay.google.com?phone=',
    phonepe:'upi://pay?pa=',
    paytm:'paytmmp://',
    freelancer:'https://www.freelancer.in/u/',
    calendly:'https://calendly.com/',
  }

   const IDENTITY_ICONS: Record<
  keyof Required<User>['identities'],
  ImageSourcePropType
> = {
  facebook: require('../../images/identities/facebook.png'),
  instagram: require('../../images/identities/instagram.png'),
  twitter: require('../../images/identities/twitter.png'),
  telegram: require('../../images/identities/telegram.png'),
  appleMusic: require('../../images/identities/apple_Music.png'),
  linkedin: require('../../images/identities/linkedin.png'),
  paypal: require('../../images/identities/paypal.png'),
  pinterest: require('../../images/identities/pinterest.png'),
  snapchat: require('../../images/identities/snapchat.png'),
  spotify: require('../../images/identities/spotify.png'),
  tiktok: require('../../images/identities/tiktok.png'),
  twitch: require('../../images/identities/twitch.png'),
  whatsapp: require('../../images/identities/whatsapp.png'),
  youtube: require('../../images/identities/youtube.png'),
  googlepay: require('../../images/identities/googlepay.png'),
  paytm: require('../../images/identities/paytm.png'),
  phonepe: require('../../images/identities/phonepe.png'),
  freelancer: require('../../images/identities/freelancer.png'),
  calendly:require('../../images/identities/calendly.png'),
}
const  raf_create_vcard=()=>{
  //console.log('user>>>',user)
  // var name = 'Daniel';
  // var format_email = 'daniel@gmail.com';
  // var format_tel = '02228178262';
 // var format_fax = '123456';
  // var format_www = 'wwww.onetaphello.com';
   // var format_address = '123456';

   var name = user?.contacts.first_name + ' '+user?.contacts.last_name;
   var email = user?.contacts.email//'daniel@gmail.com';
  var phone = user?.contacts.phone;//'02228178262';//user?.contacts.phone;//'02228178262';
  var website = user?.contacts.website;//'123456';
  var company = user?.contacts.company;
  var position = user?.contacts.position;
  var location = user?.contacts.location;
   
    //return 'BEGIN%3AVCARD%0D%0AVERSION%3A4.0%0D%0AN%3A%3B'+name+'%3B%3B%3B%0D%0AFN%3A'+name+'%0D%0AEMAIL%3A'+format_email+'%0D%0AORG%3A'+name+'%0D%0ATEL%3A'+format_tel+'%0D%0ATEL%3Btype%3DFAX%3A'+format_fax+'%0D%0AURL%3Btype%3Dpref%3A'+format_www+'%0D%0AADR%3A%3B'+format_address+'%3B%3B%3B%3B%3BSpain%0D%0AEND%3AVCARD';   
     return 'BEGIN%3AVCARD%0D%0AVERSION%3A4.0%0D%0AN%3A%3B'+name+'%3B%3B%3B%0D%0AFN%3A'+name+'%0D%0AEMAIL%3A'+email+'%0D%0AORG%3A'+company+'%0D%0ATEL%3A'+phone+'%0D%0AURL%3Btype%3Dpref%3A'+website+'%0D%0AADR%3A%3B'+location+'%0D%0AX-SOCIALPROFILE;TYPE=facebook:fb://page//swapnil.bhavekar%0D%0AX-SOCIALPROFILE;TYPE=twitter:https://twitter.com/shbhavekar%0D%0AX-SOCIALPROFILE;TYPE=instagram:https://instagram.com/bhavekarswapnil%0D%0AX-SOCIALPROFILE;TYPE=linkedin:https://linkedin.com/in/swapnil.bhavekar%0D%0AX-SOCIALPROFILE;TYPE=whatsapp:https://wa.me/9773950809%0D%0AX-SOCIALPROFILE;TYPE=telegram:https://t.me/SwapnilBhavekar%0D%0AX-SOCIALPROFILE;TYPE=calendly:https://calendly.com//swapnil.bhavekar%0D%0AEND%3AVCARD';   
  
    //return 'BEGIN%3AVCARD%0D%0AVERSION%3A4.0%0D%0AN%3A%3B'+name+'%0D%0AEMAIL%3A'+email+'%0D%0ATEL%3A'+phone+'URL'+website+'ORG'+company+'TITLE;CHARSET=UTF-8'+position+'%0D%0AADR%3A%3B'+location+'%3B%3B%3B%3B%3BSpain%0D%0AEND%3AVCARD';   
    
  }
  const encode_utf8 = (s:string) => {
    return unescape(encodeURIComponent(s));
  }
  const createVcard = () =>{
   
    
    // //set properties
    // vCard.firstName = encode_utf8(user?.contacts.first_name);
    // vCard.lastName = encode_utf8(user?.contacts.last_name);
    // vCard.organization = encode_utf8(user?.contacts.company);
    // vCard.workPhone = encode_utf8(user?.contacts.phone);
    // // vCard.birthday = new Date(1985, 0, 1);
    // vCard.title = encode_utf8(user?.contacts.position);
    // vCard.url =  encode_utf8(user?.contacts.website);
    // vCard.version = encode_utf8('4.0'); //can also support 2.1 and 4.0, certain versions only support certain fields
    
    let arr:any = [];
    Object.entries(user?.identities || {})
    .filter(([_, value]) => Boolean(value))
      .map(([type, value]) => (
        user?.hideIdentities[type] ? null : 
        arr.push({
          type : type,
          uri : SOCIAL_LINKS[type]+'/'+value
        })
      )
    )
 

    const vcardContent = vcard.generate({
      name: {
        familyName: user?.contacts.last_name,
        givenName: user?.contacts.first_name,
        middleName: '',
      },
      works: [{
        organization: user?.contacts.company,
        title: user?.contacts.position,
        role: user?.contacts.position,
      }],
      emails: [{
        type: 'work',
        text: user?.contacts.email,
      }],
      phones: [{
        type : "phone",
        text: user?.contacts.phone,
      }],
      addresses: [
        {
          type: 'home',
          street : user?.contacts.location
        }
      ],
      socialProfiles: [...arr],
      // gender: {
      //   sex: 'male',
      // },
    });
    let str = vcardContent;
    for (let index = 0; index < arr.length; index++) {
      str =str.replace(`X-SOCIALPROFILE;PREF=${index+1}`,`X-SOCIALPROFILE;${arr[index].uri.replace("https://","www.")}`);
    }
    return encodeURIComponent(str) 
  }
  return (
    <div className="mobbg-container">
      <main css={[styles.container]} className="background-container">
        {
          cardStatus=='1'?
          <>
           <div css={[styles.headerBxContainer,{backgroundImage:`url(${user?.contacts?.coverUrl})`}]} >
            
            {/* <img src={require('../../images/gradient.png')} alt="Gradient Image" css={styles.gradientBg} /> */}
          </div>
        <section css={styles.content}>
          <div css={styles.headerContainer}>
          <img
            src={user?.contacts?.avatarUrl != '' ?user?.contacts?.avatarUrl:require('../../images/profile.jpg') }
            css={[styles.avatar]}
          />
            <div css={styles.countContainer} className="tap-view-container">
              <div css={styles.countContainerBx} className="box-area">
                <label css={styles.ccHeader}>{user?.tapsCount}</label>
                <label css={styles.ccValue}>Taps</label>
              </div>
              <div css={styles.countContainerBx} className="box-area">
                <label css={styles.ccHeader}>{user?.shareCount}</label>
                <label css={styles.ccValue}>Views</label>
              </div>
            </div>
          </div>
          <div css={styles.profileNameHeader}>
          <div css={styles.profileNameContent}>
            <div css={styles.profileBx}>
            {
              CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
                (item.key=='first_name')?
                  <label css={styles.nameValue}>{user!.contacts![item.key]}</label>
                  //:null
                  :null
              ))
            }
          
            {
              CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
                (item.key=='last_name')?
                  <label css={styles.nameValue}>{' '}{user!.contacts![item.key]}</label>
                  //:null
                  :null
              ))
            }

            {/* <a   css={styles.saveButton} href={'data:text/vcard;charset=UTF-8,' + createVcard()} download="contact.vcf">Save</a> */}
              {
                  user?.isVerified? <img css={styles.verifyIcon} src={require('../../images/correct-right.png')}/>:null
              }

            </div>
           
          {/* {
              CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
                (item.key=='phone')?
                <div css={styles.infoItem}>
                  <label css={styles.itemLabel}>{item.key}</label><br/>
                  <a href={'tel:'+user!.contacts![item.key]} css={styles.itemLink}>
                    <label css={styles.itemValue}>{user!.contacts![item.key]}</label>
                  <img css={styles.triggerIcon} src={require('../../images/phone.png')}/></a>
                </div> 
                :null
            ))
          } */}
          {/* {
            CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
                (item.key=='email')?
                <div css={styles.infoItem}>
                  <label css={styles.itemLabel}>{item.key}</label><br/>
                  <a href={'mailto:'+user!.contacts![item.key]}  css={styles.itemLink}>
                  <label css={styles.itemValue}>{user!.contacts![item.key]}</label>
                  <img css={styles.triggerIcon} src={require('../../images/email.png')}/></a>
                </div> :null
            ))
          }         */}
          {/* {
            CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
              (item.key=='first_name')?
              <div css={styles.infoItem}>
              <label css={styles.itemLabel}>First Name</label><br/>
              <label css={styles.itemValue}>{user!.contacts![item.key]}</label>
            </div>
                :null
              )
            )
          }
          {
            CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
              (item.key=='last_name')?
              <div css={styles.infoItem}>
              <label css={styles.itemLabel}>Last Name</label><br/>
              <label css={styles.itemValue}>{user!.contacts![item.key]}</label>
            </div>
                :null
              )
            )
          } */}
         
          {/* {
            CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
                (item.key!=='first_name' && item.key!=='last_name' && item.key!=='bio' && item.key!=='phone' && item.key!=='email')?
                <div css={styles.infoItem}>
                  <label css={styles.itemLabel}>{item.key}</label><br/>
                  <label css={styles.itemValue}>{user!.contacts![item.key]}</label>
                </div> :null
            ))
          } */}
          </div>
          {
              CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
                (item.key=='position')?
                  // <label css={styles.nameValue}></label>
                  <p className="designation">{' '}{user!.contacts![item.key]}</p>
                  //:null
                  :null
              ))
            }
          {/* <div className="text-center">
              <p className="designation">Investor</p>
          </div> */}

          <div className="bs-profile-icons">
            {/* <a href="#" className="icon-area">
              <div className="img-box">
                <img src={require('../../images/icons/mail.png')} className="icon icon-mail" />
              </div>
              <p className="text mail">Mail</p>
            </a> */}

            {
              CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
                  (item.key=='email')?
                  // <div className="bs-profile-icons">
                     <a href={'mailto:'+user!.contacts![item.key]} className="icon-area">
                     <div className="img-box">
                      <img src={require('../../images/icons/mail.png')} className="icon icon-mail" />
                      {/* <i className='icon icon-mail'></i> */}
                    </div>
                    <p className="text mail">Mail</p>
                    
                    </a>
                  // </div> 
                  :null
              ))
            }    
            {/* <a href="#" className="icon-area">
              <div className="img-box">
                <img src={require('../../images/icons/message.png')} className="icon icon-message" />
              </div>
              <p className="text">Message</p>
            </a> */}
            {/* <a href="#" className="icon-area">
              <div className="img-box">
                <img src={require('../../images/icons/call.png')} className="icon icon-call" />
              </div>
              <p className="text">Call</p>
            </a> */}

            {
              CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
                  (item.key=='phone')?

                  
                    <a href={'tel:'+user!.contacts![item.key]} className="icon-area">
                         <div className="img-box">
                  
                     <img src={require('../../images/icons/call.png')} className="icon icon-call" />
                     </div>
                     <p className="text">Call</p>
                     </a>
                  :null
              ))
            }
            {/* <a href="#" className="icon-area">
              <div className="img-box">
                <img src={require('../../images/icons/world.png')} className="icon icon-world" />
              </div>
              <p className="text">Website</p>
            </a> */}


            {
              CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
                  (item.key=='website')?

                  
                    <a href='' onClick={() => window.open( 'http://'+user?.contacts?.[item.key])}  className="icon-area">
                         <div className="img-box">
                  
                         <img src={require('../../images/icons/world.png')} className="icon icon-world" />
                     </div>
                     <p className="text">Website</p>
                     </a>
                  :null
              ))
            }
          </div>

          <div className="save-btn-area">
            {
              CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
                (item.key=='phone')?
                <a   css={styles.saveButton} href={'data:text/vcard;charset=UTF-8,' + createVcard()} download="contact.vcf">Save Contact</a>
                  :null
              ))
            }
          </div>

          <div>
            <div>
              <h3 className="sub-heads">About</h3>
              {
                 CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
                  (item.key=='bio')?<p className="sub-title">{user!.contacts![item.key]}</p> :null
                ))
              }
              {/* <p className="sub-title">I am Cheif Business Officer in Chicago.</p> */}
            </div>
            <div>
              <h3 className="sub-heads">Company</h3>
              {/* <p className="sub-title">Chicago, Illionis</p> */}
              {
                 CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
                  (item.key=='company')?<p className="sub-title">{user!.contacts![item.key]}</p> :null
                ))
              }
            </div>
            <div>
              <h3 className="sub-heads">Location</h3>
              {/* <p className="sub-title">Chicago, Illionis</p> */}
              {
                 CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
                  (item.key=='location')?<p className="sub-title">{user!.contacts![item.key]}</p> :null
                ))
              }
            </div>
          </div>

          {/* {
            CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
              (item.key=='bio')?<label css={styles.bioValue}>{user!.contacts![item.key]}</label>:null
            ))
          } */}
          </div>

          <div css={styles.scrollingBox}>
            {/* <div css={styles.infoBox}>
              {
                CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
                    (item.key=='phone')?
                    <div css={styles.infoItem}>
                      <label css={styles.itemLabel}>{item.key}</label><br/>
                      <a href={'tel:'+user!.contacts![item.key]} css={styles.itemLink}>
                        <label css={styles.itemValue}>{user!.contacts![item.key]}</label>
                      <img css={styles.triggerIcon} src={require('../../images/phone.png')}/></a>
                    </div> 
                    :null
                ))
              }
              {
                CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
                    (item.key=='email')?
                    <div css={styles.infoItem}>
                      <label css={styles.itemLabel}>{item.key}</label><br/>
                      <a href={'mailto:'+user!.contacts![item.key]}  css={styles.itemLink}>
                      <label css={styles.itemValue}>{user!.contacts![item.key]}</label>
                      <img css={styles.triggerIcon} src={require('../../images/email.png')}/></a>
                    </div> :null
                ))
              }        
              {
                CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
                    (item.key!=='name' && item.key!=='bio' && item.key!=='phone' && item.key!=='email')?
                    <div css={styles.infoItem}>
                      {
                        item.key=='first_name'?
                        <>
                          <label css={styles.itemLabel}>First Name</label><br/>
                        </>  
                        :
                        item.key=='last_name'?
                        <>
                          <label css={styles.itemLabel}>Last Name</label><br/>
                        </>  
                        :

                        <>
                        <label css={styles.itemLabel}>{item.key}</label><br/>
                        </>  
                      }
                      
                      <label css={styles.itemValue}>{user!.contacts![item.key]}</label>
                    </div> :null
                ))
              }
            </div> */}
            <div css={styles.socialBox}>
              {
                Object.entries(user?.identities || {})
                  .filter(([_, value]) => Boolean(value))
                    .map(([type, value]) => (
                      user?.hideIdentities[type] ? null : 
                      <div css={styles.socialItem}>
                        <a href={SOCIAL_LINKS[type]+'/'+value} target="_blank">
                        <img
                          src={IDENTITY_ICONS[type]}
                          css={styles.socialIcon}
                        />
                        </a>
                      </div>
                    )
                  )
                }
            </div>
          </div>
        </section>
          </>
          :
            cardStatus=='2'?
            <div>Card is Blocked
            </div>
            :
              cardStatus=='3'?
              <div>TagId is Invalid or does not exist
              </div>
              :
              null
        }
         
      </main>
    </div>
    );
})

