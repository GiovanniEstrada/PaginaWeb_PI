import React, { Component } from 'react';

//Ruta Acceder a la peticion get de Nuestra base de datos
const newCom = "http://localhost:4000/NuevoComentario";

class ModalPub extends Component {

    //Variable con parametro del URL
    getParameter = (parametroN) => {
        let parametro = new URLSearchParams(window.location.search);
        return parametro.get(parametroN);
    }

    //Link con registro academico del usuario
    regLink = this.getParameter("reg");
    idLink = this.getParameter("id");
    ComLink = async () => {
        window.location.replace("http://localhost:3000/Comentarios?reg=" + this.regLink + "&id=" + this.idLink);
    }

    state = {
        form: {
            usuario: '',
            comentario: '',
            id: ''
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

        await fetch(newCom, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify({
                id: this.idLink,
                usuario: nombre,
                comentario: this.state.form.comentario
            })
        })
            .then((response) => {
                window.alert("Se ha subido tu comentario");
                this.ComLink();

            })
            .catch(error => {
                console.log(error);
                window.alert("Se ha publicado el comentario de forma satisfactoria");
                this.ComLink();

            })

    }

    render() {
        return (

            <form className="row g-3">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <botton className="navbar-brand" href>Nuevo Comentario</botton>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" onClick={() => this.ComLink()} href>Volver</a>
                        </li>
                    </ul>
                    </div>
                </nav>
                <div className="col-md-6">
                    <label className="form-label">Comentario</label>
                    <input type="Comentario" name='comentario' onChange={this.handleChange} className="form-control" id="inputPassword4" />
                </div>
                <div className="col-12">
                    <button type="button" onClick={() => this.Publicar()} className="btn btn-success" href>Publicar Comentario</button>
                </div>
            </form>
        );
    }
}

export default ModalPub;