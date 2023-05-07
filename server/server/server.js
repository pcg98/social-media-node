const express = require('express');
const cors = require('cors');
const db = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.db = db
        // Conectar a base de datos
        this.conectarDB();
        //this.prueba();
        this.usuariosPath = '/api/users';

        this.authPath     = '/api/auth'; 

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        try{
            await this.db.authenticate();
            console.log("Connection with the DB succesfull");
              
        }catch(error){
            console.log("Fail with the DB");
            console.log(error)
        }
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.usuariosPath, require('../routes/users'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;