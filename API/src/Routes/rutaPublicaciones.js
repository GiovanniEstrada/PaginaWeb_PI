const express = require('express');
const mysqlConnection = require('../database');
const router = express.Router();

// CURSOS #############################################################
//Obtener el nombre de todos los cursos

router.get('/VerPublicacion',(req, res)=>{
    mysqlConnection.query('SELECT * FROM publicacion', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.post('/NuevaPublicacion',(req, res)=>{
    mysqlConnection.query('INSERT INTO publicacion SET ?', req.body, (err,rows,fields)=>{
        if(!err){
            res.send("Publicacion añadida");
        } else {
            console.log(err);
        }
    });
});


router.put('/UpdatePublicacion',(req, res)=>{
    const id = req.body.id;
    mysqlConnection.query('UPDATE publicacion SET ? WHERE id = ?', [req.body, id], (err,rows,fields)=>{
        if(!err){
            res.send("Update has been successfull");

        } else {
            console.log(err);
        }
    });
});

router.delete('/DeletePublicacion',(req, res)=>{
    const id = req.body.id;
    mysqlConnection.query('DELETE FROM publicacion WHERE id = ?', [id], (err,rows,fields)=>{
        if(!err){
            res.send("Publicacion fue eliminada");
        } else {
            console.log(err);
        }
    });
});

module.exports = router;