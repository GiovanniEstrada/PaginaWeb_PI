import React, { Component } from 'react';

//Ruta Acceder a la peticion get de Nuestra base de datos
const auth = "http://localhost:4000/auth";

class Personales extends Component {

    state = {
        form: {
            dpi: '',
            pass: ''
        }
    }
    render() {
        return (

            <form>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="http://localhost:3000/DatosPersonales">Datos Personales</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="http://localhost:3000/Publicaciones">Publicaciones</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" href="http://localhost:3000/DatosPersonales">Datos Personales</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>


            </form>

        );
    }
}

export default Personales;