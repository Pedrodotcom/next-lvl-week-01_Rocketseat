const express = require('express');
const server = express();
const nunjucks = require('nunjucks');
    nunjucks.configure('pages', {
        express: server,
        noCache: true
    })

server.use(express.static('public'));

server.get('/', (req, res) => {
    return res.render('index.html')
})

server.get('/register', (req, res) => {
    return res.render('register-point.html')
})

server.get('/search-results', (req, res) => {
    return res.render('search-results.html')
})

server.listen(3000)