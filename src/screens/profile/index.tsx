import React, { FC, useState, useEffect, useMemo } from 'react'
import { RouteComponentProps } from '@reach/router'
import { observer } from 'mobx-react'
import { theme } from '~/styles'
import { styles } from './styles'
import { apiRequest } from '../../api-request'

import { User } from '~/types'


export const ProfileScreen: FC<RouteComponentProps> = observer(({ navigate }) => {
  const [user,setUser] = useState<User | undefined>(undefined)
  const [id,setID] = useState('')
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState('')

  // use shipping info for billing when checkbox checked
  useEffect(() => {
    var location = window.location.pathname.split("/")
    setID(location[3])
    if(location[3] != undefined){
      getUser(location[3]);

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
  return (
    <main css={[styles.container]}>
      <section css={styles.content}>
        <div>
          <img
          src={user?.contacts?.avatarUrl}
          />
        </div>
      <div>
        <label>Taps</label>
        <label>{user?.tapsCount}</label>
      </div>
      <div>
        <label>Views</label>
        <label>{user?.shareCount}</label>
      </div>
      {CONTACT_ITEMS.filter((item) => Boolean(user?.contacts?.[item.key])).map((item) => (
        <div>
          <label>{item.key}</label><br/>
          <label>{ user!.contacts![item.key]}</label><br/><br/>
        </div>
        
    ))}


      {
      Object.entries(user?.identities || {})
        .filter(([_, value]) => Boolean(value))
          .map(([type, value]) => (
            user?.hideIdentities[type] ? null : 
            // console.log(SOCIAL_LINKS[type]+'/'+value,type)
            <div>
              <label>{type}</label><br />
              <a href={SOCIAL_LINKS[type]+'/'+value}>{type}</a><br /><br />
            </div>
          )
        )
      }
      </section>
    </main>
    );
})

