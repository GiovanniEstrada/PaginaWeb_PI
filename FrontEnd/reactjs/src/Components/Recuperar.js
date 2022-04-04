import React, { Component } from 'react';

//Ruta Acceder a la peticion get de Nuestra base de datos

class inicioSesion extends Component {

    state = {
        form: {
            registro: '',
            correo: ''
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

    iniciar = async () => {
        let rawResponse = await fetch("http://localhost:4000/recuperar", {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(
                {
                    "registro": this.state.form.registro,
                    "correo": this.state.form.correo
                }
            )
        }
        )
        let response = await rawResponse.json()

        if (rawResponse.status == 200) {
            console.log(response);
            window.alert(`La contraseña de tu cuenta es: ${response.pass}`);
            window.location.replace("http://localhost:3000/");
        } else {
            window.alert("Registro Academico y/o Correo incorrectos")
        }
    }

    render() {
        return (

            <form>
                <nav className="navbar navbar-dark bg-secondary">
                    <div className="container">
                        <a className="navbar-brand" href="#!">
                            Recupera tu Contraseña
                        </a>
                    </div>
                </nav>
                <div className='mb-3'>
                    <label className="form-label">Registro Academico</label>
                    <input type="User" name='registro' onChange={this.handleChange} className="form-control" id="exampleInputEmail1" />
                    <div className="form-text"></div>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Correo Electronico</label>
                    <input type="emailHelp" name='correo' onChange={this.handleChange} className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="button" className="btn btn-primary" onClick={() => this.iniciar()} href>Recuperar</button>
            </form>

        );
    }
}

export default inicioSesion;