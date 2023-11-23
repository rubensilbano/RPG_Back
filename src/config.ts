import dotenv from "dotenv"
dotenv.config();
//EJECUTA EL CONTENIDO DE .env CADA VEZ QUE INICIA EL PROYECTO
// console.log(process.env.HELLO)

// TOMA LOS VALORES DE .env
    // process ES UN OBJETO AUTOINICIADO DE NODE, EXISTIRA POR DEFECTO CADA VEZ QUE SE INICIE EL PROGRAMA

export default {
    MONGO_DATABASE: process.env.MONGO_DATABASE,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_PORT: process.env.PORT,
    MONGO_USER_ADMIN: process.env.MONGO_USER_ADMIN,
    MONGO_PASSWORD_ADMIN: process.env.MONGO_PASSWORD_ADMIN
}