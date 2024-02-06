//INICIA LA CONEXION A LA BD DE MONGO, USANDO MONGOOSE

// ConnectionOptions, ES UN OBJETO DE MONGOOSE, DONDE SE PUEDEN CAMBIAR CONFIGURACIONES PARA LA CONEXION A LA BD.
import mongoose from "mongoose";
import config from "./config";
// ESTO DEVUELVE EL NOMBRE DEL EQUIPO EN QUE SE ESTA USANDO ACTUALMENTE EN EL SISTEMA OPERATIVO
import { hostname } from "os";

// SEGUN FAZT, ESTA FUNCION ANONIMA ASINCRONA(ENCERRADA ENTRE PARENTESIS) SE EJECUTARA AUTOMATICAMENTE
    // SIN NECESIDAD DE SER LLAMADA DE FORMA EXPLICITA.
// NO EXPLICO SI ESTE COMPORTAMIENTO ES EXCLUSIVO DE TS, O SI INCLUSO JS LO TIENE.
// METODO DE FAZT. FUNCIONO EN LOCAL, PERO NO EN DEPLOY

(async () => {
    try {
        // AQUI SE PUEDEN ESPECIFICAR OPCIONES PARA LA CONEXION DE MONGOOSE
            // EN ESTE CASO Y EN ESTA VERSION, REQUIERE LAS CREDENCIALES DEL ADMIN
        const mongooseOptions = {
            "authSource": "admin",
            "user": config.MONGO_USER_ADMIN,
            "pass": config.MONGO_PASSWORD_ADMIN
        }

        // EXISTEN DOS FORMAS DE CONECTARSE A LA BD:

        // METODO SIN AUTENTICACION.
            // FUNCIONA POR DEFECTO SI MONGO TIENE DESACTIVADA LA security:
        // const db = await mongoose.connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`, mongooseOptions);
        
        // METODO AUTENTICADO.
            // SOLO FUNCIONA SI MONGO TIENE ACTIVADA LA security: authorization: enabled
            // PERO REQUIERE EL USUARIO Y CLAVE DE ADMINISTRADOR
        const db = await mongoose.connect(

            // ESTA ES LA RUTA DE CONEXION LOCAL
            // `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_HOST}/${config.MONGO_DATABASE}`,
            // mongooseOptions

            `mongodb+srv://rubensilbano1990:<password>@cluster0.7ucqdjs.mongodb.net/?retryWrites=true&w=majority`
        );
        console.log('Base de datos conectada', db.connection.name);
    } catch (error) {
        console.error(error);
    }
})()


// METODO DE RAILWAY
// mongoose.connect(process.env.MONGO_URL);
// ESTE METODO REEMPLAZA EL NOMBRE DE LA BD POR EL PUERTO HTTP
/*
mongoose.connect(
    `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_HOST}:${config.MONGO_PORT}`
);
const database = mongoose.connection;
database.on(
  "error",
  console.error.bind(console, "❌ mongodb ERROR DE CONEXION")
);
database.once("open", () => console.log("✅ mongodb CONECTADA EN EL SERVIDOR", mongoose.connection.name));
mongoose.Promise = Promise;
*/



/*
// METODO PARA MONGODB ATLAS
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://rubensilbano1990:<password>@cluster0.7ucqdjs.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/