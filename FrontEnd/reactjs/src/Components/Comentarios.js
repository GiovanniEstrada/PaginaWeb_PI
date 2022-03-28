import React, { Component} from 'react';

class Publicaciones extends Component {

    state = {
        form: {
            dpi: '',
            pass: ''
        }
    }

    Imprimir = async () => {
        var input = new URL(window.location.href);
        var Parametro = input.searchParams.get("id");
        let rawResponse = await fetch("http://localhost:4000/VerPublicacion", {
            method: "GET",
            headers: { 'Content-type': 'application/json' }
        }
        )
        let response = await rawResponse.json()

        if (rawResponse.status == 200) {
            console.log(Parametro);
            console.log(response);
            this.generarTabla(response);
        } else {
            window.alert("Usuario y/o Contraseña incorrectos");
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
                <td><button type="button" class="btn btn-info"  href="http://localhost:3000/ModalComentario">Comentario</button></td>
                </tr>`
        }
        document.getElementById('pubTable').innerHTML = body;
    }

    MoverPublicacion = (data, i) =>{
        console.log(data[i].id)
        
    }

    render() {
        return (

            <form>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="http://localhost:3000/Publicaciones">Comentarios</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="http://localhost:3000/Publicaciones">Volver</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <a type="button" class="btn btn-success" href="http://localhost:3000/ModalPublicacion">Añadir Nuevo Comentario</a>
                <h1>    </h1>
                <button type="button" class="btn btn-success" onClick={()=> this.Imprimir()} >Cargar Comentarios</button>

                <table class="table table-striped">
                        
                    <thead>
                        <tr>
                            <th scope="col">Usuario</th>
                            <th scope="col">Curso</th>
                            <th scope="col">Catedratico</th>
                            <th scope="col">Publicacion</th>
                            <th scope="col">Fecha de Creación</th>
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