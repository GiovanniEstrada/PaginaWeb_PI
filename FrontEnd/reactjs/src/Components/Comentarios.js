import React, { Component } from 'react';

class Publicaciones extends Component {

    //Variable con parametro del URL
    getParameter = (parametroN) => {
        let parametro = new URLSearchParams(window.location.search);
        return parametro.get(parametroN);
    }

    //Link con registro academico del usuario
    regLink = this.getParameter("reg");
    idLink = this.getParameter("id");

    PubLink = async () => {
        window.location.replace("http://localhost:3000/Publicaciones?reg=" + this.regLink + "&id=" + this.idLink);
    }

    NComLink = async () => {
        window.location.replace("http://localhost:3000/ModalComentarios?reg=" + this.regLink + "&id=" + this.idLink);
    }

    componentDidMount() {
        this.Imprimir();
    }

    Imprimir = async () => {
        let rawResponse = await fetch("http://localhost:4000/VerComentario", {
            method: "GET",
            headers: { 'Content-type': 'application/json' }
        }
        )
        let response = await rawResponse.json()

        if (rawResponse.status == 200) {
            this.generarTabla(response);
        } else {
            window.alert("Usuario y/o Contraseña incorrectos");
        }
    }

    generarTabla = (data) => {
        console.log(data)
        console.log()
        let body = ''
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == this.idLink) {
                body += `<tr>
                <td>${data[i].usuario}</td>
                <td>${data[i].comentario}</td>
                </tr>`
            }
        }
        document.getElementById('comTable').innerHTML = body;
    }

    render() {
        return (

            <form>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href>Comentarios</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" onClick={() => this.PubLink()} href>Volver</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <button type="button" class="btn btn-dark" onClick={() => this.NComLink()} href>Añadir Nuevo Comentario</button>
                <h1>    </h1>
                <button type="button" class="btn btn-secondary" onClick={() => this.Imprimir()}>Recargar Comentarios</button>

                <table class="table table-striped">

                    <thead>
                        <tr>
                            <th scope="col">Usuario</th>
                            <th scope="col">Comentario</th>
                        </tr>
                    </thead>
                    <tbody id="comTable" >
                    </tbody>

                </table>

            </form>

        );
    }
}

export default Publicaciones;