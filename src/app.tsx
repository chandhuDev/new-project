import React, { Suspense, FC } from 'react'
import { Router, Redirect } from '@reach/router'
import { Global } from '@emotion/core'

import { PaymentScreen,ProfileScreen,FinishScreen } from './screens'
import { global } from './styles'
import { Spinner } from './components'

import './stylesheet.scss'

export const App: FC = () => (
  <>
    <Global styles={global} />

    <Suspense fallback={<Spinner />}>
      
      <Router>
        <PaymentScreen path="/payment" />
        <FinishScreen path="/payment/finish" />
        {/* <ProfileScreen path="/profile/:profile/:id" /> */}
        <ProfileScreen path="/:profile/:id" />
        <ProfileScreen path="/:tap/:profile/:id/:tapId" />
        <Redirect from="*" to="/payment" noThrow />
        
      </Router>
      {/* <Router path='/privacy-policy' component={() => { 
     window.location.href = 'https://example.com/1234'; 
     return null;
      }}/> */}
    </Suspense>
  </>
)
