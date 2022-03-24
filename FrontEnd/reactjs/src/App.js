import React, {fragment, useState} from 'react';
import NavBar from './Components/BarraP';
import Login from './Components/Login'



function App() {


  return (
    <fragment>
        <NavBar titulo='Inicio de Sesion'/>
        <div className='container center-h center-v'>
          <Login/>
        </div>
    </fragment>
  );
}

export default App;
