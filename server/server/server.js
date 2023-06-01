const express = require('express');
const cors = require('cors');
const db = require('../database/config');
const path = require('path');

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
        this.actionsPath = '/api/actions';
        this.messagesPath = '/api/messages';
        this.followsPath = '/api';
        this.imagesPath = '/api/images';

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        try{
            await this.db.authenticate();
              
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
        this.app.use(express.static(path.join(__dirname, 'static')));
        

    }

    routes() {
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.usuariosPath, require('../routes/users'));
        this.app.use( this.actionsPath, require('../routes/users-actions'));
        this.app.use( this.messagesPath, require('../routes/messages'));
        this.app.use( this.followsPath, require('../routes/friendship'));
        this.app.use( this.imagesPath, require('../routes/images'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;