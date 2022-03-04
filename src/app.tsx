import React, { Suspense, FC } from 'react'
import { Router, Redirect } from '@reach/router'
import { Global } from '@emotion/core'

import { PaymentScreen,ProfileScreen,FinishScreen } from './screens'
import { global } from './styles'
import { Spinner } from './components'
import {  Route, Switch } from "react-router-dom";

import './stylesheet.scss'

export const App: FC = () => (
  <>
    <Global styles={global} />

    <Suspense fallback={<Spinner />}>
      
      <Router>
      
        <PaymentScreen path="/" />
       
        {/* <Route exact path="/payment" component={PaymentScreen} /> */}

        <FinishScreen path="/payment/finish" />
        {/* <ProfileScreen path="/profile/:profile/:id" /> */}
        <ProfileScreen path="/:profile/:id" />
        <ProfileScreen path="/:tap/:profile/:id/:tapId" />
        <Redirect from="*" to="/payment" noThrow />
        
      </Router>
      {/* <Route path='/' component={() => { 
     window.location.href = 'https://onetaphello.com/'; 
     return null;
      }}/> */}
    </Suspense>
  </>
)
