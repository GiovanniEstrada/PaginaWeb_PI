import React, { Component } from 'react';
import axios from 'axios';

//Ruta Acceder a la peticion get de Nuestra base de datos
const getUser = "http://localhost:4000/VerUsuarios";

class inicioSesion extends Component {

    state = {
        form:{
            dpi: '',
            pass: ''
        }
    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        console.log(this.state.form);
    }

    ComprobarSesion = async() =>{
        await axios.post(getUser, {params: {dpi: this.state.form.dpi, pass: this.state.form.pass}})
        .then(response=>{
            console.log(response.data);
        })
        .catch(error=>{
            console.log(error);
        })

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
                <label  className="form-label">DPI</label>
                <input  type="User" name='dpi' onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text"></div>
            </div>
            <div className='mb-3'>
                <label  className="form-label">Contraseña</label>
                <input  type="password" name='pass' onChange={this.handleChange} className="form-control" id="exampleInputPassword1"/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={()=> this.ComprobarSesion()}>Iniciar Sesion</button>
            <button type="submit" className="btn btn-link">¿Has olvidado la contraseña?</button>
        </form>
        );
    }
}

export default inicioSesion;