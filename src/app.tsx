import React, { Suspense, FC } from 'react'
import { Router, Redirect } from '@reach/router'
import { Global } from '@emotion/core'

import { PaymentScreen } from './screens'
import { global } from './styles'
import { Spinner } from './components'

export const App: FC = () => (
  <>
    <Global styles={global} />

    <Suspense fallback={<Spinner />}>
      <Router>
        <PaymentScreen path="/payment" />
        <Redirect from="*" to="/payment" noThrow />
      </Router>
    </Suspense>
  </>
)
