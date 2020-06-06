const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./database/database.db");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS sites (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            adress TEXT,
            adressComplement TEXT,
            estado TEXT,
            cidade TEXT,
            items TEXT
        ); 
    `)
})

module.exports = db;