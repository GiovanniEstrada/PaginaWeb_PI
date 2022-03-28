import React from 'react';
import Login from '../Components/Login';
import Register from '../Components/Register';
import Recuperar from '../Components/Recuperar';
import Personales from '../Components/DatosPersonales';
import Publicaciones from '../Components/Publicaciones';
import ModalPub from '../Components/Modal/ModalP';
import {BrowserRouter, Switch, Route} from 'react-router-dom';



function Rutas() {

  return (
    <BrowserRouter>
    <Switch>
      <Route exact path = '/' component={Login}/>
      <Route exact path = '/Registrate' component={Register}/>
      <Route exact path = '/Recuperar' component={Recuperar}/>
      <Route exact path = '/DatosPersonales' component={Personales}/>
      <Route exact path = '/Publicaciones' component={Publicaciones}/>
      <Route exact path = '/ModalPublicacion' component={ModalPub}/>
    </Switch>
    </BrowserRouter>
  );
}

export default Rutas;
