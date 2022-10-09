/* 
Generar una función que nos permita conectarnos a la base de datos
*/

import mongoose from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config() //para cargar variables de entorno 

const {} = process.env

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME
} = process.env

const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority` //uri que nos da mongo para podernos conectar 

function connect(){
    return mongoose.connect(URL) //nos regresa una promesa 
}

export default connect 