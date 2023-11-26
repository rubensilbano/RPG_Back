// ESTE ES UN MANEJADOR PARA LAS RUTAS DE LAS PETICIONES ENVIADAS DESDE EL FRONTEND.
    //ESTA ES LA ESPECIFICACION E IMPLEMENTACION A LAS RUTAS
import { RequestHandler } from "express"
// PERMITE MANEJAR FUNCIONES ASINCRONAS CON EXPRESS
import Jugador from "../models/Jugador";
import Heroe from "../models/Heroe";
import Enemigo from "../models/Enemigo";

// CREAR CUENTA JUGADOR
export const createPlayer: RequestHandler = async (req,res) => {
    //  EN CASO DE QUE EL NOMBRE RECIBIDO EXISTA EN LOS REGISTROS, SE DEVUELVE UN JSON CON UN MENSAJE.
    const playerFound = await Jugador.findOne({NOMBRE: req.body.NOMBRE})
    if (playerFound)
        return res.status(301).json({message: "YA EXISTE UN JUGADOR CON ESE NOMBRE"})
    //RECIBE LA REQUEST, Y GUARDA EL CUERPO JSON EN UN NUEVO REGISTRO.
        // NOTESE QUE SOLO SE RECIBEN NOMBRE Y CLAVE.
        // EL RESTO DE VALORES SON GENERADOS POR DEFAULT, TAL COMO SE DECLARO EN EL ESQUEMA Jugador.ts
    const player = new Jugador(req.body)
    // AQUI ESPERA A EJECUTAR EL METODO SAVE, PARA GUARDAR EL REGISTRO.
    const savedPlayer = await player.save()
    res.json('NUEVO JUGADOR CREADO' + savedPlayer.NOMBRE);
}
// INGRESO A CUENTA JUGADOR
export const login: RequestHandler = async (req, res)=>{
    try {
        const jugadores = await Jugador.findOne({"NOMBRE": req.body.NOMBRE}).exec();
        const datosString = JSON.stringify(jugadores)
        const datosJson = JSON.parse(datosString);
        // SI EL USUARIO EXISTE, SE COMPARA LA CLAVE
        if (datosJson["NOMBRE"] != "") {
            if (datosJson["CLAVE"] === req.body.CLAVE) {
                // SI EL INICIO DE SESION ES EXITOSO, COMPARA LA FECHA GUARDADA CON LA ACTUAL.
                    // SI ES UN NUEVO DIA, ENTONCES RENUEVA LA LISTA DE HEROES EN LA TAVERNA,
                    // E INCREMENTA 20 PUNTOS DE ACCION
                    // SI ES EL MISMO DIA, ENTONCES CARGA LOS DATOS DE USUARIO, SIN REALIZAR CAMBIOS.
                const hoy = new Date();
                const fechaGuardada = new Date(datosJson["FECHA"])
                let arrayCopy = datosJson["DISPONIBLES"]
                let jugador;
                let respuesta;
                let datosUsuario;
                if (hoy.getUTCDate() != fechaGuardada.getUTCDate() || hoy.getUTCMonth() + 1 != fechaGuardada.getUTCMonth() + 1 || hoy.getUTCFullYear() != fechaGuardada.getUTCFullYear()) {
                    let arrayAux = new Array<[Number, Number]>()
                    // datosJson["HEROE1"] == 0 ? arrayAux.push(1) : ;
                    if (datosJson["HEROE1"]["NIVEL"] == 0) {arrayAux.push([1, getFinalCost(datosJson["CANTIDAD"], 1)])}
                    if (datosJson["HEROE2"]["NIVEL"] == 0) {arrayAux.push([2, getFinalCost(datosJson["CANTIDAD"], 2)])}
                    if (datosJson["HEROE3"]["NIVEL"] == 0) {arrayAux.push([3, getFinalCost(datosJson["CANTIDAD"], 3)])}
                    if (datosJson["HEROE4"]["NIVEL"] == 0) {arrayAux.push([4, getFinalCost(datosJson["CANTIDAD"], 4)])}
                    if (datosJson["HEROE5"]["NIVEL"] == 0) {arrayAux.push([5, getFinalCost(datosJson["CANTIDAD"], 5)])}
                    if (datosJson["HEROE6"]["NIVEL"] == 0) {arrayAux.push([6, getFinalCost(datosJson["CANTIDAD"], 6)])}
                    if (datosJson["HEROE7"]["NIVEL"] == 0) {arrayAux.push([7, getFinalCost(datosJson["CANTIDAD"], 7)])}
                    if (datosJson["HEROE8"]["NIVEL"] == 0) {arrayAux.push([8, getFinalCost(datosJson["CANTIDAD"], 8)])}
                    if (datosJson["HEROE9"]["NIVEL"] == 0) {arrayAux.push([9, getFinalCost(datosJson["CANTIDAD"], 9)])}
                    if (datosJson["HEROE10"]["NIVEL"] == 0) {arrayAux.push([10, getFinalCost(datosJson["CANTIDAD"], 10)])}
                    if (datosJson["HEROE11"]["NIVEL"] == 0) {arrayAux.push([11, getFinalCost(datosJson["CANTIDAD"], 11)])}
                    if (datosJson["HEROE12"]["NIVEL"] == 0) {arrayAux.push([12, getFinalCost(datosJson["CANTIDAD"], 12)])}
                    if (datosJson["HEROE13"]["NIVEL"] == 0) {arrayAux.push([13, getFinalCost(datosJson["CANTIDAD"], 13)])}
                    if (datosJson["HEROE14"]["NIVEL"] == 0) {arrayAux.push([14, getFinalCost(datosJson["CANTIDAD"], 14)])}
                    if (datosJson["HEROE15"]["NIVEL"] == 0) {arrayAux.push([15, getFinalCost(datosJson["CANTIDAD"], 15)])}
                    if (datosJson["HEROE16"]["NIVEL"] == 0) {arrayAux.push([16, getFinalCost(datosJson["CANTIDAD"], 16)])}
                    if (datosJson["HEROE17"]["NIVEL"] == 0) {arrayAux.push([17, getFinalCost(datosJson["CANTIDAD"], 17)])}
                    if (datosJson["HEROE18"]["NIVEL"] == 0) {arrayAux.push([18, getFinalCost(datosJson["CANTIDAD"], 18)])}
                    if (datosJson["HEROE19"]["NIVEL"] == 0) {arrayAux.push([19, getFinalCost(datosJson["CANTIDAD"], 19)])}
                    if (datosJson["HEROE20"]["NIVEL"] == 0) {arrayAux.push([20, getFinalCost(datosJson["CANTIDAD"], 20)])}
                    if (datosJson["HEROE21"]["NIVEL"] == 0) {arrayAux.push([21, getFinalCost(datosJson["CANTIDAD"], 21)])}
                    if (datosJson["HEROE22"]["NIVEL"] == 0) {arrayAux.push([22, getFinalCost(datosJson["CANTIDAD"], 22)])}
                    if (datosJson["HEROE23"]["NIVEL"] == 0) {arrayAux.push([23, getFinalCost(datosJson["CANTIDAD"], 23)])}
                    if (datosJson["HEROE24"]["NIVEL"] == 0) {arrayAux.push([24, getFinalCost(datosJson["CANTIDAD"], 24)])}
                    arrayCopy = arrayAux
                    // USANDO ALGORITMO Durstenfeld shuffle PARA MEZCLAR ARRAY
                    arrayCopy = shuffleArray(arrayCopy)
                    if (arrayCopy.length > 5) {
                        arrayCopy = arrayCopy.slice(0, 5);
                    }
                    let puntosActuales = datosJson["ACCION"] + 20
                    if (100 < puntosActuales) {
                        puntosActuales = 100
                    }
                    // SE ACTUALIZAN FECHA Y LISTA DE HEROES DISPONIBLES
                    jugador = await Jugador.findOneAndUpdate({"NOMBRE": req.body.NOMBRE}, {$set : {"FECHA": hoy, "DISPONIBLES": arrayCopy, "ACCION": puntosActuales}}, {new: true});
                    datosUsuario = jugador
                } else {
                    datosUsuario = jugadores
                }
                // ESTO ES PARA CARGAR LOS NOMBRES DE LOS HEROES EN UNA LISTA CONSTANTE, QUE SERA GUARDADA EN App
                // DEBIDO A QUE SE NECESITA EN SQUAD, PERO REQUIERE LOS DATOS ANTES DE CARGAR DICHO COMPONENTE.
                // A FUTURO DEBERIA ESTAR EN OTRO CONTROLLER.
                const todosLosHeroes = await Heroe.find().exec();
                let nombresHeroes = new Array<string>()
                for (let i = 0; i < todosLosHeroes.length; i++) {
                    nombresHeroes.push(todosLosHeroes[i]["NOMBRE"])
                }
                respuesta = {
                    "message": "Success",
                    "datosUsuario": datosUsuario,
                    "nombresHeroes": nombresHeroes
                }
                res.json(respuesta);
            } else{
                res.json({"message": "Wrong password"});
            }
        } else {
            // SI EL USUARIO NO EXISTE
            res.json({"message": "No records found!"});
        }
    } catch (error) {
        res.json(error)
    }
}
/* VARIANTE CON .then, NO SIRVE SI QUIERO OBTENER EL REGISTRO ENCONTRADO, PUES LO ASIGNA AL FINAL DE LA EJECUCION
    QUEDANDO SIN EFECTO EL .then
export const login: RequestHandler = async (req, res)=>{
    try {
        const jugador = await Jugador.findOne({"NOMBRE": req.body.NOMBRE}).exec()
        .then(user => {
            // SI EL USUARIO EXISTE, SE COMPARA LA CLAVE
            if (user) {
                if (user.CLAVE === req.body.CLAVE) {
                    
                    console.log("ENVIANDO RESPUESTA")
                    console.log(jugador)

                    const respuesta = {
                        "message": "Success",

                        // ESTO ES PARA PROBAR SI PUEDO GUARDAR TODO EL REGISTRO EN App
                        // "NOMBRE": req.body.NOMBRE

                        "datosUsuario": jugador
                    }
                    res.json(respuesta);
                } else{
                    res.json({"message": "Wrong password"});
                }
            } else {
                // SI EL USUARIO NO EXISTE
                res.json({"message": "No records found!"});
            }
        })
    } catch (error) {
        res.json(error)
    }
}
*/
function getFinalCost(cantidad: number, indice: number) {
    // CALCULA Y DEVUELVE EL COSTO, SEGUN LOS HEROES OBTENIDOS
    const cost = [1000, 500, 300, 1000, 500, 300, 1000, 500, 300, 1000, 500, 300, 1000, 500, 300, 1000, 500, 300, 1000, 500, 300, 1000, 500, 300]
    const costoBase = cost[indice - 1]
    const costo = costoBase * (1 + (cantidad * 0.2))
    return costo;
}
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array: any) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
