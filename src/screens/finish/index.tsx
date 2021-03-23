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

  
  return (
    <main css={[styles.container]}>
      <section css={styles.content}>
          {userStatus==true? <div css={styles.heading}>Thank You for registering on OneTapHello</div>:null}
          <button  css={styles.button} onClick={() => window.ReactNativeWebView.postMessage("PaymentFinished")}>Go to App</button>
          {/* <Link to="https://landing.onetaphello.com/profile/" className="btn btn-primary">go to App</Link>
          <button onClick={() => window.open( 'https://landing.onetaphello.com/profile/')} >google</button>
          <a href="https://www.google.com/"><button>Visit App</button></a>
          <a href="https://landing.onetaphello.com/profile/"><button>Visit App2</button></a> */}
      </section>
    </main>
    );
})

