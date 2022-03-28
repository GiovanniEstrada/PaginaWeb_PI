const express = require('express');
const app = express();
const cors = require('cors')


//Settings
app.set('port',process.env.PORT || 4000);

//Acciones Iniciales
app.use(express.json());
app.use(cors());

//Routes
app.use(require('./Routes/rutaCurso'));
app.use(require('./Routes/rutaUsuario'));
app.use(require('./Routes/rutaComentarios'));

//Start server
app.listen(app.get('port'), () => {
    console.log('Server run in port', app.get('port'))
});