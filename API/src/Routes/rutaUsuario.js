const express = require('express');
const mysqlConnection = require('../database');
const router = express.Router();
// CURSOS #############################################################
//Obtener el nombre de todos los cursos
router.get('/VerUsuarios',(req, res)=>{
    mysqlConnection.query('SELECT * FROM registro', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.post('/NuevoUsuario',(req, res)=>{
    mysqlConnection.query('INSERT INTO registro SET ?', req.body, (err,rows,fields)=>{
        if(!err){
            res.send("Course added");
        } else {
            console.log(err);
        }
    });
});

router.put('/UpdateUsuario',(req, res)=>{
    const usuario = req.body.usuario;
    mysqlConnection.query('UPDATE registro SET ? WHERE usuario = ?', [req.body, usuario], (err,rows,fields)=>{
        if(!err){
            res.send("Update has been successfull");

        } else {
            console.log(err);
        }
    });
});

router.delete('/DeleteUsuario',(req, res)=>{
    const usuario = req.body.usuario;
    mysqlConnection.query('DELETE FROM registro WHERE usuario = ?', [usuario], (err,rows,fields)=>{
        if(!err){
            res.send("Course was delete");
        } else {
            console.log(err);
        }
    });
});

module.exports = router;