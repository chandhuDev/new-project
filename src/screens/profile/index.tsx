import React, { FC, useState, useEffect, useMemo,ImageSourcePropType } from 'react'
import { RouteComponentProps } from '@reach/router'
import { observer } from 'mobx-react'
import { theme } from '~/styles'
import { styles } from './styles'
import { apiRequest } from '../../api-request'
import { SerializedStyles } from '@emotion/core'

import { User } from '~/types'

interface RouteComponentProps {
  text: string
  styles?: SerializedStyles
}


export const ProfileScreen: FC<RouteComponentProps> = observer(({ navigate }) => {
  const [user,setUser] = useState<User | undefined>(undefined)
  const [id,setID] = useState('')
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // use shipping info for billing when checkbox checked
  useEffect(() => {
    var location = window.location.pathname.split("/")
    // setID(location[3])
    // if(location[3] != undefined){
    //   getUser(location[3]);
    setID(location[2])
    if(location[2] != undefined){
      getUser(location[2]);

    }
  }, [])
  const getUser = (id:string) =>{
    setLoading(true)
    apiRequest(`/users/get-user-shared-profile/${id}`,{
      method:'GET',
    }).then((resp) => {
      setUser(resp)
      console.log(resp)
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
    { key: 'bio' },
    { key: 'phone' },
    { key: 'email' },
    { key: 'website', link: true },
    { key: 'company' },
    { key: 'position' },
    { key: 'location' },
    { key: 'location' },
    { key: 'first_name' },
    { key: 'last_name' },
    
  ]
  const SOCIAL_LINKS: Record<keyof User['identities'], any> = {
    telegram: 'https://t.me',
    twitter: 'https://twitter.com',
    // facebook: 'https://facebook.com',
    facebook: 'fb://page/',
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
     return 'BEGIN%3AVCARD%0D%0AVERSION%3A4.0%0D%0AN%3A%3B'+name+'%3B%3B%3B%0D%0AFN%3A'+name+'%0D%0AEMAIL%3A'+email+'%0D%0AORG%3A'+company+'%0D%0ATEL%3A'+phone+'%0D%0AURL%3Btype%3Dpref%3A'+website+'%0D%0AADR%3A%3B'+location+'%0D%0AEND%3AVCARD';   
  
    //return 'BEGIN%3AVCARD%0D%0AVERSION%3A4.0%0D%0AN%3A%3B'+name+'%0D%0AEMAIL%3A'+email+'%0D%0ATEL%3A'+phone+'URL'+website+'ORG'+company+'TITLE;CHARSET=UTF-8'+position+'%0D%0AADR%3A%3B'+location+'%3B%3B%3B%3B%3BSpain%0D%0AEND%3AVCARD';   
    
  }
  return (
    <main css={[styles.container]} className="background-container">
        <div css={[styles.headerBxContainer,{backgroundImage:`url(${user?.contacts?.coverUrl})`}]} >
          
          <img src={require('../../images/gradient.png')} alt="Gradient Image" css={styles.gradientBg} />
        </div>
      <section css={styles.content}>
        <div css={styles.headerContainer}>
          <img
            src={user?.contacts?.avatarUrl}
            css={[styles.avatar]}
          />
          <div css={styles.countContainer}>
            <div css={styles.countContainerBx}>
              <label css={styles.ccHeader}>{user?.tapsCount}</label>
              <label css={styles.ccValue}>Taps</label>
            </div>
            <div css={styles.countContainerBx}>
              <label css={styles.ccHeader}>{user?.shareCount}</label>
              <label css={styles.ccValue}>Views</label>
            </div>
          </div>
        </div>
        <div css={styles.profileNameHeader}>
        <div css={styles.profileNameContent}>
          <div>
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
          {
              user?.isVerified? <img css={styles.verifyIcon} src={require('../../images/correct-right.png')}/>:null
          }
          </div>
          {/* {
            CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
              (item.key=='phone')?
              <a href={'tel:'+user!.contacts![item.key]} css={styles.saveButton}>
              Save</a>
                //:null
                :null
            ))
          } */}
          {/* {
             CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
               (item.key=='phone')?
               <a href={'tel:'+user!.contacts![item.key]} css={styles.saveButton}>
+              
               Save</a>
+              
+               
+                :null
+            ))
+          } */}
            {/* {
            CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
              (item.key=='phone')?
              // <a href="data:text/vcard;charset=UTF-8,"{raf_create_vcard()} download="contact.vcf">Download</a>              <a  css={styles.saveButton} href={'data:text/vcard;charset=UTF-8,' + raf_create_vcard()} download="contact.vcf">Save</a>
             
                 //:null
                 :null
             ))
           } */}
        {
            CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
              (item.key=='phone')?
              // <a href="data:text/vcard;charset=UTF-8,"{raf_create_vcard()} download="contact.vcf">Download</a>
              <a   css={styles.saveButton} href={'data:text/vcard;charset=UTF-8,' + raf_create_vcard()} download="contact.vcf">Save</a>
              
                 //:null
                 :null
             ))
           }
          {/* <div>
            <a href></a>
          </div> */}
          {/* {
              user?.isVerified? <img css={styles.verifyIcon} src={require('../../images/correct-right.png')}/>:null
          } */}
          </div>

          {
           // console.log('name>>>',user)
          }
          <div>
        {
          CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
            (item.key=='bio')?<label css={styles.bioValue}>{user!.contacts![item.key]}</label>:null
          ))
        }
        </div>
        </div>
        <div css={styles.scrollingBox}>
          <div css={styles.infoBox}>
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
                  <label css={styles.itemLabel}>{item.key}</label><br/>
                  <label css={styles.itemValue}>{user!.contacts![item.key]}</label>
                </div> :null
            ))
          }
          </div>
          <div css={styles.socialBox}>
        {
          Object.entries(user?.identities || {})
            .filter(([_, value]) => Boolean(value))
              .map(([type, value]) => (
                user?.hideIdentities[type] ? null : 
                // console.log(SOCIAL_LINKS[type]+'/'+value,type)
                <div css={styles.socialItem}>
                  {/* <label>{type}</label><br /> */}
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
    </main>
    );
})

