import React, { Component, Fragment, useEffect, useState } from 'react';

//Ruta Acceder a la peticion get de Nuestra base de datos
const auth = "http://localhost:4000/auth";



class Publicaciones extends Component {

    state = {
        form: {
            dpi: '',
            pass: ''
        }
    }

    Imprimir = async () => {
        let rawResponse = await fetch("http://localhost:4000/VerPublicacion", {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(
                {
                    "dpi": this.state.form.dpi,
                    "pass": this.state.form.pass
                }
            )
        }
        )
        let response = await rawResponse.json()

        if (rawResponse.status == 200) {
            console.log(response);
            window.alert(`Has iniciado sesion como: ${response.nombre}`);
        } else {
            window.alert("Usuario y/o Contraseña incorrectos");
        }


    }

    render() {
        return (

            <form>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="http://localhost:3000/Publicaciones">Area de Publicaciones</a>
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
                <a type="button" class="btn btn-success" href="http://localhost:3000/ModalPublicacion">Añadir Nueva Publicación</a>

                <table class="table table-striped">

                    <thead>
                        <tr>
                            <th scope="col">Usuario</th>
                            <th scope="col">Curso</th>
                            <th scope="col">Catedratico</th>
                            <th scope="col">Publicacion</th>
                            <th scope="col">Fecha de Creación</th>
                            <th scope="col">
                                <a type="button" class="btn btn-info" href="http://localhost:3000/ModalComentario">Comentario</a>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>

                </table>

            </form>

        );
    }
}

export default Publicaciones;