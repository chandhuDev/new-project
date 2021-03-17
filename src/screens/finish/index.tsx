import React, { FC, useState, useEffect, useMemo,ImageSourcePropType } from 'react'
import { RouteComponentProps } from '@reach/router'
import { observer } from 'mobx-react'
import { theme } from '~/styles'
import { styles } from './styles'
import { apiRequest } from '../../api-request'
import { SerializedStyles } from '@emotion/core'
import { User } from '~/types'


import { Router, Redirect,Link } from '@reach/router'
interface RouteComponentProps {
  text: string
  styles?: SerializedStyles
}


export const FinishScreen: FC<RouteComponentProps> = observer(({ navigate }) => {
  const [user,setUser] = useState<User | undefined>(undefined)
  const [id,setID] = useState('')
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState('')
  const [userStatus,setUserStatus]=useState(false)
  // use shipping info for billing when checkbox checked
  useEffect(() => {
    // var location = window.location.pathname.split("/")
    // setID(location[3])
    // if(location[3] != undefined){
    //   getUser(location[3]);

    // }
    userData()
   
   // console.log('hwlloq');
  }, [])
  const userData=()=>{
      setUserStatus(true);
  }
  const getUser = (id:string) =>{
    // setLoading(true)
    // apiRequest(`/users/get-user-shared-profile/${id}`,{
    //   method:'GET',
    // }).then((resp) => {
    //   setUser(resp)
    //   console.log(resp)
    // })
    // .catch((error) =>{ 
    //   setError(error.message)
    // })
    // .finally(() => setLoading(false))
  }

//   const CONTACT_ITEMS: Array<{
//     key: keyof Required<User>['contacts']
//     link?: boolean
//   }> = [
//     { key: 'phone' },
//     { key: 'email' },
//     { key: 'website', link: true },
//     { key: 'company' },
//     { key: 'position' },
//     { key: 'location' },
//   ]
//   const SOCIAL_LINKS: Record<keyof User['identities'], any> = {
//     telegram: 'https://t.me',
//     twitter: 'https://twitter.com',
//     // facebook: 'https://facebook.com',
//     facebook: 'fb://page/',
//     instagram: 'https://instagram.com',
//     linkedin: 'https://linkedin.com/in',
//     pinterest: 'https://pinterest.com',
//     twitch: 'https://twitch.tv',
//     youtube: 'https://youtube.com/c',
//     spotify: 'https://open.spotify.com/user',
//     snapchat: 'https://snapchat.com/add',
//     tiktok: 'https://vm.tiktok.com/',
//     paypal: 'https://paypal.me',
//     whatsapp: 'https://wa.me',
//     appleMusic: 'https://music.apple.com',
//     googlepay: 'https://pay.google.com?phone=',
//     phonepe:'upi://pay?pa=',
//     paytm:'paytmmp://',
//     freelancer:'https://www.freelancer.in/u/',
//     calendly:'https://calendly.com/',
//   }

//    const IDENTITY_ICONS: Record<
//   keyof Required<User>['identities'],
//   ImageSourcePropType
// > = {
//   facebook: require('../../images/identities/facebook.png'),
//   instagram: require('../../images/identities/instagram.png'),
//   twitter: require('../../images/identities/twitter.png'),
//   telegram: require('../../images/identities/telegram.png'),
//   appleMusic: require('../../images/identities/apple_Music.png'),
//   linkedin: require('../../images/identities/linkedin.png'),
//   paypal: require('../../images/identities/paypal.png'),
//   pinterest: require('../../images/identities/pinterest.png'),
//   snapchat: require('../../images/identities/snapchat.png'),
//   spotify: require('../../images/identities/spotify.png'),
//   tiktok: require('../../images/identities/tiktok.png'),
//   twitch: require('../../images/identities/twitch.png'),
//   whatsapp: require('../../images/identities/whatsapp.png'),
//   youtube: require('../../images/identities/youtube.png'),
//   googlepay: require('../../images/identities/googlepay.png'),
//   paytm: require('../../images/identities/paytm.png'),
//   phonepe: require('../../images/identities/phonepe.png'),
//   freelancer: require('../../images/identities/freelancer.png'),
//   calendly:require('../../images/identities/calendly.png'),
// }

const paymentFinished = () => {
  window.ReactNativeWebView.postMessage('PaymentFinished');
}
  return (
    <main css={[styles.container]}>
      <section css={styles.content}>
        <div css={styles.headerContainer}>
          {/* <img
            src={user?.contacts?.avatarUrl}
            css={[styles.avatar]}
          /> */}
          <div css={styles.countContainer}>
            {/* <div css={styles.countContainerBx}>
              <label css={styles.ccHeader}>{user?.tapsCount}</label>
              <label css={styles.ccValue}>Taps</label>
            </div> */}
            <div css={styles.countContainerBx}>
              {/* <label css={styles.ccHeader}>{user?.shareCount}</label> */}
              <label css={styles.ccValue}>
                  {userStatus==true? <div>Thank You</div>:null}
              </label>
            </div>
          </div>
          <Link to="https://landing.onetaphello.com/profile/" className="btn btn-primary">go to App</Link>
          <button onClick={() => window.open( 'https://landing.onetaphello.com/profile/')} >google</button>
          <a href="https://www.google.com/"><button>Visit App</button></a>
          <a href="https://landing.onetaphello.com/profile/"><button>Visit App2</button></a>

          <button onClick={() => paymentFinished()}>Alert me</button>

        </div>
       
        <div css={styles.socialBox}>
        {
        //   Object.entries(user?.identities || {})
        //     .filter(([_, value]) => Boolean(value))
        //       .map(([type, value]) => (
        //         user?.hideIdentities[type] ? null : 
        //         // console.log(SOCIAL_LINKS[type]+'/'+value,type)
        //         <div css={styles.socialItem}>
        //           {/* <label>{type}</label><br /> */}
        //           <a href={SOCIAL_LINKS[type]+'/'+value} target="_blank">
        //           <img
        //             src={IDENTITY_ICONS[type]}
        //             css={styles.socialIcon}
        //           />
        //           </a>
        //         </div>
        //       )
        //     )
          }
        </div>
      </section>
    </main>
    );
})

