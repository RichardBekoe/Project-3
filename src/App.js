import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

import { Register } from './components/register'
import { Splashscreen } from './components/splashscreen.js'
import { Login } from './components/login'

const App = () => {
  return <HashRouter>
    <Switch>
      <Route exact path='/' component={Splashscreen}/>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </HashRouter>
}

export default App