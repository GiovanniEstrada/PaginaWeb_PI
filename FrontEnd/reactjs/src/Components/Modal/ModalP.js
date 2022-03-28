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

    Publicar = async () => {
        await fetch(newPub, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify({
                fecha: this.state.form.fecha,
                usuario: this.state.form.usuario,
                curso: this.state.form.curso,
                catedratico: this.state.form.catedratico,
                mensajePublicacion: this.state.form.mensajePublicacion,
                id: null
            })
        })
            .then((response) => {

                window.alert("Se ha subido tu Publicación");
            })
            .catch(error => {
                console.log(error);
                window.alert("No se ha podido subir la publicación");
            })

    }

    render() {
        return (

            <form className="row g-3">
                <nav className="navbar navbar-dark bg-secondary">
                    <div className="container">
                        <a className="navbar-brand" href="http://localhost:3000/Publicaciones">
                            Publicacion
                        </a>
                    </div>
                </nav>
                <div className="col-md-6">
                    <label className="form-label">Usuario</label>
                    <input type="usuario" name='usuario' onChange={this.handleChange} className="form-control" id="inputEmail4" />
                </div>
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
                    <button type="submit" onClick={() => this.Publicar()} className="btn btn-success" href='http://localhost:3000/Publicaciones'>Registrarse</button>
                </div>
            </form>
        );
    }
}

export default ModalPub;