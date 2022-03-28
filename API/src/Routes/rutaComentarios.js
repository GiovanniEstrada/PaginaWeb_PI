const express = require('express');
const mysqlConnection = require('../database');
const router = express.Router();

// COMENTARIOS DE PUBLICACION ----------------------------------------
//Obtener comentarios en funcion de su id-------------------------------------

router.get('/Comentarios/:id',(req, res)=>{
    const {id} = req.params.id;
    const values = [id]
    mysqlConnection.query('SELECT * FROM comentarios WHERE id = ?', [req.params.id],(err,result)=>{
        if(err){
            res.status(500).send(err);
            console.log(err);
        } else {
            if(result.length>0){
                res.status(200).send(result[0]);
                console.log(result.json);
            }
            else {
                res.status(400).send("El id no existe");
            }
            
        }
    });
});
//Todos los comentarios ---------------------------------------

router.get('/VerComentario',(req, res)=>{
    mysqlConnection.query('SELECT * FROM comentarios', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.post('/NuevoComentario',(req, res)=>{
    mysqlConnection.query('INSERT INTO comentarios SET ?', req.body, (err,rows,fields)=>{
        if(!err){
            res.send("Course added");
        } else {
            console.log(err);
        }
    });
});

router.put('/UpdateComentario',(req, res)=>{
    const id = req.body.id;
    mysqlConnection.query('UPDATE comentarios SET ? WHERE id = ?', [req.body, id], (err,rows,fields)=>{
        if(!err){
            res.send("Update has been successfull");

        } else {
            console.log(err);
        }
    });
});

router.delete('/DeleteComentario',(req, res)=>{
    const id = req.body.id;
    mysqlConnection.query('DELETE FROM comentarios WHERE id = ?', [id], (err,rows,fields)=>{
        if(!err){
            res.send("Course was delete");
        } else {
            console.log(err);
        }
    });
});

module.exports = router;