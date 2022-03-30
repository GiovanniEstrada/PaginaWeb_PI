import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//Ruta Acceder a la peticion get de Nuestra base de datos
const auth = "http://localhost:4000/auth";

class inicioSesion extends Component {

    state = {
        form: {
            dpi: '',
            pass: ''
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
        let rawResponse = await fetch("http://localhost:4000/auth", {
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
            debugger
            console.log(response);
            this.BotonLink(response);
            window.alert(`Has iniciado sesion como: ${response.nombre}`);
        } else {
            alert("Usuario y/o Contraseña incorrectos");
            window.location.reload();
        }
    }
    //URL con parametro del registro academico
    BotonLink = (response) => {

        window.location.href = "http://localhost:3000/DatosPersonales?reg="+ response.registro;
    }

    render() {
        return (

            <form>
                <nav className="navbar navbar-dark bg-secondary">
                    <div className="container">
                        <a className="navbar-brand" href="#!">
                            Ingenieria en Ciencias y Sistemas
                        </a>
                    </div>
                </nav>
                <div className='mb-3'>
                    <label className="form-label">DPI</label>
                    <input type="User" name='dpi' onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text"></div>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Contraseña</label>
                    <input type="password" name='pass' onChange={this.handleChange} className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={() => this.iniciar()} >Iniciar Sesión</button>
                <div>
                    <a href="http://localhost:3000/Registrate">
                        Registrate
                    </a>
                </div>
                <div>
                    <a href="http://localhost:3000/Recuperar">
                        ¿Has olvidado tu contraseña?
                    </a>
                </div>
            </form>

        );
    }
}

export default inicioSesion;