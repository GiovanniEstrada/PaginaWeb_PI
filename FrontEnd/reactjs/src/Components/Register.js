import React, { Component } from 'react';


//Ruta Acceder a la peticion get de Nuestra base de datos
const newUser = "http://localhost:4000/NuevoUsuario";

class Registrar extends Component {

    state = {
        form: {
            dpi: '',
            pass: '',
            nombre: '',
            correo: '',
            fechaNacimiento: '',
            registro: ''
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

    NuevoUsuario = async () => {
        await fetch(newUser, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify({
                registro: this.state.form.registro,
                dpi: this.state.form.dpi,
                nombre: this.state.form.nombre,
                correo: this.state.form.correo,
                pass: this.state.form.pass,
                fechaNacimiento: this.state.form.fechaNacimiento
            })
        })
        .then((response) => {
            debugger
            window.alert("Usuario Creado de Forma Exitosa");
            window.location.replace("http://localhost:3000/");
        })
        .catch(error => {
            console.log(error);
            window.alert("Ocurrio un error al Crear el Usuario");
        })
        
    }

    render() {
        return (

            <form className="row g-3">

                <nav className="navbar navbar-dark bg-secondary">
                    <div className="container">
                        <a className="navbar-brand" href="#!">
                            Registrate para iniciar sesion
                        </a>
                    </div>
                </nav>
                <div className="col-md-6">
                    <label  className="form-label">Correo</label>
                    <input type="email" name='correo' onChange={this.handleChange} className="form-control" id="inputEmail4" />
                </div>
                <div className="col-md-6">
                    <label  className="form-label">Contraseña</label>
                    <input type="password" name='pass' onChange={this.handleChange} className="form-control" id="inputPassword4" />
                </div>
                <div className="col-12">
                    <label  className="form-label">Nombre Completo</label>
                    <input type="text" name='nombre' onChange={this.handleChange} className="form-control" id="nombre" />
                </div>
                <div className="col-12">
                    <label  className="form-label">Registro Academico</label>
                    <input type="text" name='registro' onChange={this.handleChange} className="form-control" id="inputAddress" />
                </div>
                <div className="col-12">
                    <label  className="form-label">DPI</label>
                    <input type="text" name='dpi' onChange={this.handleChange} className="form-control" id="inputAddress2" />
                </div>
                <div className="col-md-6">
                    <label  className="form-label">Fecha de Nacimiento</label>
                    <input type="text" name='fechaNacimiento' onChange={this.handleChange} className="form-control" id="inputCity" placeholder="YY-MM-DD" />
                </div>
                <div className="col-12">
                    <button type="submit" onClick={() => this.NuevoUsuario()} className="btn btn-success">Registrarse</button>
                </div>
            </form>
        );
    }
}

export default Registrar;