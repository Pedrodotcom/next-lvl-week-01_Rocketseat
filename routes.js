const express = require('express');
const router = express.Router()
const db = require('./database/db');

router.get('/', (req, res) => {
    return res.render('index.html')
});

router.get('/register', (req, res) => {
    return res.render('register-point.html')
});

router.post('/register', (req, res) => {
    const query = `
        INSERT INTO sites (
            name,
            adress,
            adressComplement,
            estado,
            cidade,
            items
        ) VALUES (?, ?, ?, ?, ?, ?);
    `   

    const register = [
        req.body.name,
        req.body.adress,
        req.body.adressComplement,
        req.body.estado,
        req.body.cidade,
        req.body.items
    ]

    db.run(query, register, function(err) {
        if(err) {
           console.warn(err);
           return res.render('register-point.html', { sent: true })
        }
        
        return res.render('register-point.html', { sent: true, saved: true });
    })
});

router.get('/search-results', (req, res) => {
    db.all(`SELECT * FROM sites WHERE cidade LIKE '%${req.query.search}%'`, function(err, rows) {
        if(err) {
            return console.warn(err);
        }

        return res.render('search-results.html', { sites: rows })
    })
    
});

router.delete('/sites-delete', (req, res) => {
    db.run(`DELETE FROM sites WHERE id=${req.params.id}`, function(err) {
        if(err) {
            return console.warn(err);
        }
        console.log("Cadastro deletado com sucesso");
    })
});

router.delete('/sites-delete/dropAll', (req, res) => {
    db.run(`DROP TABLE sites`, function(err) {
        if(err) {
            return console.warn(err);
        }
        console.log("Tabela deletada");
    })
});

module.exports = router