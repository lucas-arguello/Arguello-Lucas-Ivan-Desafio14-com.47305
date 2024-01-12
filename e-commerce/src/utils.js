//Aqui creamos una variable que me va a permitir ubicar los archivos que yo tenga dentro del proyecto.
import path from "path"; //instalamos esta libreria de Nodejs que ya viene integrada. Me ayuda a unir diferentes rutas.
import { fileURLToPath } from "url";
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import { config } from "./config/config.js";


//El valor que obtenemos de esta variable "__dirname" va ser la "ruta" de la carpeta que contiene el archivo, donde 
//creamos la variable "__dirname". Nos sirve como punto de referencia para poder ubicar las diferentes carpetas o archivos
//del proyecto y referenciamos de esta forma hacia la carpeta "src".
export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const generateToken = (user) => {
    const token = jwt.sign(
        {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age,
            email: user.email,
            role: user.role
        },
        config.tokenJWT.tokenJWT_Key,
        { expiresIn: '12h' }
    )
    return token
}

export const cookieExtractor = (req) => {
    let token;
    if (req && req.cookies) {
        token = req.cookies['cookieLogin'];

    }else{
        token = null
    }
    return token
}

export const createHash = (password) => {//recibo la contraseña del form
    const salt = bcrypt.genSaltSync(10);//crea el algoritmo
    const hash = bcrypt.hashSync(password, salt);//recibe la contraseña y el algoritmo
    return hash
    
}

//funcion para comparar los hash
export const isValidPassword = (password, user) => {//recibe la contraseña nueva y los datos del usuario
    return bcrypt.compareSync(password, user.password)
}