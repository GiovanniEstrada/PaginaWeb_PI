import React, { Component } from 'react';

//Ruta Acceder a la peticion get de Nuestra base de datos

class Personales extends Component {

    state = {
        form: {
            user: '',
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
        this.ImprimirCursos();
        this.ImprimirDatos();
    }

    //Variable con parametro del URL
    getParameter = (parametroN) => {
        let parametro = new URLSearchParams(window.location.search);
        return parametro.get(parametroN);
    }

    //Link con registro academico del usuario
    regLink = this.getParameter("reg");
    NameLink = this.getParameter("user");
    DatosLink = async () => {
        window.location.replace("http://localhost:3000/DatosPersonales?reg=" + this.regLink);
    }

    // Buscador de Usuarios
    UserLink = async () => {
        if (this.state.form.user == this.regLink) {
            window.location.replace("http://localhost:3000/DatosPersonales?reg=" + this.regLink);
        } else {
            window.location.replace("http://localhost:3000/Perfil?reg=" + this.regLink + "&user=" + this.state.form.user);
        }
    }

    CursoLink = async () => {
        window.location.replace("http://localhost:3000/AñadirCurso?reg=" + this.regLink);
    }

    // Generar datos sobre el usuario
    ImprimirDatos = async () => {
        let rawResponse = await fetch("http://localhost:4000/VerUsuarios", {
            method: "GET",
            headers: { 'Content-type': 'application/json' }
        }
        )
        let response = await rawResponse.json()

        if (rawResponse.status == 200) {
            console.log(response);
            this.generarTablaD(response);
        } else {
            window.alert("Error al cargar la");
        }
    }

    generarTablaD = (data) => {
        console.log(data)
        let body = ''
        for (let i = 0; i < data.length; i++) {
            if (data[i].registro == this.NameLink) {
                body += `<tr>
                <td>${data[i].nombre}</td>
                <td>${data[i].registro}</td>
                <td>${data[i].correo}</td>
                <td>${data[i].fechaNacimiento}</td>
                </tr>`
            }

        }
        document.getElementById('idTableD').innerHTML = body;
    }

    //Generar datos sobre cursos aprobados
    ImprimirCursos = async () => {
        let rawResponse = await fetch("http://localhost:4000/VerAprobados", {
            method: "GET",
            headers: { 'Content-type': 'application/json' }
        }
        )
        let response = await rawResponse.json()

        if (rawResponse.status == 200) {
            console.log(response);
            this.generarTablaC(response);
        } else {
            window.alert("Error al cargar los cursos");
        }

    }

    generarTablaC = (data) => {
        console.log(data)
        let body = ''
        for (let i = 0; i < data.length; i++) {
            if (data[i].registro == this.NameLink) {
                body += `<tr>
                <td>${data[i].codigo}</td>
                <td>${data[i].nombre}</td>
                <td>${data[i].creditos}</td>
                </tr>`
            }

        }
        document.getElementById('idTableC').innerHTML = body;
    }

    render() {
        return (
            <form>

                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href>Datos de Usuario</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a className="nav-link active" aria-current="page" onClick={() => this.DatosLink()} href>Volver</a>
                                </li>
                            </ul>
                            <form class="d-flex">
                                <input class="form-control me-2" name="user" onChange={this.handleChange} type="search" placeholder="Buscar Usuario" aria-label="Search" />
                                <button class="btn btn-outline-success" onClick={() => this.UserLink()} type="button">Buscar</button>
                            </form>
                        </div>
                    </div>
                </nav>

                <button type="button" class="btn btn-dark" onClick={() => this.ImprimirDatos()} >Recargar Datos</button>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre Completo</th>
                            <th scope="col">Registro Academico</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Fecha de Nacimiento</th>
                        </tr>
                    </thead>
                    <tbody id="idTableD">
                    </tbody>
                </table>
                <h1>    </h1>
                <tr>
                    <button type="button" class="btn btn-light" onClick={() => this.ImprimirCursos()} >Recargar Cursos</button>
                    <button type="button" class="btn btn-dark" disabled>Añadir Curso</button>
                </tr>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Codigo</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Creditos</th>
                        </tr>
                    </thead>
                    <tbody id="idTableC">
                    </tbody>
                </table>
            </form>

        );
    }
}

export default Personales;