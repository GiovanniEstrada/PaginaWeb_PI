const express = require('express');
const mysqlConnection = require('../database');
const router = express.Router();

// USUARIOS --------------------------------------------------------------------
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

//Auth-----------------------------------------
router.post('/auth',(req, res)=>{
    const {dpi, pass} = req.body;
    const values = [dpi, pass]
    mysqlConnection.query('SELECT * FROM registro WHERE dpi = ? AND pass = ?', values,(err,result)=>{
        if(err){
            res.status(500).send(err);
            console.log(err);
        } else {
            if(result.length>0){
                res.status(200).send(result[0]);
                console.log(result.json);
            }
            else {
                res.status(400).send("El usuario no existe");
            }
            
        }
    });
});

// Generar Usuario
router.post('/Usuario',(req, res)=>{
    const {reg} = req.body;
    const values = [reg]
    mysqlConnection.query('SELECT * FROM registro WHERE registro = ?', values,(err,result)=>{
        if(err){
            res.status(500).send(err);
            console.log(err);
        } else {
            if(result.length>0){
                res.status(200).send(result[0]);
                console.log(result.json);
            }
            else {
                res.status(400).send("El usuario no existe");
            }
            
        }
    });
});

//Recuperar Contraseña---------------------------------
router.post('/recuperar',(req, res)=>{
    const {registro, correo} = req.body;
    const values = [registro, correo]
    mysqlConnection.query('SELECT * FROM registro WHERE registro = ? AND correo = ?', values,(err,result)=>{
        if(err){
            res.status(500).send(err);
            console.log(err);
        } else {
            if(result.length>0){
                res.status(200).send(result[0]);
                console.log(result.json);
            }
            else {
                res.status(400).send("El usuario no existe");
            }
            
        }
    });
});

router.post('/NuevoUsuario',(req, res)=>{
    mysqlConnection.query('INSERT INTO registro SET ?', req.body, (err,rows,fields)=>{
        if(!err){
            res.send("User added");
        } else {
            console.log(err);
        }
    });
});

router.put('/UpdateUsuario',(req, res)=>{
    const usuario = req.body.usuario;
    mysqlConnection.query('UPDATE registro SET ? WHERE dpi = ?', [req.body, usuario], (err,rows,fields)=>{
        if(!err){
            res.send("Update has been successfull");

        } else {
            console.log(err);
        }
    });
});

router.delete('/DeleteUsuario',(req, res)=>{
    const dpi = req.body.dpi;
    mysqlConnection.query('DELETE FROM registro WHERE dpi = ?', [dpi], (err,rows,fields)=>{
        if(!err){
            res.send("User was delete");
        } else {
            console.log(err);
        }
    });
});

module.exports = router;