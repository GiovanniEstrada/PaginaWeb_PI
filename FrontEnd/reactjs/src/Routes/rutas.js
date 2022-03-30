import React from 'react';
import Login from '../Components/Login';
import cursos from '../Components/Cursos';
import Register from '../Components/Register';
import Recuperar from '../Components/Recuperar';
import Personales from '../Components/DatosPersonales';
import Perfil from '../Components/Perfiles';
import Publicaciones from '../Components/Publicaciones';
import Comentarios from '../Components/Comentarios';
import ModalPub from '../Components/Modal/ModalP';
import ModalCom from '../Components/Modal/ModalComentarios';
import {BrowserRouter, Switch, Route} from 'react-router-dom';



function Rutas() {

  return (
    <BrowserRouter>
    <Switch>
      <Route exact path = '/' component={Login}/>
      <Route exact path = '/Registrate' component={Register}/>
      <Route exact path = '/Recuperar' component={Recuperar}/>
      <Route exact path = '/DatosPersonales' component={Personales}/>
      <Route exact path = '/Perfil' component={Perfil}/>
      <Route exact path = '/Publicaciones' component={Publicaciones}/>
      <Route exact path = '/Comentarios' component={Comentarios}/>
      <Route exact path = '/ModalPublicacion' component={ModalPub}/>
      <Route exact path = '/ModalComentarios' component={ModalCom}/>
      <Route exact path = '/AñadirCurso' component={cursos}/>
    </Switch>
    </BrowserRouter>
  );
}

export default Rutas;
