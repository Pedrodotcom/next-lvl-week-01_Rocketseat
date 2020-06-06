const express = require('express');
const server = express();

const db = require('./database/db');

server.use(express.static('public'));

server.use(express.urlencoded({ extended: true }));

const nunjucks = require('nunjucks');
    nunjucks.configure('pages', {
        express: server,
        noCache: true
    });

server.get('/', (req, res) => {
    return res.render('index.html')
});

server.get('/register', (req, res) => {
    return res.render('register-point.html')
});

server.post('/register', (req, res) => {
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
           return res.send(`[ERRO] no cadastro: \n ${err.message}`)
        }
        
        return res.render('register-point.html', { saved: true });
    })
});

server.get('/search-results', (req, res) => {
    db.all(`SELECT * FROM sites WHERE cidade LIKE '%${req.query.search}%'`, function(err, rows) {
        if(err) {
            return console.warn(err);
        }

        return res.render('search-results.html', { sites: rows })
    })
    
});

server.delete('/sites-delete', (req, res) => {
    db.run(`DELETE FROM sites WHERE id=${req.params.id}`, function(err) {
        if(err) {
            return console.warn(err);
        }
        console.log("Cadastro deletado com sucesso");
    })
});

server.delete('/sites-delete/dropAll', (req, res) => {
    db.run(`DROP TABLE sites`, function(err) {
        if(err) {
            return console.warn(err);
        }
        console.log("Tabela deletada");
    })
});

server.listen(3000);