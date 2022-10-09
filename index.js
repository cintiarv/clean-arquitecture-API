/* 
index.js
Punto de inicio de la aplicación (entry point)
-Conectar a la DB
-Levantar el server

*/

import dbConnect from './src/libs/db.js'
import {server} from './src/server.js'







//Poner a escuchar nuestro server 
dbConnect()
    .then(() => {
        console.log('Database connected c:');

        server.listen(8080, () => {
            console.log('Server listening on port 8080');
        })


    })
    .catch((error) => console.log('Error: ', error))