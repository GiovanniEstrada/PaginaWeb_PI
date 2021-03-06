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

    componentDidMount() {
        this.Imprimir();
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
    //Filtrar---------------------------------------------------------------------------

    GetFiltro = async () => {
        let rawResponse = await fetch("http://localhost:4000/VerPublicacion", {
            method: "GET",
            headers: { 'Content-type': 'application/json' }
        }
        )
        let response = await rawResponse.json()

        if (rawResponse.status == 200) {
            console.log(response);
            this.tablaFiltrada(response);
        } else {
            window.alert("Error al cargar la");
        }
    }

    tablaFiltrada = (data) => {
        console.log(data)
        let body = ''
        for (let i = 0; i < data.length; i++) {
            if (this.state.form.tipo == 1 && data[i].curso == this.state.form.filtro) {
                body += `<tr>
                <td>${data[i].usuario}</td>
                <td>${data[i].curso}</td>
                <td>${data[i].catedratico}</td>
                <td>${data[i].mensajePublicacion}</td>
                <td>${data[i].fecha}</td>
                <td><a type="button" class="btn btn-info"  href="http://localhost:3000/Comentarios?reg=${this.getParameter("reg")}&id=${data[i].id}">Comentario</a></td>
                </tr>`
            } else if (this.state.form.tipo == 2 && data[i].catedratico == this.state.form.filtro) {
                body += `<tr>
                    <td>${data[i].usuario}</td>
                    <td>${data[i].curso}</td>
                    <td>${data[i].catedratico}</td>
                    <td>${data[i].mensajePublicacion}</td>
                    <td>${data[i].fecha}</td>
                    <td><a type="button" class="btn btn-info"  href="http://localhost:3000/Comentarios?reg=${this.getParameter("reg")}&id=${data[i].id}">Comentario</a></td>
                    </tr>`
            }
        }
        document.getElementById('pubTable').innerHTML = body;
    }

    //Variable con parametro del URL----------------------------------------------------
    getParameter = (parametroN) => {
        let parametro = new URLSearchParams(window.location.search);
        return parametro.get(parametroN);
    }

    //Link con registro academico del usuario---------------------------------------------
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
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="btn btn-danger" aria-current="page" href="http://localhost:3000/">Cerrar sesion</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div>
                    <a type="button" class="btn btn-dark" onClick={() => this.NPubLink()} href>A??adir Nueva Publicaci??n</a>
                    <h1>    </h1>
                    <button type="button" class="btn btn-secondary" onClick={() => this.Imprimir()} >Recargar Publicaciones</button>
                    <h1>    </h1>
                </div>
                <div class="dropdown" >
                    <select name="tipo" onChange={this.handleChange} class="form-select form-select-sm" aria-label=".form-select-sm example">
                        <option selected>Seleccione tipo de filtro</option>
                        <option value="1">Curso</option>
                        <option value="2">Catedratico</option>
                    </select>
                    <h1>    </h1>
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Escribir el caracter a filtrar" name="filtro" onChange={this.handleChange} aria-label="Search" />
                        <button class="btn btn-success" onClick={() => this.GetFiltro()} type="button">Filtrar</button>
                    </form>
                </div>

                <table class="table table-striped">

                    <thead>
                        <tr>
                            <th scope="col">Usuario</th>
                            <th scope="col">Curso</th>
                            <th scope="col">Catedratico</th>
                            <th scope="col">Publicacion</th>
                            <th scope="col">Fecha de Creaci??n</th>
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