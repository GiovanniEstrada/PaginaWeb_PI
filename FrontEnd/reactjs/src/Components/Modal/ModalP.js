import React, { Component } from 'react';

//Ruta Acceder a la peticion get de Nuestra base de datos
const newPub = "http://localhost:4000/NuevaPublicacion";

class ModalPub extends Component {

    state = {
        form: {
            fecha: '',
            usuario: '',
            curso: '',
            catedratico: '',
            mensajePublicacion: '',
            id: 'null'
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

    Publicar = async () => {
        let rawResponse = await fetch("http://localhost:4000/finduser", {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(
                {
                    "registro": this.regLink
                }
            )
        }
        )
        let responseN = await rawResponse.json()
        const nombre = responseN.nombre;
        
        await fetch(newPub, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify({
                fecha: this.state.form.fecha,
                usuario: nombre,
                curso: this.state.form.curso,
                catedratico: this.state.form.catedratico,
                mensajePublicacion: this.state.form.mensajePublicacion,
                id: null
            })
        })
            .then((response) => {
                window.alert("Se ha subido tu Publicaci??n");
                this.PubLink();
            })
            .catch(error => {
                console.log(error);
                window.alert("Se ha subido tu Publicaci??n de forma exitosa");
                this.PubLink();
            })

    }

    FindUser = async () => {
        debugger;
        
    }

    render() {
        return (

            <form className="row g-3">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href>Crear Publicaci??n</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" type="button" aria-current="page" onClick={() => this.PubLink()} href>Volver</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="col-md-6">
                    <label className="form-label">Curso</label>
                    <input type="curso" name='curso' onChange={this.handleChange} className="form-control" id="inputPassword4" />
                </div>
                <div className="col-12">
                    <label className="form-label">Catedratico</label>
                    <input type="catedratico" name='catedratico' onChange={this.handleChange} className="form-control" id="nombre" />
                </div>
                <div className="col-12">
                    <label className="form-label">Publicacion</label>
                    <input type="mensajePublicacion" name='mensajePublicacion' onChange={this.handleChange} className="form-control" id="inputAddress" />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Fecha de Creacion</label>
                    <input type="text" name='fecha' onChange={this.handleChange} className="form-control" id="inputCity" placeholder="YY-MM-DD" />
                </div>
                <div className="col-12">
                    <button type="button" onClick={() => this.Publicar()} className="btn btn-success" href>Publicar</button>
                </div>
            </form>
        );
    }
}

export default ModalPub;