/* 
server:
    Este archivo guardará la definición del servidor
        -Que middlewares va a usar -montar los middleware 
        -montar los routers 
*/

import express from 'express'

const server = express()

//middlewares
server.use(express.json())

// Routers
import kodersRouter from '../src/routers/koders.router.js'
import mentorsRouter from '../src/routers/mentors.router.js'

//aqui encuentro a la ruta /koders
server.use('/koders', kodersRouter)//diciendole al server que conozca este router , ánclate a la ruta kdkoders
server.use('/mentors', mentorsRouter)


// middleware - handleErrors

export {server} //asi con ste nombre la tengo q importat cuando esta dentro de llaves