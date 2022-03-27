import React from 'react';
import Login from '../Components/Login';
import {BrowserRouter, Switch, Route} from 'react-router-dom';



function Rutas() {

  return (
    <BrowserRouter>
    <Switch>
      <Route exact path = '/' component={Login}/>
    </Switch>
    </BrowserRouter>
  );
}

export default Rutas;
