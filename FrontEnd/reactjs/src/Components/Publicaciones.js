import React, { Component } from 'react';

class Publicaciones extends Component {

    state = {
        form: {
            tipo: '',
            filtro: ''
        }
    }



    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        console.log(this.state.form);
    }

    Imprimir = async () => {
        let rawResponse = await fetch("http://localhost:4000/VerPublicacion", {
            method: "GET",
            headers: { 'Content-type': 'application/json' }
        }
        )
        let response = await rawResponse.json()

        if (rawResponse.status == 200) {
            console.log(response);
            this.generarTabla(response);
        } else {
            window.alert("Error al cargar la");
        }

    }

    generarTabla = (data) => {
        console.log(data)
        let body = ''
        for (let i = 0; i < data.length; i++) {
            body += `<tr>
                <td>${data[i].usuario}</td>
                <td>${data[i].curso}</td>
                <td>${data[i].catedratico}</td>
                <td>${data[i].mensajePublicacion}</td>
                <td>${data[i].fecha}</td>
                <td><a type="button" class="btn btn-info"  href="http://localhost:3000/Comentarios?reg=${this.getParameter("reg")}&id=${data[i].id}">Comentario</a></td>
                </tr>`
        }
        document.getElementById('pubTable').innerHTML = body;
    }

    MoverPublicacion = (data, i) => {
        console.log(data[i].id)

    }

    //Variable con parametro del URL
    getParameter = (parametroN) => {
        let parametro = new URLSearchParams(window.location.search);
        return parametro.get(parametroN);
    }

    //Link con registro academico del usuario
    regLink = this.getParameter("reg");
    PubLink = async () => {
        window.location.replace("http://localhost:3000/Publicaciones?reg=" + this.regLink);
    }
    NPubLink = async () => {
        window.location.replace("http://localhost:3000/ModalPublicacion?reg=" + this.regLink);
    }

    DatosLink = async () => {
        window.location.replace("http://localhost:3000/DatosPersonales?reg=" + this.regLink);
    }

    render() {
        return (

            <form>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <b className="navbar-brand" href="" >Publicaciones</b>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" onClick={() => this.DatosLink()} href>Datos Personales</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div>
                    <a type="button" class="btn btn-success" onClick={() => this.NPubLink()} href>Añadir Nueva Publicación</a>
                    <h1>    </h1>
                    <button type="button" class="btn btn-success" onClick={() => this.Imprimir()} >Cargar Publicaciones</button>
                    <h1>    </h1>
                </div>
                <div class="dropdown" >
                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        Filtrar Por
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <input name = "tipo" onChange={this.handleChange}/>
                    </ul>
                    <h1>    </h1>
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Escribir el caracter a filtrar" name = "filtro" onChange={this.handleChange} aria-label="Search"/>
                            <button class="btn btn-outline-success" type="submit">Filtrar</button>
                    </form>
                </div>

                <table class="table table-striped">

                    <thead>
                        <tr>
                            <th scope="col">Usuario</th>
                            <th scope="col">Curso</th>
                            <th scope="col">Catedratico</th>
                            <th scope="col">Publicacion</th>
                            <th scope="col">Fecha de Creación</th>
                            <th scope="col">Comentarios</th>
                        </tr>
                    </thead>
                    <tbody id="pubTable" >
                    </tbody>

                </table>

            </form>

        );
    }
}

export default Publicaciones;