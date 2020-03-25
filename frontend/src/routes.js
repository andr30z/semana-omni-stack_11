import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Logon from "./pages/Logon/index";
import Register from "./pages/Register/Register.component";
import Profile from "./pages/Profile/Profile.component";
import NewIncident from "./pages/NewIncident/NewIncident.component";

export default function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon}/>
        <Route path="/register" component={Register}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/incident/new" component={NewIncident}/>
      </Switch>
    </BrowserRouter>
  )
}
