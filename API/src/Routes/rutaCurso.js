const express = require('express');
const mysqlConnection = require('../database');
const router = express.Router();
// CURSOS #############################################################
//Obtener el nombre de todos los cursos
router.get('/VerCursos',(req, res)=>{
    mysqlConnection.query('SELECT * FROM cursos', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.post('/NuevoCurso',(req, res)=>{
    mysqlConnection.query('INSERT INTO cursos SET ?', req.body, (err,rows,fields)=>{
        if(!err){
            res.send("Course added");
        } else {
            console.log(err);
        }
    });
});

router.put('/UpdateCurso',(req, res)=>{
    const codigo = req.body.codigo;
    mysqlConnection.query('UPDATE cursos SET ? WHERE codigo = ?', [req.body, codigo], (err,rows,fields)=>{
        if(!err){
            res.send("Update has been successfull");

        } else {
            console.log(err);
        }
    });
});

router.delete('/DeleteCurso',(req, res)=>{
    const codigo = req.body.codigo;
    mysqlConnection.query('DELETE FROM cursos WHERE codigo = ?', [codigo], (err,rows,fields)=>{
        if(!err){
            res.send("Course was delete");
        } else {
            console.log(err);
        }
    });
});

module.exports = router;