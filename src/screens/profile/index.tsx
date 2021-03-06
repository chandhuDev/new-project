import React, { FC, useState, useEffect, useMemo } from 'react'
import { RouteComponentProps } from '@reach/router'
import { observer } from 'mobx-react'
import { theme } from '~/styles'
import { styles } from './styles'
import { apiRequest } from '../../api-request'



export const ProfileScreen: FC<RouteComponentProps> = observer(({ navigate }) => {
  const [user,setUser] = useState(null)
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

  

  return (
    <main css={[styles.container]}>
    <section css={styles.content}></section></main>
    );
})

