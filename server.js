const express = require('express');
const server = express();
const routes = require('./routes')


server.use(express.static('public'));

server.use(express.urlencoded({ extended: true }));

server.use(routes)
const nunjucks = require('nunjucks');
    nunjucks.configure('pages', {
        express: server,
        noCache: true
    });

server.listen(3000);