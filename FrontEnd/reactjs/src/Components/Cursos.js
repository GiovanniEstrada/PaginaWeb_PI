import { click } from '@testing-library/user-event/dist/click';
import React, { Component } from 'react';

//Ruta Acceder a la peticion get de Nuestra base de datos

class Personales extends Component {

    //Variable con parametro del URL
    getParameter = (parametroN) => {
        let parametro = new URLSearchParams(window.location.search);
        return parametro.get(parametroN);
    }

    //Link con registro academico del usuario
    regLink = this.getParameter("reg");
    DatosLink = async () => {
        window.location.replace("http://localhost:3000/DatosPersonales?reg=" + this.regLink);
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
            if (data[i].registro == this.regLink) {
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

    //Añadir cursos a el usuario
    GuardarCurso = async (registro, codigo, nombre, creditos) => {
        alert("Dentro de GuardarCurso")
        let rawResponse = await fetch("http://localhost:4000/VerCursos", {
            method: "GET",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                registro: registro,
                codigo: codigo,
                nombre: nombre,
                creditos: creditos
            })
        }
        )
        let response = await rawResponse.json()

        if (rawResponse.status == 200) {
            console.log(response);
            window.alert("Se ha añadido el curso a la tabla de cursos aprobados")
        } else {
            window.alert("Error al cargar los cursos");
        }

    }

    //Generar tabla con todos los cursos
    ImprimirCursos = async () => {
        let rawResponse = await fetch("http://localhost:4000/VerCursos", {
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

    generarTablaC = async (data) => {
        console.log(data)
        let body = ''
        for (let i = 0; i < data.length; i++) {
            body += `<tr>
                <td>${data[i].codigo}</td>
                <td>${data[i].nombre}</td>
                <td>${data[i].creditos}</td>
                <td><a type="button" class="btn btn-success" ${onclick= "this.GuardarCurso(this.regLink, data[i].codigo, data[i].nombre, data[i].creditos);"} >Añadir</a>
                </tr>`
        }
        document.getElementById('idTableC').innerHTML = body;
    }

    render() {
        return (
            <form>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="" >Cursos Ingenieria en Ciencias y Sistemas</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" onClick={() => this.DatosLink()} href>Volver</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <h1>    </h1>
                <tr>
                    <button type="button" class="btn btn-primary" onClick={() => this.ImprimirCursos()} >Ver Cursos</button>
                </tr>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Codigo</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Creditos</th>
                            <th scope="col">Añadir</th>
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