// ESTE ES UN MANEJADOR PARA LAS RUTAS DE LAS PETICIONES, A LOS OBJETOS VIDEO.
    //ESTA ES LA ESPECIFICACION E IMPLEMENTACION A LAS RUTAS
import { RequestHandler } from "express"
// PERMITE MANEJAR FUNCIONES ASINCRONAS CON EXPRESS
import Jugador from "./Jugador";
import Heroe from "./Heroe";
import Enemigo from "./Enemigo";

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
                respuesta = {
                    "message": "Success",
                    "datosUsuario": datosUsuario
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

// AL EJECUTAR MUESTRA TODOS LOS REGISTROS DE JUGADORES.
export const getAllPlayers: RequestHandler = async (req,res) => {
    try {
        // const videos = await Jugador.find()
        const jugadores = await Jugador.find().exec();
        console.log(jugadores)
        return res.json(jugadores);
    } catch (error) {
        res.json(error)
    }
}
// COMO RESPALDO, TRATA DE INSERTAR LAS TABLAS HEROES Y ENEMIGOS
export const respaldo: RequestHandler = async (req,res) => {
    try {
        const heroes = await Heroe.insertMany([
            {"NOMBRE": "Guerrero S", 
            "ATAQUEMIN": 31, "ATAQUEMAX": 58, "DEFENSAMIN": 2.3, "DEFENSAMAX": 6.2, "VIDAMIN": 700, "VIDAMAX": 1375, "REGENMIN": 1.45, "REGENMAX": 2.8, 
            "CADENCIAMIN": 1.82, "CADENCIAMAX": 1.5, "CRITICOMIN": 10, "CRITICOMAX": 20, "EVASIONMIN": 10, "EVASIONMAX": 30, "ATURDIRMIN": 0, "ATURDIRMAX": 0},
            {"NOMBRE": "Guerrero A", 
            "ATAQUEMIN": 26.35, "ATAQUEMAX": 49.3, "DEFENSAMIN": 1.96, "DEFENSAMAX": 5.27, "VIDAMIN": 595, "VIDAMAX": 1169, "REGENMIN": 1.23, "REGENMAX": 2.38, 
            "CADENCIAMIN": 2.09, "CADENCIAMAX": 1.73, "CRITICOMIN": 9, "CRITICOMAX": 17, "EVASIONMIN": 9, "EVASIONMAX": 26, "ATURDIRMIN": 0, "ATURDIRMAX": 0},
            {"NOMBRE": "Guerrero B", 
            "ATAQUEMIN": 21.7, "ATAQUEMAX": 40.6, "DEFENSAMIN": 1.61, "DEFENSAMAX": 4.34, "VIDAMIN": 490, "VIDAMAX": 963, "REGENMIN": 1.02, "REGENMAX": 1.96, 
            "CADENCIAMIN": 2.37, "CADENCIAMAX": 1.95, "CRITICOMIN": 7, "CRITICOMAX": 14, "EVASIONMIN": 7, "EVASIONMAX": 21, "ATURDIRMIN": 0, "ATURDIRMAX": 0},
            {"NOMBRE": "Paladin S", 
            "ATAQUEMIN": 29, "ATAQUEMAX": 53, "DEFENSAMIN": 3.9, "DEFENSAMAX": 7.8, "VIDAMIN": 650, "VIDAMAX": 1250, "REGENMIN": 1.35, "REGENMAX": 2.55, 
            "CADENCIAMIN": 1.59, "CADENCIAMAX": 1.32, "CRITICOMIN": 0, "CRITICOMAX": 0, "EVASIONMIN": 5, "EVASIONMAX": 15, "ATURDIRMIN": 15, "ATURDIRMAX": 40},
            {"NOMBRE": "Paladin A", 
            "ATAQUEMIN": 24.65, "ATAQUEMAX": 45.05, "DEFENSAMIN": 3.32, "DEFENSAMAX": 6.63, "VIDAMIN": 553, "VIDAMAX": 1063, "REGENMIN": 1.15, "REGENMAX": 2.17, 
            "CADENCIAMIN": 1.83, "CADENCIAMAX": 1.52, "CRITICOMIN": 0, "CRITICOMAX": 0, "EVASIONMIN": 4, "EVASIONMAX": 13, "ATURDIRMIN": 13, "ATURDIRMAX": 34},
            {"NOMBRE": "Paladin B", 
            "ATAQUEMIN": 20.3, "ATAQUEMAX": 37.1, "DEFENSAMIN": 2.73, "DEFENSAMAX": 5.46, "VIDAMIN": 455, "VIDAMAX": 875, "REGENMIN": 0.95, "REGENMAX": 1.79, 
            "CADENCIAMIN": 2.07, "CADENCIAMAX": 1.72, "CRITICOMIN": 0, "CRITICOMAX": 0, "EVASIONMIN": 4, "EVASIONMAX": 11, "ATURDIRMIN": 11, "ATURDIRMAX": 28},
            {"NOMBRE": "Ballestero S", 
            "ATAQUEMIN": 26, "ATAQUEMAX": 39, "DEFENSAMIN": 3.7, "DEFENSAMAX": 7.6, "VIDAMIN": 550, "VIDAMAX": 975, "REGENMIN": 1.4, "REGENMAX": 2.25, 
            "CADENCIAMIN": 1.69, "CADENCIAMAX": 1.42, "CRITICOMIN": 10, "CRITICOMAX": 40, "EVASIONMIN": 0, "EVASIONMAX": 0, "ATURDIRMIN": 5, "ATURDIRMAX": 15},
            {"NOMBRE": "Ballestero A", 
            "ATAQUEMIN": 22.1, "ATAQUEMAX": 33.15, "DEFENSAMIN": 3.15, "DEFENSAMAX": 6.46, "VIDAMIN": 468, "VIDAMAX": 829, "REGENMIN": 1.19, "REGENMAX": 1.91, 
            "CADENCIAMIN": 1.94, "CADENCIAMAX": 1.63, "CRITICOMIN": 9, "CRITICOMAX": 34, "EVASIONMIN": 0, "EVASIONMAX": 0, "ATURDIRMIN": 4, "ATURDIRMAX": 13},
            {"NOMBRE": "Ballestero B", 
            "ATAQUEMIN": 18.2, "ATAQUEMAX": 27.3, "DEFENSAMIN": 2.59, "DEFENSAMAX": 5.32, "VIDAMIN": 385, "VIDAMAX": 683, "REGENMIN": 0.98, "REGENMAX": 1.58, 
            "CADENCIAMIN": 2.2, "CADENCIAMAX": 1.85, "CRITICOMIN": 7, "CRITICOMAX": 28, "EVASIONMIN": 0, "EVASIONMAX": 0, "ATURDIRMIN": 4, "ATURDIRMAX": 11},
            {"NOMBRE": "Ninja S", 
            "ATAQUEMIN": 32, "ATAQUEMAX": 46, "DEFENSAMIN": 4, "DEFENSAMAX": 8.2, "VIDAMIN": 550, "VIDAMAX": 1075, "REGENMIN": 1.4, "REGENMAX": 2.45, 
            "CADENCIAMIN": 1.46, "CADENCIAMAX": 1.22, "CRITICOMIN": 20, "CRITICOMAX": 60, "EVASIONMIN": 20, "EVASIONMAX": 40, "ATURDIRMIN": 0, "ATURDIRMAX": 0},
            {"NOMBRE": "Ninja A", 
            "ATAQUEMIN": 27.2, "ATAQUEMAX": 39.1, "DEFENSAMIN": 3.4, "DEFENSAMAX": 6.97, "VIDAMIN": 468, "VIDAMAX": 914, "REGENMIN": 1.19, "REGENMAX": 2.08, 
            "CADENCIAMIN": 1.68, "CADENCIAMAX": 1.4, "CRITICOMIN": 17, "CRITICOMAX": 51, "EVASIONMIN": 17, "EVASIONMAX": 34, "ATURDIRMIN": 0, "ATURDIRMAX": 0},
            {"NOMBRE": "Ninja B", 
            "ATAQUEMIN": 22.4, "ATAQUEMAX": 32.2, "DEFENSAMIN": 2.8, "DEFENSAMAX": 5.74, "VIDAMIN": 385, "VIDAMAX": 753, "REGENMIN": 0.98, "REGENMAX": 1.72, 
            "CADENCIAMIN": 1.9, "CADENCIAMAX": 1.59, "CRITICOMIN": 14, "CRITICOMAX": 42, "EVASIONMIN": 14, "EVASIONMAX": 28, "ATURDIRMIN": 0, "ATURDIRMAX": 0},
            {"NOMBRE": "Novicia S", 
            "ATAQUEMIN": 23, "ATAQUEMAX": 47, "DEFENSAMIN": 2.5, "DEFENSAMAX": 6.4, "VIDAMIN": 500, "VIDAMAX": 900, "REGENMIN": 1.3, "REGENMAX": 2.1, 
            "CADENCIAMIN": 1.68, "CADENCIAMAX": 1.4, "CRITICOMIN": 20, "CRITICOMAX": 30, "EVASIONMIN": 5, "EVASIONMAX": 15, "ATURDIRMIN": 0, "ATURDIRMAX": 0},
            {"NOMBRE": "Novicia A", 
            "ATAQUEMIN": 19.55, "ATAQUEMAX": 39.95, "DEFENSAMIN": 2.13, "DEFENSAMAX": 5.44, "VIDAMIN": 425, "VIDAMAX": 765, "REGENMIN": 1.11, "REGENMAX": 1.79, 
            "CADENCIAMIN": 1.93, "CADENCIAMAX": 1.61, "CRITICOMIN": 17, "CRITICOMAX": 26, "EVASIONMIN": 4, "EVASIONMAX": 13, "ATURDIRMIN": 0, "ATURDIRMAX": 0},
            {"NOMBRE": "Novicia B", 
            "ATAQUEMIN": 16.1, "ATAQUEMAX": 32.9, "DEFENSAMIN": 1.75, "DEFENSAMAX": 4.48, "VIDAMIN": 350, "VIDAMAX": 630, "REGENMIN": 0.91, "REGENMAX": 1.47, 
            "CADENCIAMIN": 2.18, "CADENCIAMAX": 1.82, "CRITICOMIN": 14, "CRITICOMAX": 21, "EVASIONMIN": 4, "EVASIONMAX": 11, "ATURDIRMIN": 0, "ATURDIRMAX": 0},
            {"NOMBRE": "Maga S", 
            "ATAQUEMIN": 24, "ATAQUEMAX": 52, "DEFENSAMIN": 3.1, "DEFENSAMAX": 5.8, "VIDAMIN": 450, "VIDAMAX": 850, "REGENMIN": 0.95, "REGENMAX": 1.75, 
            "CADENCIAMIN": 1.59, "CADENCIAMAX": 1.4, "CRITICOMIN": 20, "CRITICOMAX": 30, "EVASIONMIN": 0, "EVASIONMAX": 0, "ATURDIRMIN": 10, "ATURDIRMAX": 20},
            {"NOMBRE": "Maga A", 
            "ATAQUEMIN": 20.4, "ATAQUEMAX": 44.2, "DEFENSAMIN": 2.64, "DEFENSAMAX": 4.93, "VIDAMIN": 383, "VIDAMAX": 723, "REGENMIN": 0.81, "REGENMAX": 1.49, 
            "CADENCIAMIN": 1.83, "CADENCIAMAX": 1.61, "CRITICOMIN": 17, "CRITICOMAX": 26, "EVASIONMIN": 0, "EVASIONMAX": 0, "ATURDIRMIN": 9, "ATURDIRMAX": 17},
            {"NOMBRE": "Maga B", 
            "ATAQUEMIN": 16.8, "ATAQUEMAX": 36.4, "DEFENSAMIN": 2.17, "DEFENSAMAX": 4.06, "VIDAMIN": 315, "VIDAMAX": 595, "REGENMIN": 0.67, "REGENMAX": 1.23, 
            "CADENCIAMIN": 2.07, "CADENCIAMAX": 1.82, "CRITICOMIN": 14, "CRITICOMAX": 21, "EVASIONMIN": 0, "EVASIONMAX": 0, "ATURDIRMIN": 7, "ATURDIRMAX": 14},
            {"NOMBRE": "Excomulgado S", 
            "ATAQUEMIN": 30, "ATAQUEMAX": 54, "DEFENSAMIN": 2.6, "DEFENSAMAX": 6.5, "VIDAMIN": 675, "VIDAMAX": 1275, "REGENMIN": 3.15, "REGENMAX": 4.35, 
            "CADENCIAMIN": 1.88, "CADENCIAMAX": 1.55, "CRITICOMIN": 10, "CRITICOMAX": 20, "EVASIONMIN": 10, "EVASIONMAX": 20, "ATURDIRMIN": 5, "ATURDIRMAX": 15},
            {"NOMBRE": "Excomulgado A", 
            "ATAQUEMIN": 25.5, "ATAQUEMAX": 45.9, "DEFENSAMIN": 2.21, "DEFENSAMAX": 5.53, "VIDAMIN": 574, "VIDAMAX": 1084, "REGENMIN": 2.68, "REGENMAX": 3.7, 
            "CADENCIAMIN": 2.16, "CADENCIAMAX": 1.78, "CRITICOMIN": 9, "CRITICOMAX": 17, "EVASIONMIN": 9, "EVASIONMAX": 17, "ATURDIRMIN": 4, "ATURDIRMAX": 13},
            {"NOMBRE": "Excomulgado B", 
            "ATAQUEMIN": 21, "ATAQUEMAX": 37.8, "DEFENSAMIN": 1.82, "DEFENSAMAX": 4.55, "VIDAMIN": 473, "VIDAMAX": 893, "REGENMIN": 2.21, "REGENMAX": 3.05, 
            "CADENCIAMIN": 2.44, "CADENCIAMAX": 2.02, "CRITICOMIN": 7, "CRITICOMAX": 14, "EVASIONMIN": 7, "EVASIONMAX": 14, "ATURDIRMIN": 4, "ATURDIRMAX": 11},
            {"NOMBRE": "Inquisidor S", 
            "ATAQUEMIN": 35, "ATAQUEMAX": 50, "DEFENSAMIN": 4.6, "DEFENSAMAX": 9.1, "VIDAMIN": 550, "VIDAMAX": 1000, "REGENMIN": 1.15, "REGENMAX": 2.05, 
            "CADENCIAMIN": 1.23, "CADENCIAMAX": 1.02, "CRITICOMIN": 15, "CRITICOMAX": 30, "EVASIONMIN": 10, "EVASIONMAX": 30, "ATURDIRMIN": 0, "ATURDIRMAX": 0},
            {"NOMBRE": "Inquisidor A", 
            "ATAQUEMIN": 29.75, "ATAQUEMAX": 42.5, "DEFENSAMIN": 3.91, "DEFENSAMAX": 7.74, "VIDAMIN": 468, "VIDAMAX": 850, "REGENMIN": 0.98, "REGENMAX": 1.74, 
            "CADENCIAMIN": 1.41, "CADENCIAMAX": 1.17, "CRITICOMIN": 13, "CRITICOMAX": 26, "EVASIONMIN": 9, "EVASIONMAX": 26, "ATURDIRMIN": 0, "ATURDIRMAX": 0},
            {"NOMBRE": "Inquisidor B", 
            "ATAQUEMIN": 24.5, "ATAQUEMAX": 35, "DEFENSAMIN": 3.22, "DEFENSAMAX": 6.37, "VIDAMIN": 385, "VIDAMAX": 700, "REGENMIN": 0.81, "REGENMAX": 1.44, 
            "CADENCIAMIN": 1.6, "CADENCIAMAX": 1.33, "CRITICOMIN": 11, "CRITICOMAX": 21, "EVASIONMIN": 7, "EVASIONMAX": 21, "ATURDIRMIN": 0, "ATURDIRMAX": 0}])
            const enemigos = await Enemigo.insertMany([
                {"NOMBRE":"Bandit","NIVEL":"1","INDICE":"0","ZONA":"PUEBLO","RANGO":"false","PUNTOSBATALLA":"264","ATAQUE":"12","DEFENSA":"0","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Black Spider","NIVEL":"1","INDICE":"1","ZONA":"CUEVA","RANGO":"false","PUNTOSBATALLA":"264","ATAQUE":"12","DEFENSA":"0","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Corrupted Treant","NIVEL":"1","INDICE":"2","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"264","ATAQUE":"12","DEFENSA":"0","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Crystal Arachnathid","NIVEL":"1","INDICE":"3","ZONA":"CUEVA","RANGO":"false","PUNTOSBATALLA":"284","ATAQUE":"12","DEFENSA":"2","VIDA":"200","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Draenei Guardian","NIVEL":"1","INDICE":"4","ZONA":"CEMENTERIO","RANGO":"false","PUNTOSBATALLA":"264","ATAQUE":"12","DEFENSA":"0","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Forest Spider","NIVEL":"1","INDICE":"5","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"264","ATAQUE":"12","DEFENSA":"0","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Gnoll","NIVEL":"1","INDICE":"6","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"264","ATAQUE":"12","DEFENSA":"0","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Kobold","NIVEL":"1","INDICE":"7","ZONA":"CUEVA","RANGO":"false","PUNTOSBATALLA":"264","ATAQUE":"12","DEFENSA":"0","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Makrura Prawn","NIVEL":"1","INDICE":"8","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"374","ATAQUE":"12","DEFENSA":"6","VIDA":"170","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Mur'gul Cliffrunner","NIVEL":"1","INDICE":"9","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"324","ATAQUE":"12","DEFENSA":"2","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Murloc Tiderunner","NIVEL":"1","INDICE":"10","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"263","ATAQUE":"11","DEFENSA":"0","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Razormane Scout","NIVEL":"1","INDICE":"11","ZONA":"CUEVA","RANGO":"false","PUNTOSBATALLA":"264","ATAQUE":"12","DEFENSA":"0","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Satyr","NIVEL":"1","INDICE":"12","ZONA":"CUEVA","RANGO":"false","PUNTOSBATALLA":"264","ATAQUE":"12","DEFENSA":"0","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Sludge Minion","NIVEL":"1","INDICE":"13","ZONA":"CEMENTERIO","RANGO":"false","PUNTOSBATALLA":"334","ATAQUE":"12","DEFENSA":"2","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"10","ATURDIR":"0"},
                {"NOMBRE":"Spider","NIVEL":"1","INDICE":"14","ZONA":"CEMENTERIO","RANGO":"false","PUNTOSBATALLA":"264","ATAQUE":"12","DEFENSA":"0","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Spider Crab Shorecrawler","NIVEL":"1","INDICE":"15","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"264","ATAQUE":"12","DEFENSA":"0","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Spiderling","NIVEL":"1","INDICE":"16","ZONA":"CUEVA","RANGO":"false","PUNTOSBATALLA":"264","ATAQUE":"12","DEFENSA":"0","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Summoned Prawn","NIVEL":"1","INDICE":"17","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"374","ATAQUE":"12","DEFENSA":"6","VIDA":"170","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Apprentice Wizard","NIVEL":"1","INDICE":"18","ZONA":"PUEBLO","RANGO":"true","PUNTOSBATALLA":"201","ATAQUE":"11","DEFENSA":"0","VIDA":"180","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Barbed Arachnathid (Creep)","NIVEL":"1","INDICE":"19","ZONA":"CUEVA","RANGO":"true","PUNTOSBATALLA":"255","ATAQUE":"16","DEFENSA":"1","VIDA":"200","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Barbed Arachnathid (Mercenary)","NIVEL":"1","INDICE":"20","ZONA":"CUEVA","RANGO":"true","PUNTOSBATALLA":"405","ATAQUE":"16","DEFENSA":"1","VIDA":"200","REGENERACION":"5.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Fallen Priest","NIVEL":"1","INDICE":"21","ZONA":"PUEBLO","RANGO":"true","PUNTOSBATALLA":"261","ATAQUE":"11","DEFENSA":"0","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Gnoll Poacher","NIVEL":"1","INDICE":"22","ZONA":"BOSQUE","RANGO":"true","PUNTOSBATALLA":"264","ATAQUE":"16","DEFENSA":"0","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Lesser Voidwalker","NIVEL":"1","INDICE":"23","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"279","ATAQUE":"16","DEFENSA":"0","VIDA":"240","REGENERACION":"1","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Quillboar","NIVEL":"1","INDICE":"24","ZONA":"DESIERTO","RANGO":"true","PUNTOSBATALLA":"264","ATAQUE":"16","DEFENSA":"0","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Satyr Trickster","NIVEL":"1","INDICE":"25","ZONA":"BOSQUE","RANGO":"true","PUNTOSBATALLA":"261","ATAQUE":"11","DEFENSA":"0","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Sea Turtle Hatchling","NIVEL":"1","INDICE":"26","ZONA":"PLAYA","RANGO":"true","PUNTOSBATALLA":"245","ATAQUE":"16","DEFENSA":"0","VIDA":"220","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Skeleton Archer","NIVEL":"1","INDICE":"27","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"214","ATAQUE":"16","DEFENSA":"0","VIDA":"190","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Stormreaver Apprentice","NIVEL":"1","INDICE":"28","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"297","ATAQUE":"21","DEFENSA":"1","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Harpy Scout","NIVEL":"1","INDICE":"29","ZONA":"DESIERTO","RANGO":"true","PUNTOSBATALLA":"231","ATAQUE":"11","DEFENSA":"0","VIDA":"210","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Centaur Drudge","NIVEL":"2","INDICE":"30","ZONA":"DESIERTO","RANGO":"false","PUNTOSBATALLA":"325","ATAQUE":"14","DEFENSA":"0","VIDA":"300","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Draenei Protector","NIVEL":"2","INDICE":"31","ZONA":"CEMENTERIO","RANGO":"false","PUNTOSBATALLA":"380","ATAQUE":"14","DEFENSA":"1","VIDA":"325","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Felguard","NIVEL":"2","INDICE":"32","ZONA":"INFIERNO","RANGO":"false","PUNTOSBATALLA":"359","ATAQUE":"19.5","DEFENSA":"1","VIDA":"300","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Frost Wolf","NIVEL":"2","INDICE":"33","ZONA":"TUNDRA","RANGO":"false","PUNTOSBATALLA":"325","ATAQUE":"14","DEFENSA":"0","VIDA":"300","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Makrura Pooldweller","NIVEL":"2","INDICE":"34","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"415","ATAQUE":"14","DEFENSA":"6","VIDA":"210","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Mud Golem","NIVEL":"2","INDICE":"35","ZONA":"MONTA�A","RANGO":"false","PUNTOSBATALLA":"325","ATAQUE":"14","DEFENSA":"2","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"}
                ,
                {"NOMBRE":"Murloc Huntsman","NIVEL":"2","INDICE":"36","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"323","ATAQUE":"11","DEFENSA":"0","VIDA":"300","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Murloc Plaguebearer","NIVEL":"2","INDICE":"37","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"205","ATAQUE":"13","DEFENSA":"0","VIDA":"180","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Sea Turtle","NIVEL":"2","INDICE":"38","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"425","ATAQUE":"13","DEFENSA":"5","VIDA":"250","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Spirit Pig","NIVEL":"2","INDICE":"39","ZONA":"DESIERTO","RANGO":"false","PUNTOSBATALLA":"228","ATAQUE":"13","DEFENSA":"0","VIDA":"200","REGENERACION":"0.5","CADENCIA":"1","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Timber Wolf","NIVEL":"2","INDICE":"40","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"325","ATAQUE":"14","DEFENSA":"0","VIDA":"300","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Tuskarr Fighter","NIVEL":"2","INDICE":"41","ZONA":"TUNDRA","RANGO":"false","PUNTOSBATALLA":"307","ATAQUE":"16","DEFENSA":"1","VIDA":"250","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Unbroken Darkhunter","NIVEL":"2","INDICE":"42","ZONA":"CEMENTERIO","RANGO":"false","PUNTOSBATALLA":"307","ATAQUE":"16","DEFENSA":"1","VIDA":"250","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Brigand","NIVEL":"2","INDICE":"43","ZONA":"PUEBLO","RANGO":"true","PUNTOSBATALLA":"328","ATAQUE":"21","DEFENSA":"0","VIDA":"300","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Centaur Archer","NIVEL":"2","INDICE":"44","ZONA":"DESIERTO","RANGO":"true","PUNTOSBATALLA":"328","ATAQUE":"21","DEFENSA":"0","VIDA":"300","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Dark Troll","NIVEL":"2","INDICE":"45","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"328","ATAQUE":"21","DEFENSA":"0","VIDA":"300","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Dark Troll Shadow Priest","NIVEL":"2","INDICE":"46","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"269","ATAQUE":"25","DEFENSA":"0","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Draenei Disciple","NIVEL":"2","INDICE":"47","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"310","ATAQUE":"27","DEFENSA":"0","VIDA":"280","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Forest Troll","NIVEL":"2","INDICE":"48","ZONA":"BOSQUE","RANGO":"true","PUNTOSBATALLA":"328","ATAQUE":"21","DEFENSA":"0","VIDA":"300","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Forest Troll Shadow Priest","NIVEL":"2","INDICE":"49","ZONA":"BOSQUE","RANGO":"true","PUNTOSBATALLA":"269","ATAQUE":"25","DEFENSA":"0","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Ice Troll","NIVEL":"2","INDICE":"50","ZONA":"TUNDRA","RANGO":"true","PUNTOSBATALLA":"328","ATAQUE":"21","DEFENSA":"0","VIDA":"300","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Ice Troll Priest","NIVEL":"2","INDICE":"51","ZONA":"TUNDRA","RANGO":"true","PUNTOSBATALLA":"269","ATAQUE":"25","DEFENSA":"0","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Lightning Lizard","NIVEL":"2","INDICE":"52","ZONA":"BOSQUE","RANGO":"true","PUNTOSBATALLA":"310","ATAQUE":"23","DEFENSA":"0","VIDA":"280","REGENERACION":"0.5","CADENCIA":"1.5","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Makrura Tidecaller","NIVEL":"2","INDICE":"53","ZONA":"PLAYA","RANGO":"true","PUNTOSBATALLA":"538","ATAQUE":"21","DEFENSA":"9","VIDA":"240","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Mur'gul Blood-Gill","NIVEL":"2","INDICE":"54","ZONA":"PLAYA","RANGO":"true","PUNTOSBATALLA":"388","ATAQUE":"21","DEFENSA":"2","VIDA":"300","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Reef Elemental","NIVEL":"2","INDICE":"55","ZONA":"PLAYA","RANGO":"true","PUNTOSBATALLA":"388","ATAQUE":"21","DEFENSA":"2","VIDA":"300","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Tuskarr Spearman","NIVEL":"2","INDICE":"56","ZONA":"TUNDRA","RANGO":"true","PUNTOSBATALLA":"331","ATAQUE":"28","DEFENSA":"0","VIDA":"300","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Battle Golem","NIVEL":"3","INDICE":"57","ZONA":"PUEBLO","RANGO":"false","PUNTOSBATALLA":"525","ATAQUE":"13","DEFENSA":"0","VIDA":"500","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Blue Dragonspawn Meddler","NIVEL":"3","INDICE":"58","ZONA":"PUEBLO","RANGO":"false","PUNTOSBATALLA":"440","ATAQUE":"14","DEFENSA":"1","VIDA":"370","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"15","ATURDIR":"0"},
                {"NOMBRE":"Draenei Watcher","NIVEL":"3","INDICE":"59","ZONA":"CEMENTERIO","RANGO":"false","PUNTOSBATALLA":"457","ATAQUE":"16","DEFENSA":"1","VIDA":"400","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Fel Beast","NIVEL":"3","INDICE":"60","ZONA":"INFIERNO","RANGO":"false","PUNTOSBATALLA":"453","ATAQUE":"24","DEFENSA":"1","VIDA":"390","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Fire Revenant","NIVEL":"3","INDICE":"61","ZONA":"CEMENTERIO","RANGO":"false","PUNTOSBATALLA":"374","ATAQUE":"26","DEFENSA":"0","VIDA":"340","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Giant Skeleton Warrior","NIVEL":"3","INDICE":"62","ZONA":"CEMENTERIO","RANGO":"false","PUNTOSBATALLA":"525","ATAQUE":"19","DEFENSA":"4","VIDA":"380","REGENERACION":"0.5","CADENCIA":"2","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Gnoll Brute","NIVEL":"3","INDICE":"63","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"457","ATAQUE":"16","DEFENSA":"1","VIDA":"400","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Jungle Stalker","NIVEL":"3","INDICE":"64","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"427","ATAQUE":"16","DEFENSA":"0","VIDA":"400","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Kobold Tunneler","NIVEL":"3","INDICE":"65","ZONA":"MONTA�A","RANGO":"false","PUNTOSBATALLA":"397","ATAQUE":"16","DEFENSA":"1","VIDA":"325","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"15"}
                ,
                {"NOMBRE":"Mammoth","NIVEL":"3","INDICE":"66","ZONA":"MONTA�A","RANGO":"false","PUNTOSBATALLA":"478","ATAQUE":"17","DEFENSA":"0","VIDA":"450","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"}
                ,
                {"NOMBRE":"Mur'gul Tidewarrior","NIVEL":"3","INDICE":"67","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"457","ATAQUE":"16","DEFENSA":"1","VIDA":"400","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Murloc Flesheater","NIVEL":"3","INDICE":"68","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"741","ATAQUE":"15","DEFENSA":"1","VIDA":"400","REGENERACION":"10","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Murloc Nightcrawler","NIVEL":"3","INDICE":"69","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"455","ATAQUE":"14","DEFENSA":"1","VIDA":"400","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Ogre Warrior","NIVEL":"3","INDICE":"70","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"457","ATAQUE":"16","DEFENSA":"1","VIDA":"400","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Poison Treant","NIVEL":"3","INDICE":"71","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"330","ATAQUE":"34","DEFENSA":"0","VIDA":"290","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Razormane Brute","NIVEL":"3","INDICE":"72","ZONA":"DESIERTO","RANGO":"false","PUNTOSBATALLA":"457","ATAQUE":"16","DEFENSA":"1","VIDA":"400","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Revenant of the Tides","NIVEL":"3","INDICE":"73","ZONA":"CEMENTERIO","RANGO":"false","PUNTOSBATALLA":"462","ATAQUE":"16","DEFENSA":"2","VIDA":"375","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Rogue","NIVEL":"3","INDICE":"74","ZONA":"PUEBLO","RANGO":"false","PUNTOSBATALLA":"457","ATAQUE":"16","DEFENSA":"1","VIDA":"400","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Sea Giant","NIVEL":"3","INDICE":"75","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"398","ATAQUE":"20","DEFENSA":"0","VIDA":"350","REGENERACION":"0.5","CADENCIA":"1.5","CRITICO":"20","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Skeletal Orc","NIVEL":"3","INDICE":"76","ZONA":"CEMENTERIO","RANGO":"false","PUNTOSBATALLA":"462","ATAQUE":"16","DEFENSA":"2","VIDA":"375","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Spider Crab Limbripper","NIVEL":"3","INDICE":"77","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"457","ATAQUE":"16","DEFENSA":"1","VIDA":"400","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Succubus","NIVEL":"3","INDICE":"78","ZONA":"INFIERNO","RANGO":"false","PUNTOSBATALLA":"428","ATAQUE":"18","DEFENSA":"0","VIDA":"400","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Tuskarr Healer","NIVEL":"3","INDICE":"79","ZONA":"TUNDRA","RANGO":"false","PUNTOSBATALLA":"331","ATAQUE":"28","DEFENSA":"0","VIDA":"300","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Warrior Arachnathid","NIVEL":"3","INDICE":"80","ZONA":"CUEVA","RANGO":"false","PUNTOSBATALLA":"462","ATAQUE":"16","DEFENSA":"2","VIDA":"375","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Burning Archer","NIVEL":"3","INDICE":"81","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"340","ATAQUE":"40","DEFENSA":"0","VIDA":"300","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Dark Troll Trapper","NIVEL":"3","INDICE":"82","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"404","ATAQUE":"30","DEFENSA":"1","VIDA":"340","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Deceiver","NIVEL":"3","INDICE":"83","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"361","ATAQUE":"28","DEFENSA":"0","VIDA":"300","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"30","ATURDIR":"0"},
                {"NOMBRE":"Forest Troll Trapper","NIVEL":"3","INDICE":"84","ZONA":"BOSQUE","RANGO":"true","PUNTOSBATALLA":"461","ATAQUE":"26","DEFENSA":"1","VIDA":"400","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Ghost","NIVEL":"3","INDICE":"85","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"331","ATAQUE":"28","DEFENSA":"0","VIDA":"300","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Gnoll Assassin","NIVEL":"3","INDICE":"86","ZONA":"BOSQUE","RANGO":"true","PUNTOSBATALLA":"385","ATAQUE":"32","DEFENSA":"1","VIDA":"320","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Gnoll Warden","NIVEL":"3","INDICE":"87","ZONA":"BOSQUE","RANGO":"true","PUNTOSBATALLA":"364","ATAQUE":"30","DEFENSA":"0","VIDA":"330","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Hydra Hatchling","NIVEL":"3","INDICE":"88","ZONA":"BOSQUE","RANGO":"true","PUNTOSBATALLA":"546","ATAQUE":"26","DEFENSA":"2","VIDA":"350","REGENERACION":"4","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Ice Troll Trapper","NIVEL":"3","INDICE":"89","ZONA":"TUNDRA","RANGO":"true","PUNTOSBATALLA":"461","ATAQUE":"26","DEFENSA":"1","VIDA":"400","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Kobold Geomancer","NIVEL":"3","INDICE":"90","ZONA":"CUEVA","RANGO":"true","PUNTOSBATALLA":"391","ATAQUE":"28","DEFENSA":"2","VIDA":"300","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Quillboar Hunter","NIVEL":"3","INDICE":"91","ZONA":"DESIERTO","RANGO":"true","PUNTOSBATALLA":"451","ATAQUE":"26","DEFENSA":"1","VIDA":"375","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"15","ATURDIR":"0"},
                {"NOMBRE":"Rogue Wizard","NIVEL":"3","INDICE":"92","ZONA":"PUEBLO","RANGO":"true","PUNTOSBATALLA":"461","ATAQUE":"28","DEFENSA":"3","VIDA":"340","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Salamander Hatchling","NIVEL":"3","INDICE":"93","ZONA":"DESIERTO","RANGO":"true","PUNTOSBATALLA":"461","ATAQUE":"29","DEFENSA":"1","VIDA":"400","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Satyr Shadowdancer","NIVEL":"3","INDICE":"94","ZONA":"BOSQUE","RANGO":"true","PUNTOSBATALLA":"401","ATAQUE":"28","DEFENSA":"0","VIDA":"340","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"30","ATURDIR":"0"},
                {"NOMBRE":"Skeletal Marksman","NIVEL":"3","INDICE":"95","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"334","ATAQUE":"30","DEFENSA":"0","VIDA":"300","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Sludge Flinger","NIVEL":"3","INDICE":"96","ZONA":"CUEVA","RANGO":"true","PUNTOSBATALLA":"431","ATAQUE":"28","DEFENSA":"2","VIDA":"340","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Spitting Spider","NIVEL":"3","INDICE":"97","ZONA":"CUEVA","RANGO":"true","PUNTOSBATALLA":"464","ATAQUE":"35","DEFENSA":"1","VIDA":"400","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Stormreaver Hermit","NIVEL":"3","INDICE":"98","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"429","ATAQUE":"26","DEFENSA":"2","VIDA":"340","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Voidwalker","NIVEL":"3","INDICE":"99","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"413","ATAQUE":"28","DEFENSA":"0","VIDA":"365","REGENERACION":"1","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Black Dragon Whelp","NIVEL":"3","INDICE":"100","ZONA":"INFIERNO","RANGO":"true","PUNTOSBATALLA":"403","ATAQUE":"33","DEFENSA":"1","VIDA":"340","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Blue Dragon Whelp","NIVEL":"3","INDICE":"101","ZONA":"INFIERNO","RANGO":"true","PUNTOSBATALLA":"402","ATAQUE":"31","DEFENSA":"1","VIDA":"340","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Bronze Dragon Whelp","NIVEL":"3","INDICE":"102","ZONA":"INFIERNO","RANGO":"true","PUNTOSBATALLA":"403","ATAQUE":"33","DEFENSA":"1","VIDA":"340","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Green Dragon Whelp","NIVEL":"3","INDICE":"103","ZONA":"INFIERNO","RANGO":"true","PUNTOSBATALLA":"403","ATAQUE":"33","DEFENSA":"1","VIDA":"340","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Harpy Rogue","NIVEL":"3","INDICE":"104","ZONA":"DESIERTO","RANGO":"true","PUNTOSBATALLA":"401","ATAQUE":"26","DEFENSA":"1","VIDA":"340","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Harpy Windwitch","NIVEL":"3","INDICE":"105","ZONA":"DESIERTO","RANGO":"true","PUNTOSBATALLA":"313","ATAQUE":"33","DEFENSA":"0","VIDA":"280","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Nether Dragon Hatchling","NIVEL":"3","INDICE":"106","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"403","ATAQUE":"33","DEFENSA":"1","VIDA":"340","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Red Dragon Whelp","NIVEL":"3","INDICE":"107","ZONA":"INFIERNO","RANGO":"true","PUNTOSBATALLA":"463","ATAQUE":"33","DEFENSA":"1","VIDA":"400","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Nerubian Warrior","NIVEL":"4","INDICE":"108","ZONA":"CUEVA","RANGO":"false","PUNTOSBATALLA":"955","ATAQUE":"40","DEFENSA":"1","VIDA":"880","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Bloodfiend","NIVEL":"4","INDICE":"109","ZONA":"INFIERNO","RANGO":"false","PUNTOSBATALLA":"517","ATAQUE":"40","DEFENSA":"1","VIDA":"450","REGENERACION":"0.25","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Blue Dragonspawn Apprentice","NIVEL":"4","INDICE":"110","ZONA":"PUEBLO","RANGO":"false","PUNTOSBATALLA":"1284","ATAQUE":"35","DEFENSA":"0","VIDA":"350","REGENERACION":"30","CADENCIA":"1.8","CRITICO":"0","EVASION":"15","ATURDIR":"0"},
                {"NOMBRE":"Centaur Outrunner","NIVEL":"4","INDICE":"111","ZONA":"DESIERTO","RANGO":"false","PUNTOSBATALLA":"641","ATAQUE":"22","DEFENSA":"2","VIDA":"550","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Frost Revenant","NIVEL":"4","INDICE":"112","ZONA":"CEMENTERIO","RANGO":"false","PUNTOSBATALLA":"525","ATAQUE":"41","DEFENSA":"1","VIDA":"450","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Furbolg","NIVEL":"4","INDICE":"113","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"641","ATAQUE":"22","DEFENSA":"2","VIDA":"550","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Giant Frost Wolf","NIVEL":"4","INDICE":"114","ZONA":"TUNDRA","RANGO":"false","PUNTOSBATALLA":"661","ATAQUE":"22","DEFENSA":"2","VIDA":"550","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"20","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Giant Spider","NIVEL":"4","INDICE":"115","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"613","ATAQUE":"24","DEFENSA":"1","VIDA":"550","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Giant Wolf","NIVEL":"4","INDICE":"116","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"661","ATAQUE":"22","DEFENSA":"2","VIDA":"550","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"20","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Pandaren","NIVEL":"4","INDICE":"117","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"641","ATAQUE":"22","DEFENSA":"2","VIDA":"550","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Polar Bear","NIVEL":"4","INDICE":"118","ZONA":"TUNDRA","RANGO":"false","PUNTOSBATALLA":"569","ATAQUE":"26","DEFENSA":"2","VIDA":"475","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Polar Furbolg","NIVEL":"4","INDICE":"119","ZONA":"TUNDRA","RANGO":"false","PUNTOSBATALLA":"641","ATAQUE":"22","DEFENSA":"2","VIDA":"550","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Tuskarr Warrior","NIVEL":"4","INDICE":"120","ZONA":"TUNDRA","RANGO":"false","PUNTOSBATALLA":"539","ATAQUE":"26","DEFENSA":"1","VIDA":"475","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Unbroken Rager","NIVEL":"4","INDICE":"121","ZONA":"CUEVA","RANGO":"false","PUNTOSBATALLA":"539","ATAQUE":"26","DEFENSA":"1","VIDA":"475","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Wendigo","NIVEL":"4","INDICE":"122","ZONA":"TUNDRA","RANGO":"false","PUNTOSBATALLA":"641","ATAQUE":"22","DEFENSA":"2","VIDA":"550","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Wildkin","NIVEL":"4","INDICE":"123","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"642","ATAQUE":"23","DEFENSA":"2","VIDA":"550","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Nerubian Webspinner","NIVEL":"4","INDICE":"124","ZONA":"CUEVA","RANGO":"true","PUNTOSBATALLA":"786","ATAQUE":"42","DEFENSA":"1","VIDA":"700","REGENERACION":"1","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Arachnathid Earth-borer","NIVEL":"4","INDICE":"125","ZONA":"DESIERTO","RANGO":"true","PUNTOSBATALLA":"508","ATAQUE":"52","DEFENSA":"2","VIDA":"400","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Assassin","NIVEL":"4","INDICE":"126","ZONA":"PUEBLO","RANGO":"true","PUNTOSBATALLA":"516","ATAQUE":"33","DEFENSA":"1","VIDA":"450","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Centaur Impaler","NIVEL":"4","INDICE":"127","ZONA":"DESIERTO","RANGO":"true","PUNTOSBATALLA":"421","ATAQUE":"41","DEFENSA":"1","VIDA":"350","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Dark Troll Berserker","NIVEL":"4","INDICE":"128","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"519","ATAQUE":"38","DEFENSA":"1","VIDA":"450","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Dark Troll High Priest","NIVEL":"4","INDICE":"129","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"483","ATAQUE":"33","DEFENSA":"0","VIDA":"450","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Draenei Harbinger","NIVEL":"4","INDICE":"130","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"497","ATAQUE":"35","DEFENSA":"0","VIDA":"450","REGENERACION":"0.5","CADENCIA":"1.08","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Enraged Elemental","NIVEL":"4","INDICE":"131","ZONA":"PLAYA","RANGO":"true","PUNTOSBATALLA":"639","ATAQUE":"26","DEFENSA":"2","VIDA":"550","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Eredar Sorcerer","NIVEL":"4","INDICE":"132","ZONA":"INFIERNO","RANGO":"true","PUNTOSBATALLA":"476","ATAQUE":"38","DEFENSA":"0","VIDA":"425","REGENERACION":"1","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Forest Troll Berserker","NIVEL":"4","INDICE":"133","ZONA":"BOSQUE","RANGO":"true","PUNTOSBATALLA":"519","ATAQUE":"38","DEFENSA":"1","VIDA":"450","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Forest Troll High Priest","NIVEL":"4","INDICE":"134","ZONA":"BOSQUE","RANGO":"true","PUNTOSBATALLA":"633","ATAQUE":"33","DEFENSA":"5","VIDA":"450","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Furbolg Shaman","NIVEL":"4","INDICE":"135","ZONA":"BOSQUE","RANGO":"true","PUNTOSBATALLA":"1468","ATAQUE":"33","DEFENSA":"0","VIDA":"550","REGENERACION":"30","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Giant Sea Turtle","NIVEL":"4","INDICE":"136","ZONA":"PLAYA","RANGO":"true","PUNTOSBATALLA":"624","ATAQUE":"38","DEFENSA":"7","VIDA":"375","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Ice Troll Berserker","NIVEL":"4","INDICE":"137","ZONA":"TUNDRA","RANGO":"true","PUNTOSBATALLA":"519","ATAQUE":"38","DEFENSA":"1","VIDA":"450","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Ice Troll High Priest","NIVEL":"4","INDICE":"138","ZONA":"TUNDRA","RANGO":"true","PUNTOSBATALLA":"573","ATAQUE":"33","DEFENSA":"3","VIDA":"450","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Mur'gul Snarecaster","NIVEL":"4","INDICE":"139","ZONA":"PLAYA","RANGO":"true","PUNTOSBATALLA":"531","ATAQUE":"38","DEFENSA":"4","VIDA":"375","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Polar Furbolg Shaman","NIVEL":"4","INDICE":"140","ZONA":"TUNDRA","RANGO":"true","PUNTOSBATALLA":"673","ATAQUE":"33","DEFENSA":"3","VIDA":"550","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Tuskarr Trapper","NIVEL":"4","INDICE":"141","ZONA":"TUNDRA","RANGO":"true","PUNTOSBATALLA":"542","ATAQUE":"35","DEFENSA":"1","VIDA":"475","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Blue Dragonspawn Warrior","NIVEL":"5","INDICE":"142","ZONA":"PUEBLO","RANGO":"false","PUNTOSBATALLA":"856","ATAQUE":"28","DEFENSA":"1","VIDA":"775","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"15","ATURDIR":"0"},
                {"NOMBRE":"Draenei Darkslayer","NIVEL":"5","INDICE":"143","ZONA":"CEMENTERIO","RANGO":"false","PUNTOSBATALLA":"564","ATAQUE":"32","DEFENSA":"0","VIDA":"525","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Enforcer","NIVEL":"5","INDICE":"144","ZONA":"PUEBLO","RANGO":"false","PUNTOSBATALLA":"586","ATAQUE":"35","DEFENSA":"1","VIDA":"500","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"15","ATURDIR":"0"},
                {"NOMBRE":"Fel Stalker","NIVEL":"5","INDICE":"145","ZONA":"INFIERNO","RANGO":"false","PUNTOSBATALLA":"894","ATAQUE":"52","DEFENSA":"3","VIDA":"750","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Gnoll Overseer","NIVEL":"5","INDICE":"146","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"878","ATAQUE":"31","DEFENSA":"3","VIDA":"750","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Icetusk Mammoth","NIVEL":"5","INDICE":"147","ZONA":"TUNDRA","RANGO":"false","PUNTOSBATALLA":"991","ATAQUE":"28","DEFENSA":"1","VIDA":"925","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Kobold Taskmaster","NIVEL":"5","INDICE":"148","ZONA":"CUEVA","RANGO":"false","PUNTOSBATALLA":"793","ATAQUE":"31","DEFENSA":"3","VIDA":"650","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"15"},
                {"NOMBRE":"Magnataur Warrior","NIVEL":"5","INDICE":"149","ZONA":"CUEVA","RANGO":"false","PUNTOSBATALLA":"996","ATAQUE":"31","DEFENSA":"2","VIDA":"900","REGENERACION":"0.5","CADENCIA":"1.5","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Makrura Snapper","NIVEL":"5","INDICE":"150","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"838","ATAQUE":"31","DEFENSA":"6","VIDA":"620","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Ogre Magi","NIVEL":"5","INDICE":"151","ZONA":"PUEBLO","RANGO":"false","PUNTOSBATALLA":"680","ATAQUE":"28","DEFENSA":"1","VIDA":"600","REGENERACION":"0.5","CADENCIA":"0.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Ogre Mauler","NIVEL":"5","INDICE":"152","ZONA":"PUEBLO","RANGO":"false","PUNTOSBATALLA":"976","ATAQUE":"28","DEFENSA":"3","VIDA":"850","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Overlord Arachnathid","NIVEL":"5","INDICE":"153","ZONA":"CUEVA","RANGO":"false","PUNTOSBATALLA":"848","ATAQUE":"31","DEFENSA":"2","VIDA":"750","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Plague Treant","NIVEL":"5","INDICE":"154","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"681","ATAQUE":"48","DEFENSA":"1","VIDA":"600","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Revenant of the Seas","NIVEL":"5","INDICE":"155","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"996","ATAQUE":"28","DEFENSA":"2","VIDA":"900","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Sasquatch","NIVEL":"5","INDICE":"156","ZONA":"TUNDRA","RANGO":"false","PUNTOSBATALLA":"876","ATAQUE":"28","DEFENSA":"3","VIDA":"750","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Sea Giant Hunter","NIVEL":"5","INDICE":"157","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"776","ATAQUE":"24","DEFENSA":"0","VIDA":"725","REGENERACION":"0.5","CADENCIA":"1.5","CRITICO":"20","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Skeletal Orc Grunt","NIVEL":"5","INDICE":"158","ZONA":"CEMENTERIO","RANGO":"false","PUNTOSBATALLA":"976","ATAQUE":"28","DEFENSA":"3","VIDA":"850","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Sludge Monstrosity","NIVEL":"5","INDICE":"159","ZONA":"CUEVA","RANGO":"false","PUNTOSBATALLA":"726","ATAQUE":"28","DEFENSA":"3","VIDA":"600","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Spider Crab Behemoth","NIVEL":"5","INDICE":"160","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"974","ATAQUE":"28","DEFENSA":"3","VIDA":"850","REGENERACION":"0.5","CADENCIA":"1.5","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Unbroken Darkweaver","NIVEL":"5","INDICE":"161","ZONA":"CEMENTERIO","RANGO":"false","PUNTOSBATALLA":"680","ATAQUE":"28","DEFENSA":"1","VIDA":"550","REGENERACION":"0.5","CADENCIA":"0.33","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Centaur Sorcerer","NIVEL":"5","INDICE":"162","ZONA":"TUNDRA","RANGO":"true","PUNTOSBATALLA":"681","ATAQUE":"38","DEFENSA":"1","VIDA":"600","REGENERACION":"1","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Infernal Contraption","NIVEL":"5","INDICE":"163","ZONA":"INFIERNO","RANGO":"true","PUNTOSBATALLA":"696","ATAQUE":"34","DEFENSA":"2","VIDA":"600","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Renegade Wizard","NIVEL":"5","INDICE":"164","ZONA":"PUEBLO","RANGO":"true","PUNTOSBATALLA":"678","ATAQUE":"60","DEFENSA":"1","VIDA":"600","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Salamander","NIVEL":"5","INDICE":"165","ZONA":"DESIERTO","RANGO":"true","PUNTOSBATALLA":"688","ATAQUE":"60","DEFENSA":"1","VIDA":"600","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"10"},
                {"NOMBRE":"Sea Elemental","NIVEL":"5","INDICE":"166","ZONA":"PLAYA","RANGO":"true","PUNTOSBATALLA":"661","ATAQUE":"38","DEFENSA":"2","VIDA":"550","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"15"},
                {"NOMBRE":"Tuskarr Sorcerer","NIVEL":"5","INDICE":"167","ZONA":"TUNDRA","RANGO":"true","PUNTOSBATALLA":"665","ATAQUE":"45","DEFENSA":"5","VIDA":"475","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Vile Tormentor","NIVEL":"5","INDICE":"168","ZONA":"INFIERNO","RANGO":"true","PUNTOSBATALLA":"549","ATAQUE":"38","DEFENSA":"0","VIDA":"510","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Harpy Storm-hag","NIVEL":"5","INDICE":"169","ZONA":"DESIERTO","RANGO":"true","PUNTOSBATALLA":"696","ATAQUE":"38","DEFENSA":"1","VIDA":"600","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"30","ATURDIR":"0"},
                {"NOMBRE":"Nerubian Spider Lord","NIVEL":"6","INDICE":"170","ZONA":"CUEVA","RANGO":"false","PUNTOSBATALLA":"1434","ATAQUE":"52","DEFENSA":"5","VIDA":"1230","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Razormane Medicine Man","NIVEL":"6","INDICE":"171","ZONA":"DESIERTO","RANGO":"false","PUNTOSBATALLA":"1490","ATAQUE":"54","DEFENSA":"3","VIDA":"1000","REGENERACION":"12","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Satyr Soulstealer","NIVEL":"6","INDICE":"172","ZONA":"CEMENTERIO","RANGO":"false","PUNTOSBATALLA":"1214","ATAQUE":"80","DEFENSA":"6","VIDA":"960","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Blue Dragonspawn Sorcerer","NIVEL":"6","INDICE":"173","ZONA":"PUEBLO","RANGO":"false","PUNTOSBATALLA":"798","ATAQUE":"45","DEFENSA":"2","VIDA":"675","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"15","ATURDIR":"0"},
                {"NOMBRE":"Dire Frost Wolf","NIVEL":"6","INDICE":"174","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"877","ATAQUE":"43","DEFENSA":"2","VIDA":"750","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"20","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Dire Wolf (Creep)","NIVEL":"6","INDICE":"175","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"877","ATAQUE":"43","DEFENSA":"2","VIDA":"750","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"20","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Elder Jungle Stalker","NIVEL":"6","INDICE":"176","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"975","ATAQUE":"41","DEFENSA":"1","VIDA":"900","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Elder Wendigo","NIVEL":"6","INDICE":"177","ZONA":"TUNDRA","RANGO":"false","PUNTOSBATALLA":"1095","ATAQUE":"34","DEFENSA":"3","VIDA":"950","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"15"},
                {"NOMBRE":"Enraged Wildkin","NIVEL":"6","INDICE":"178","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"1080","ATAQUE":"34","DEFENSA":"3","VIDA":"950","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Faceless One Trickster","NIVEL":"6","INDICE":"179","ZONA":"CEMENTERIO","RANGO":"false","PUNTOSBATALLA":"805","ATAQUE":"34","DEFENSA":"2","VIDA":"675","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"30","ATURDIR":"0"},
                {"NOMBRE":"Furbolg Tracker","NIVEL":"6","INDICE":"180","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"1054","ATAQUE":"39","DEFENSA":"2","VIDA":"950","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Giant Polar Bear","NIVEL":"6","INDICE":"181","ZONA":"TUNDRA","RANGO":"false","PUNTOSBATALLA":"1034","ATAQUE":"39","DEFENSA":"3","VIDA":"900","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Lightning Revenant","NIVEL":"6","INDICE":"182","ZONA":"CEMENTERIO","RANGO":"false","PUNTOSBATALLA":"858","ATAQUE":"44","DEFENSA":"2","VIDA":"750","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Mur'gul Marauder","NIVEL":"6","INDICE":"183","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"1102","ATAQUE":"37","DEFENSA":"2","VIDA":"1000","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Murloc Mutant","NIVEL":"6","INDICE":"184","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"997","ATAQUE":"30","DEFENSA":"7","VIDA":"750","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Overlord","NIVEL":"6","INDICE":"185","ZONA":"INFIERNO","RANGO":"false","PUNTOSBATALLA":"1246","ATAQUE":"45","DEFENSA":"11","VIDA":"875","REGENERACION":"0.25","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Polar Furbolg Tracker","NIVEL":"6","INDICE":"186","ZONA":"TUNDRA","RANGO":"false","PUNTOSBATALLA":"1110","ATAQUE":"34","DEFENSA":"4","VIDA":"950","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Rock Golem","NIVEL":"6","INDICE":"187","ZONA":"PUEBLO","RANGO":"false","PUNTOSBATALLA":"843","ATAQUE":"44","DEFENSA":"4","VIDA":"675","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Vile Temptress","NIVEL":"6","INDICE":"188","ZONA":"INFIERNO","RANGO":"false","PUNTOSBATALLA":"790","ATAQUE":"34","DEFENSA":"0","VIDA":"750","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"War Golem","NIVEL":"6","INDICE":"189","ZONA":"PUEBLO","RANGO":"false","PUNTOSBATALLA":"1160","ATAQUE":"34","DEFENSA":"4","VIDA":"1000","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Heretic","NIVEL":"6","INDICE":"190","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"1109","ATAQUE":"79","DEFENSA":"3","VIDA":"960","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Makrura Deepseer","NIVEL":"6","INDICE":"191","ZONA":"PLAYA","RANGO":"true","PUNTOSBATALLA":"1428","ATAQUE":"72","DEFENSA":"18","VIDA":"820","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Nerubian Seer","NIVEL":"6","INDICE":"192","ZONA":"CUEVA","RANGO":"true","PUNTOSBATALLA":"1108","ATAQUE":"69","DEFENSA":"3","VIDA":"960","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Dark Troll Warlord","NIVEL":"6","INDICE":"193","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"855","ATAQUE":"48","DEFENSA":"2","VIDA":"750","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Draenei Seer","NIVEL":"6","INDICE":"194","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"902","ATAQUE":"67","DEFENSA":"2","VIDA":"775","REGENERACION":"1","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Eredar Diabolist","NIVEL":"6","INDICE":"195","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"699","ATAQUE":"70","DEFENSA":"0","VIDA":"630","REGENERACION":"1","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Forest Troll Warlord","NIVEL":"6","INDICE":"196","ZONA":"BOSQUE","RANGO":"true","PUNTOSBATALLA":"855","ATAQUE":"48","DEFENSA":"2","VIDA":"750","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Greater Voidwalker","NIVEL":"6","INDICE":"197","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"904","ATAQUE":"55","DEFENSA":"3","VIDA":"750","REGENERACION":"1","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Hydra","NIVEL":"6","INDICE":"198","ZONA":"PLAYA","RANGO":"true","PUNTOSBATALLA":"1928","ATAQUE":"84","DEFENSA":"2","VIDA":"1275","REGENERACION":"18","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Ice Troll Warlord","NIVEL":"6","INDICE":"199","ZONA":"TUNDRA","RANGO":"true","PUNTOSBATALLA":"855","ATAQUE":"48","DEFENSA":"2","VIDA":"750","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Stormreaver Necrolyte","NIVEL":"6","INDICE":"200","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"801","ATAQUE":"55","DEFENSA":"2","VIDA":"675","REGENERACION":"0.5","CADENCIA":"1.08","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Thunder Lizard","NIVEL":"6","INDICE":"201","ZONA":"DESIERTO","RANGO":"true","PUNTOSBATALLA":"853","ATAQUE":"50","DEFENSA":"2","VIDA":"750","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Wraith","NIVEL":"6","INDICE":"202","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"818","ATAQUE":"42","DEFENSA":"0","VIDA":"750","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"30","ATURDIR":"0"},
                {"NOMBRE":"Black Drake","NIVEL":"6","INDICE":"203","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"1059","ATAQUE":"61","DEFENSA":"2","VIDA":"950","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Blue Drake","NIVEL":"6","INDICE":"204","ZONA":"TUNDRA","RANGO":"true","PUNTOSBATALLA":"1054","ATAQUE":"53","DEFENSA":"2","VIDA":"950","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Bronze Drake","NIVEL":"6","INDICE":"205","ZONA":"DESIERTO","RANGO":"true","PUNTOSBATALLA":"1059","ATAQUE":"61","DEFENSA":"2","VIDA":"950","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Green Drake","NIVEL":"6","INDICE":"206","ZONA":"BOSQUE","RANGO":"true","PUNTOSBATALLA":"1059","ATAQUE":"61","DEFENSA":"2","VIDA":"950","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Nether Drake","NIVEL":"6","INDICE":"207","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"1059","ATAQUE":"61","DEFENSA":"2","VIDA":"950","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Red Drake","NIVEL":"6","INDICE":"208","ZONA":"INFIERNO","RANGO":"true","PUNTOSBATALLA":"1060","ATAQUE":"63","DEFENSA":"2","VIDA":"950","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Brood Mother","NIVEL":"7","INDICE":"209","ZONA":"CUEVA","RANGO":"false","PUNTOSBATALLA":"1349","ATAQUE":"60","DEFENSA":"2","VIDA":"1230","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Elder Sasquatch","NIVEL":"7","INDICE":"210","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"1692","ATAQUE":"70","DEFENSA":"2","VIDA":"1550","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"15"},
                {"NOMBRE":"Bandit Lord","NIVEL":"7","INDICE":"211","ZONA":"PUEBLO","RANGO":"false","PUNTOSBATALLA":"1395","ATAQUE":"68","DEFENSA":"6","VIDA":"1150","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Fel Ravager","NIVEL":"7","INDICE":"212","ZONA":"INFIERNO","RANGO":"false","PUNTOSBATALLA":"1187","ATAQUE":"70","DEFENSA":"4","VIDA":"1000","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Furbolg Champion","NIVEL":"7","INDICE":"213","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"1165","ATAQUE":"68","DEFENSA":"5","VIDA":"950","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Gargantuan Sea Turtle","NIVEL":"7","INDICE":"214","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"1527","ATAQUE":"70","DEFENSA":"7","VIDA":"1250","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Makrura Tidal Lord","NIVEL":"7","INDICE":"215","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"1135","ATAQUE":"68","DEFENSA":"9","VIDA":"800","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Ogre Lord","NIVEL":"7","INDICE":"216","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"1202","ATAQUE":"77","DEFENSA":"6","VIDA":"950","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Polar Furbolg Champion","NIVEL":"7","INDICE":"217","ZONA":"TUNDRA","RANGO":"false","PUNTOSBATALLA":"1165","ATAQUE":"68","DEFENSA":"5","VIDA":"950","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Razormane Chieftain","NIVEL":"7","INDICE":"218","ZONA":"DESIERTO","RANGO":"false","PUNTOSBATALLA":"1120","ATAQUE":"88","DEFENSA":"3","VIDA":"950","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Sasquatch Oracle","NIVEL":"7","INDICE":"219","ZONA":"TUNDRA","RANGO":"false","PUNTOSBATALLA":"2003","ATAQUE":"85","DEFENSA":"3","VIDA":"950","REGENERACION":"30","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Tuskarr Chieftain","NIVEL":"7","INDICE":"220","ZONA":"TUNDRA","RANGO":"false","PUNTOSBATALLA":"1146","ATAQUE":"83","DEFENSA":"4","VIDA":"950","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Wendigo Shaman","NIVEL":"7","INDICE":"221","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"2003","ATAQUE":"85","DEFENSA":"3","VIDA":"950","REGENERACION":"30","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Elder Hydra","NIVEL":"7","INDICE":"222","ZONA":"PLAYA","RANGO":"true","PUNTOSBATALLA":"1346","ATAQUE":"73","DEFENSA":"0","VIDA":"850","REGENERACION":"15","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Furbolg Elder Shaman","NIVEL":"7","INDICE":"223","ZONA":"BOSQUE","RANGO":"true","PUNTOSBATALLA":"1984","ATAQUE":"80","DEFENSA":"3","VIDA":"950","REGENERACION":"30","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Mur'gul Shadowcaster","NIVEL":"7","INDICE":"224","ZONA":"PLAYA","RANGO":"true","PUNTOSBATALLA":"1338","ATAQUE":"60","DEFENSA":"7","VIDA":"1050","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"30","ATURDIR":"0"},
                {"NOMBRE":"Salamander Vizier","NIVEL":"7","INDICE":"225","ZONA":"INFIERNO","RANGO":"true","PUNTOSBATALLA":"1120","ATAQUE":"70","DEFENSA":"3","VIDA":"950","REGENERACION":"0.5","CADENCIA":"1.08","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Harpy Queen","NIVEL":"7","INDICE":"226","ZONA":"DESIERTO","RANGO":"true","PUNTOSBATALLA":"1738","ATAQUE":"50","DEFENSA":"2","VIDA":"750","REGENERACION":"30","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Berserk Wildkin","NIVEL":"8","INDICE":"227","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"1332","ATAQUE":"90","DEFENSA":"4","VIDA":"1100","REGENERACION":"1","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"15"},
                {"NOMBRE":"Blue Dragonspawn Overseer","NIVEL":"8","INDICE":"228","ZONA":"PUEBLO","RANGO":"false","PUNTOSBATALLA":"1217","ATAQUE":"91","DEFENSA":"4","VIDA":"1000","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"15","ATURDIR":"0"},
                {"NOMBRE":"Centaur Khan","NIVEL":"8","INDICE":"229","ZONA":"DESIERTO","RANGO":"false","PUNTOSBATALLA":"2022","ATAQUE":"97","DEFENSA":"4","VIDA":"1800","REGENERACION":"1","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Dire Mammoth","NIVEL":"8","INDICE":"230","ZONA":"INFIERNO","RANGO":"false","PUNTOSBATALLA":"1703","ATAQUE":"105","DEFENSA":"2","VIDA":"1550","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Furbolg Ursa Warrior","NIVEL":"8","INDICE":"231","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"1323","ATAQUE":"98","DEFENSA":"4","VIDA":"1100","REGENERACION":"1","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Ice Revenant","NIVEL":"8","INDICE":"232","ZONA":"TUNDRA","RANGO":"false","PUNTOSBATALLA":"1480","ATAQUE":"95","DEFENSA":"6","VIDA":"1200","REGENERACION":"1","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Infernal","NIVEL":"8","INDICE":"233","ZONA":"INFIERNO","RANGO":"false","PUNTOSBATALLA":"1786","ATAQUE":"102","DEFENSA":"6","VIDA":"1500","REGENERACION":"1","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Magnataur Reaver","NIVEL":"8","INDICE":"234","ZONA":"TUNDRA","RANGO":"false","PUNTOSBATALLA":"1653","ATAQUE":"105","DEFENSA":"2","VIDA":"1500","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Polar Furbolg Ursa Warrior","NIVEL":"8","INDICE":"235","ZONA":"TUNDRA","RANGO":"false","PUNTOSBATALLA":"1324","ATAQUE":"100","DEFENSA":"4","VIDA":"1100","REGENERACION":"1","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Sea Giant Behemoth","NIVEL":"8","INDICE":"236","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"1105","ATAQUE":"94","DEFENSA":"0","VIDA":"1000","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"20"},
                {"NOMBRE":"Skeletal Orc Champion","NIVEL":"8","INDICE":"237","ZONA":"CEMENTERIO","RANGO":"false","PUNTOSBATALLA":"1256","ATAQUE":"110","DEFENSA":"2","VIDA":"1100","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Nerubian Queen","NIVEL":"8","INDICE":"238","ZONA":"CUEVA","RANGO":"true","PUNTOSBATALLA":"1616","ATAQUE":"106","DEFENSA":"5","VIDA":"1310","REGENERACION":"3","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Berserk Elemental","NIVEL":"8","INDICE":"239","ZONA":"PLAYA","RANGO":"true","PUNTOSBATALLA":"1356","ATAQUE":"82","DEFENSA":"6","VIDA":"1100","REGENERACION":"1","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Dark Wizard","NIVEL":"8","INDICE":"240","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"1961","ATAQUE":"128","DEFENSA":"6","VIDA":"1560","REGENERACION":"5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Doom Guard (Creep)","NIVEL":"8","INDICE":"241","ZONA":"INFIERNO","RANGO":"true","PUNTOSBATALLA":"1683","ATAQUE":"105","DEFENSA":"8","VIDA":"1350","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Doom Guard (Summoned)","NIVEL":"8","INDICE":"242","ZONA":"INFIERNO","RANGO":"true","PUNTOSBATALLA":"1933","ATAQUE":"105","DEFENSA":"8","VIDA":"1600","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Faceless One Terror","NIVEL":"8","INDICE":"243","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"2066","ATAQUE":"74","DEFENSA":"2","VIDA":"1950","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Infernal Machine","NIVEL":"8","INDICE":"244","ZONA":"INFIERNO","RANGO":"true","PUNTOSBATALLA":"1326","ATAQUE":"81","DEFENSA":"2","VIDA":"1200","REGENERACION":"0.5","CADENCIA":"1.6","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Maiden of Pain","NIVEL":"8","INDICE":"245","ZONA":"INFIERNO","RANGO":"true","PUNTOSBATALLA":"1555","ATAQUE":"122","DEFENSA":"0","VIDA":"1450","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Polar Furbolg Elder Shaman","NIVEL":"8","INDICE":"246","ZONA":"INFIERNO","RANGO":"true","PUNTOSBATALLA":"1167","ATAQUE":"94","DEFENSA":"5","VIDA":"950","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Revenant of the Depths","NIVEL":"9","INDICE":"247","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"2444","ATAQUE":"160","DEFENSA":"6","VIDA":"2100","REGENERACION":"1.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Ancient Wendigo","NIVEL":"9","INDICE":"248","ZONA":"TUNDRA","RANGO":"false","PUNTOSBATALLA":"2691","ATAQUE":"110","DEFENSA":"5","VIDA":"2400","REGENERACION":"1.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"15"},
                {"NOMBRE":"Enraged Jungle Stalker","NIVEL":"9","INDICE":"249","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"1790","ATAQUE":"115","DEFENSA":"2","VIDA":"1600","REGENERACION":"1.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Granite Golem","NIVEL":"9","INDICE":"250","ZONA":"PUEBLO","RANGO":"false","PUNTOSBATALLA":"1789","ATAQUE":"127","DEFENSA":"5","VIDA":"1500","REGENERACION":"1.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Satyr Hellcaller","NIVEL":"9","INDICE":"251","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"1370","ATAQUE":"84","DEFENSA":"4","VIDA":"1100","REGENERACION":"1.5","CADENCIA":"0.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Siege Golem","NIVEL":"9","INDICE":"252","ZONA":"PUEBLO","RANGO":"false","PUNTOSBATALLA":"2103","ATAQUE":"51","DEFENSA":"5","VIDA":"1900","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Elder Voidwalker","NIVEL":"9","INDICE":"253","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"1676","ATAQUE":"130","DEFENSA":"0","VIDA":"1550","REGENERACION":"1","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Eredar Warlock","NIVEL":"9","INDICE":"254","ZONA":"INFIERNO","RANGO":"true","PUNTOSBATALLA":"2469","ATAQUE":"134","DEFENSA":"0","VIDA":"2350","REGENERACION":"1","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"15"},
                {"NOMBRE":"Storm Wyrm","NIVEL":"9","INDICE":"255","ZONA":"DESIERTO","RANGO":"true","PUNTOSBATALLA":"1762","ATAQUE":"120","DEFENSA":"5","VIDA":"1500","REGENERACION":"1.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Stormreaver Warlock","NIVEL":"9","INDICE":"256","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"1656","ATAQUE":"145","DEFENSA":"2","VIDA":"1500","REGENERACION":"0.5","CADENCIA":"1.8","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Ancient Sasquatch","NIVEL":"10","INDICE":"257","ZONA":"BOSQUE","RANGO":"false","PUNTOSBATALLA":"3921","ATAQUE":"150","DEFENSA":"5","VIDA":"3600","REGENERACION":"2","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Death Revenant","NIVEL":"10","INDICE":"258","ZONA":"CEMENTERIO","RANGO":"false","PUNTOSBATALLA":"2309","ATAQUE":"160","DEFENSA":"7","VIDA":"1860","REGENERACION":"4","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Deeplord Revenant","NIVEL":"10","INDICE":"259","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"2365","ATAQUE":"135","DEFENSA":"5","VIDA":"2100","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Dragon Turtle","NIVEL":"10","INDICE":"260","ZONA":"PLAYA","RANGO":"false","PUNTOSBATALLA":"2336","ATAQUE":"150","DEFENSA":"7","VIDA":"2000","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Magnataur Destroyer","NIVEL":"10","INDICE":"261","ZONA":"TUNDRA","RANGO":"false","PUNTOSBATALLA":"2317","ATAQUE":"151","DEFENSA":"3","VIDA":"2100","REGENERACION":"0.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Queen of Suffering","NIVEL":"10","INDICE":"262","ZONA":"INFIERNO","RANGO":"false","PUNTOSBATALLA":"2265","ATAQUE":"142","DEFENSA":"1","VIDA":"2100","REGENERACION":"1","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Ancient Hydra","NIVEL":"10","INDICE":"263","ZONA":"PLAYA","RANGO":"true","PUNTOSBATALLA":"5976","ATAQUE":"309","DEFENSA":"4","VIDA":"4150","REGENERACION":"50","CADENCIA":"1.5","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Faceless One Deathbringer","NIVEL":"10","INDICE":"264","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"2035","ATAQUE":"90","DEFENSA":"2","VIDA":"1900","REGENERACION":"0.5","CADENCIA":"1.5","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Infernal Juggernaut","NIVEL":"10","INDICE":"265","ZONA":"INFIERNO","RANGO":"true","PUNTOSBATALLA":"3438","ATAQUE":"207","DEFENSA":"8","VIDA":"3000","REGENERACION":"1.5","CADENCIA":"1.35","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Salamander Lord","NIVEL":"8","INDICE":"266","ZONA":"INFIERNO","RANGO":"true","PUNTOSBATALLA":"2126","ATAQUE":"120","DEFENSA":"6","VIDA":"1800","REGENERACION":"2","CADENCIA":"1.4","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Black Dragon","NIVEL":"10","INDICE":"267","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"2525","ATAQUE":"128","DEFENSA":"6","VIDA":"2200","REGENERACION":"2","CADENCIA":"1.5","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Blue Dragon","NIVEL":"10","INDICE":"268","ZONA":"TUNDRA","RANGO":"true","PUNTOSBATALLA":"2517","ATAQUE":"115","DEFENSA":"6","VIDA":"2200","REGENERACION":"2","CADENCIA":"1.5","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Bronze Dragon","NIVEL":"10","INDICE":"269","ZONA":"DESIERTO","RANGO":"true","PUNTOSBATALLA":"2525","ATAQUE":"128","DEFENSA":"6","VIDA":"2200","REGENERACION":"2","CADENCIA":"1.5","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Green Dragon","NIVEL":"10","INDICE":"270","ZONA":"BOSQUE","RANGO":"true","PUNTOSBATALLA":"2503","ATAQUE":"95","DEFENSA":"6","VIDA":"2200","REGENERACION":"2","CADENCIA":"1.5","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Nether Dragon","NIVEL":"10","INDICE":"271","ZONA":"CEMENTERIO","RANGO":"true","PUNTOSBATALLA":"2672","ATAQUE":"123","DEFENSA":"11","VIDA":"2200","REGENERACION":"2","CADENCIA":"1.5","CRITICO":"0","EVASION":"0","ATURDIR":"0"},
                {"NOMBRE":"Red Dragon","NIVEL":"10","INDICE":"272","ZONA":"INFIERNO","RANGO":"true","PUNTOSBATALLA":"2503","ATAQUE":"95","DEFENSA":"6","VIDA":"2200","REGENERACION":"2","CADENCIA":"1.5","CRITICO":"0","EVASION":"0","ATURDIR":"0"}
                ])
            return res.json({
            "message": "HEROES Y ENEMIGOS GENERADOS EXITOSAMENTE!!!",
            "heroes": heroes,
            "enemigos": enemigos
        });
    } catch (error) {
        res.json(error)
    }
}

// DELETE VIDEO, BASICAMENTE ES LO MISMO QUE LA FUNCION getVideo
export const deleteVideo: RequestHandler = async (req,res) => {
    const videoFound = await Jugador.findByIdAndDelete(req.params.id);
    if (!videoFound) return res.status(204).json();
    return res.json(videoFound);
}

// AL EJECUTAR MUESTRA LA LISTA DE HEROES DISPONIBLES EN LA TABERNA, JUNTO CON LOS NOMBRES.
export const tavern: RequestHandler = async (req,res) => {
    try {
        const jugadores = await Jugador.findOne({"NOMBRE": req.body.NOMBRE}).exec();
        const datosString = JSON.stringify(jugadores)
        const datosJson = JSON.parse(datosString);
        let arrayCopy = datosJson["DISPONIBLES"]
        // TODO ESTE BLOQUE FUE MOVIDO AL LOGIN. DE MODO QUE EN EL LOGIN SE RENUEVA LA LISTA DE DISPONIBLES.
        /*
        const hoy = new Date();
        const fechaGuardada = new Date(datosJson["FECHA"])
        if (hoy.getUTCDate() != fechaGuardada.getUTCDate() || hoy.getUTCMonth() + 1 != fechaGuardada.getUTCMonth() + 1 || hoy.getUTCFullYear() != fechaGuardada.getUTCFullYear()) {
            let arrayAux = new Array<[Number, Number]>()
            // datosJson["HEROE1"] == 0 ? arrayAux.push(1) : ;
            if (datosJson["HEROE1"]["NIVEL"] == 0) {arrayAux.push([1, 1000])}
            if (datosJson["HEROE2"]["NIVEL"] == 0) {arrayAux.push([2, 500])}
            if (datosJson["HEROE3"]["NIVEL"] == 0) {arrayAux.push([3, 300])}
            if (datosJson["HEROE4"]["NIVEL"] == 0) {arrayAux.push([4, 1000])}
            if (datosJson["HEROE5"]["NIVEL"] == 0) {arrayAux.push([5, 500])}
            if (datosJson["HEROE6"]["NIVEL"] == 0) {arrayAux.push([6, 300])}
            if (datosJson["HEROE7"]["NIVEL"] == 0) {arrayAux.push([7, 1000])}
            if (datosJson["HEROE8"]["NIVEL"] == 0) {arrayAux.push([8, 500])}
            if (datosJson["HEROE9"]["NIVEL"] == 0) {arrayAux.push([9, 300])}
            if (datosJson["HEROE10"]["NIVEL"] == 0) {arrayAux.push([10, 1000])}
            if (datosJson["HEROE11"]["NIVEL"] == 0) {arrayAux.push([11, 500])}
            if (datosJson["HEROE12"]["NIVEL"] == 0) {arrayAux.push([12, 300])}
            if (datosJson["HEROE13"]["NIVEL"] == 0) {arrayAux.push([13, 1000])}
            if (datosJson["HEROE14"]["NIVEL"] == 0) {arrayAux.push([14, 500])}
            if (datosJson["HEROE15"]["NIVEL"] == 0) {arrayAux.push([15, 300])}
            if (datosJson["HEROE16"]["NIVEL"] == 0) {arrayAux.push([16, 1000])}
            if (datosJson["HEROE17"]["NIVEL"] == 0) {arrayAux.push([17, 500])}
            if (datosJson["HEROE18"]["NIVEL"] == 0) {arrayAux.push([18, 300])}
            if (datosJson["HEROE19"]["NIVEL"] == 0) {arrayAux.push([19, 1000])}
            if (datosJson["HEROE20"]["NIVEL"] == 0) {arrayAux.push([20, 500])}
            if (datosJson["HEROE21"]["NIVEL"] == 0) {arrayAux.push([21, 300])}
            if (datosJson["HEROE22"]["NIVEL"] == 0) {arrayAux.push([22, 1000])}
            if (datosJson["HEROE23"]["NIVEL"] == 0) {arrayAux.push([23, 500])}
            if (datosJson["HEROE24"]["NIVEL"] == 0) {arrayAux.push([24, 300])}
            arrayCopy = arrayAux
            // USANDO ALGORITMO Durstenfeld shuffle PARA MEZCLAR ARRAY
            arrayCopy = shuffleArray(arrayCopy)
            if (arrayCopy.length > 5) {
                arrayCopy = arrayCopy.slice(0, 5);
            }
            // SE ACTUALIZAN FECHA Y LISTA DE HEROES DISPONIBLES
            await Jugador.findOneAndUpdate({"NOMBRE": req.body.NOMBRE}, {$set : {"FECHA": hoy, "DISPONIBLES": arrayCopy}}, {new: true});
        }
        */
        // PARA EL FRONTEND, VAMOS A AGREGAR LOS NOMBRES DE HEROES
        const todosLosHeroes = await Heroe.find().exec();
        for (let index = 0; index < arrayCopy.length; index++) {
            const heroeActual = todosLosHeroes[arrayCopy[index][0] - 1]
            arrayCopy[index].push(heroeActual["NOMBRE"])
        }
        const respuesta = {
            "message": "Success",
            "listaHeroe": arrayCopy
        }
        return res.json(respuesta);

    } catch (error) {
        res.json(error)
    }
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
// EJECUTA LA COMPRA DEL HEROE PASADO COMO PARAMETRO
export const buyHero: RequestHandler = async (req,res) => {
    try {
        const jugadores = await Jugador.findOne({"NOMBRE": req.body.NOMBRE}).exec();
        const datosString = JSON.stringify(jugadores)
        const datosJson = JSON.parse(datosString);
        let arrayCopy = datosJson["DISPONIBLES"]
        let respuesta = false
        let indice = 0
        for (let index = 0; index < arrayCopy.length; index++) {
            // if (arrayCopy[index][0] == parseInt(req.params.id)) {
            if (arrayCopy[index][0] == parseInt(req.body.ID)) {
                respuesta = true
                indice = index
            }
        }
        if (respuesta) {
            if (arrayCopy[indice][1] <= datosJson["MONEDAS"]) {
                // DESCUENTA LAS MONEDAS, PONE A NIVEL 1 EL HEROE COMPRADO, ELIMINA ESE ELEMENTO DEL ARRAY DE HEROES DISPONIBLES
                const monedasRestantes = datosJson["MONEDAS"] - arrayCopy[indice][1]
                const heroeJson = {
                    "NIVEL": 1,
                    "EXPERIENCIA": 0,
                    "OBJETOS": [0, 0, 0, 0, 0]
                }
                let newArray = arrayCopy.filter((elemento:[Number, Number]) => elemento != arrayCopy[indice])
                // MODIFICANDO newArray, PARA AUMENTAR LOS COSTOS POR LA NUEVA UNIDAD COMPRADA
                for (let i = 0; i < newArray.length; i++) {
                    newArray[i][1] = getFinalCost(datosJson["CANTIDAD"] + 1, newArray[i][0])
                }
                const jugador = await Jugador.findOneAndUpdate({"NOMBRE": req.body.NOMBRE}, {$set : {"MONEDAS": monedasRestantes, ["HEROE" + arrayCopy[indice][0]]: heroeJson, "CANTIDAD": datosJson["CANTIDAD"] + 1, "DISPONIBLES": newArray}}, {new: true});
                return res.json({
                    "message": "HEROE COMPRADO!!!",
                    "datosJugador": jugador
                });
            } else {
                return res.json({"message": "MONEDAS INSUFICIENTES"});
            }
        } else {
            return res.json({"message": "HEROE NO EXISTE"});
        }
    } catch (error) {
        res.json(error)
    }
}

// CONSULTA EL ESCUADRON ACTUAL, Y LOS HEROES DISPONIBLES PARA AGREGAR/CAMBIAR
export const getAvailable: RequestHandler = async (req,res) => {
    try {
        const jugadores = await Jugador.findOne({"NOMBRE": req.body.NOMBRE}).exec();
        const datosString = JSON.stringify(jugadores)
        const datosJson = JSON.parse(datosString);
        let lisRespuesta = new Array<any>()
        lisRespuesta.push(datosJson["ESCUADRON"])
        let lisDisponibles = new Array<number>()
        for (let i = 1; i < 25; i++) {
            const nivelHeroeActual = parseInt(datosJson["HEROE" + i]["NIVEL"])
            if (nivelHeroeActual > 0) {
                lisDisponibles.push(i)
            }
        }
        lisRespuesta.push(lisDisponibles)
        return res.json(lisRespuesta);
    } catch (error) {
        res.json(error)
    }
}
// RECIBE, REVISA, Y GUARDA LA NUEVA LISTA DE INDICES PARA EL ESCUADRON
export const setSquad: RequestHandler = async (req,res) => {
    try {
        // NO RECIBE UN ELEMENTO, SINO UN ARRAY DE NUMEROS
        const lista = req.body.ESCUADRON
        if (lista.length == 10) {
            // REVISAR IMPLICA REVISAR QUE LOS INDICES CORRESPONDAN A LOS HEROES
            let errores = false
            for (let i = 0; i < lista.length; i++) {
                if ((parseInt(lista[i]) < 0) || (24 < parseInt(lista[i]))) {
                    // INDICE DE HEROE INEXISTENTE
                    errores = true
                }
                const respuesta = heroeRepetido(parseInt(lista[i]), lista)
                if (respuesta) {
                    errores = true
                }
            }
            if (errores == false) {
                // GUARDAR ESCUADRON
                const jugador = await Jugador.findOneAndUpdate({"NOMBRE": req.body.NOMBRE}, {$set : {"ESCUADRON": lista}}, {new: true})
                return res.json({
                    "message": "ESCUADRON GUARDADO EXITOSAMENTE!!!",
                    "datosJugador": jugador
                });
            } else {
                return res.json({"message": "UNO DE LOS INDICES DE HEROE ES INEXISTENTE, O ESTA REPETIDO"});
            }
        } else {
            return res.json({"message": "EL ARRAY RECIBIDO NO TIENE EL TAMAÑO CORRECTO"});
        }
    } catch (error) {
        res.json(error)
    }
}
function heroeRepetido(indice: number, lista: any) {
    // REVISA QUE EL INDICE NO ESTE REPETIDO. EL INDICE 0 SI ESTA PERMITIDO.
    let respuesta = false
    if (0 < indice) {
        // CREA UN ARRAY AUXILIAR CON LOS ELEMENTOS IGUALES AL indice RECIBIDO, Y GUARDA LA CANTIDAD
        const cantidadRepetidos = lista.filter((x:Number) => x == indice).length
        if (cantidadRepetidos > 1) {
            respuesta = true
        }
    }
    return respuesta;
}

// CONSULTA SI LA ZONA ELEGIDA ESTA DISPONIBLE. TAMBIEN SORTEA LA CANTIDAD DE RUTAS.
export const getZone: RequestHandler = async (req,res) => {
    try {
        const jugadores = await Jugador.findOne({"NOMBRE": req.body.NOMBRE}).exec();
        const datosString = JSON.stringify(jugadores)
        const datosJson = JSON.parse(datosString);
        
        // ESTO ERA PARA EL METODO GET
        // const idZona = parseInt(req.params.id);
        
        // ESTO PARA EL METODO POST
        const idZona = parseInt(req.body.id);

        if ((idZona > 0) && (idZona < 11)) {
            if (idZona <= datosJson["ZONA"]) {
                const jugador = await Jugador.findOneAndUpdate({"NOMBRE": req.body.NOMBRE}, {$set : {"PROXCAMP": -1}}, {new: true})
                const cantRutas = sortearRutas(idZona)
                return res.json(
                    {"message": "RUTAS GENERADAS",
                    "datosJugador": jugador,
                    "cantRutas": cantRutas});
            } else {
                return res.json({"message": "ESTA ZONA AUN ESTA BLOQUEADA"});
            }
        } else {
            return res.json({"message": "INDICE DE ZONA INEXISTENTE"});
        }
    } catch (error) {
        res.json(error)
    }
}
function sortearRutas(zona: number) {
    // SORTEA LA CANTIDAD DE RUTAS, BASADO EN LA ZONA ELEGIDA
    let cantidad = 0
    if (zona == 1) {
        cantidad = 3
    } else if ((2 <= zona) && (zona <= 5)) {
        const aleatorio = Math.floor(Math.random() * 1)
        cantidad = 3 + aleatorio
    } else if ((6 <= zona) && (zona <= 9)) {
        const aleatorio = Math.floor(Math.random() * 1)
        cantidad = 4 + aleatorio
    } else if (zona == 10) {
        cantidad = 5
    }
    return cantidad;
}
// ELIGE UNA RUTA ENTRE LAS DISPONIBLES. TAMBIEN SORTEA LA LISTA DE ENEMIGOS.
export const getRoute: RequestHandler = async (req,res) => {
    try {
        const jugadores = await Jugador.findOne({"NOMBRE": req.body.NOMBRE}).exec();
        const datosString = JSON.stringify(jugadores)
        const datosJson = JSON.parse(datosString);
        
        // ESTO ERA PARA EL METODO GET
        // const idZona = parseInt(req.params.zone);
        // const idRuta = parseInt(req.params.route);
        
        // ESTO PARA EL METODO POST
        const idZona = parseInt(req.body.zone);
        const idRuta = parseInt(req.body.route);

        if ((idZona > 0) && (idZona < 11)) {
            if ((idRuta > 0) && (idRuta < 6)) {
                const todosLosEnemigos = await Enemigo.find().exec();
                // NECESITO LOS ATRIBUTOS DEL ESCUADRON PARA CALCULAR LOS PUNTOS DE BATALLA
                const todosLosHeroes = await Heroe.find().exec();
                // ESTA FUNCION LEE: LA LISTA DE INDICES DE HEROES ESCOGIDOS,
                // LA COLECCION DE DATOS DEL JUGADOR, EN DONDE ESTAN LOS NIVELES,
                // Y LA COLECCION DE ATRIBUTOS MINIMOS Y MAXIMOS COMPLETA
                    // Y CON ELLA CALCULA LOS ATRIBUTOS DE CADA UNIDAD
                const lisUnidades = calcularAtributosHeroes(datosJson["ESCUADRON"], datosJson, todosLosHeroes)
                // ESTA FUNCION VA A CALCULAR LOS PUNTOS DE BATALLA DEL ESCUADRON
                const puntosEscuadron = calcularPuntosEscuadron(lisUnidades)
                // AHORA SE ARMA LA LISTA DE ENEMIGOS PARA LA RUTA ELEGIDA. 6 SUBLISTAS PARA CADA CAMPAMENTO
                const lisEnemigosRuta = enemigosSegunZonaRuta(idZona, idRuta, todosLosEnemigos, puntosEscuadron)

                /*
                GUARDAR EN UN LOCAL STORAGE:
                EL ARRAY lisEnemigosRuta. ESTE TIENE LOS INDICES DE LOS ENEMIGOS DE CADA CAMPAMENTO
                TAMBIEN GUARDAR EL INDICE DEL PROXIMO CAMPAMENTO
                */
                // POR AHORA USO LA MISMA BASE DE DATOS
                const jugador = await Jugador.findOneAndUpdate({"NOMBRE": req.body.NOMBRE}, {$set : {"ZONARUTA": [idZona, idRuta], "ARRAYRUTA": lisEnemigosRuta, "PROXCAMP": 0}}, {new: true})
                return res.json(
                    {"message": "CAMPAMENTOS GENERADOS",
                    "datosJugador": jugador});
            } else {
                return res.json({"message": "INDICE DE RUTA INEXISTENTE"});
            }
        } else {
            return res.json({"message": "INDICE DE ZONA INEXISTENTE"});
        }
    } catch (error) {
        res.json(error)
    }
}
function calcularPuntosEscuadron(todosLosHeroes: any) {
    let sumatoria = 0
    for (let index = 0; index < todosLosHeroes.length; index++) {
        sumatoria += todosLosHeroes[index].VIDATOTAL +
        (todosLosHeroes[index].REGENERACION * 30) +
        (todosLosHeroes[index].DEFENSA * 30) +
        (todosLosHeroes[index].ATAQUE * (1 / todosLosHeroes[index].CADENCIA)) +
        todosLosHeroes[index].CRITICO + todosLosHeroes[index].EVASION + todosLosHeroes[index].ATURDIR
    }
    return sumatoria;
}
function enemigosSegunZonaRuta(zona: number, ruta: number, todosLosEnemigos: any, puntosCombate: number) {
    // ESTA FUNCION RECORTA LA LISTA DE ENEMIGOS COMPLETA, Y CONSERVA LOS QUE PERTENECEN A UNA ZONA.
        // SEGUN LOS NIVELES
    let newArray = new Array<any>()
    // LAS ZONAS TIENEN QUE TENER UN MINIMO Y MAXIMO EN PUNTOS DE BATALLA.
        // DE OTRO MODO SIEMPRE SE AJUSTAN AL ESCUADRON DEL JUGADOR, IGNORANDO LA DIFICULTAD.
    let minZona = 0
    let maxZona = 0
    // PRIMERO FILTRAMOS SOLO LOS ENEMIGOS CON EL NIVEL CORRESPONDIENTE SEGUN LA ZONA
    switch (zona) {
        case 1:
            minZona = 0
            maxZona = 1400
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 1))
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 1))
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 2))
            break;
        case 2:
            minZona = 1260
            maxZona = 2800
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 1))
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 2))
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 3))
            break;
        case 3:
            minZona = 2520
            maxZona = 4200
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 2))
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 3))
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 4))
            break;
        case 4:
            minZona = 3780
            maxZona = 5600
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 3))
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 4))
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 5))
            break;
        case 5:
            minZona = 5040
            maxZona = 7000
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 4))
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 5))
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 6))
            break;
        case 6:
            minZona = 6300
            maxZona = 8400
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 5))
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 6))
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 7))
            break;
        case 7:
            minZona = 7560
            maxZona = 9800
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 6))
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 7))
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 8))
            break;
        case 8:
            minZona = 8820
            maxZona = 11200
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 7))
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 8))
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 9))
            break;
        case 9:
            minZona = 10080
            maxZona = 12600
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 8))
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 9))
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 10))
            break;
        case 10:
            minZona = 11340
            maxZona = 14000
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 9))
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 10))
            newArray.push(todosLosEnemigos.filter((x:any)=>x.NIVEL == 10))
            break;
    }
    let menor = 0
    let media = 0
    switch (ruta) {
        case 1:
            puntosCombate *= 0.8
            menor = 50
            media = 90
            break;
        case 2:
            puntosCombate *= 0.9
            menor = 40
            media = 80
            break;
        case 3:
            menor = 30
            media = 70
            break;
        case 4:
            puntosCombate *= 1.1
            menor = 20
            media = 60
            break;
        case 5:
            puntosCombate *= 1.2
            menor = 10
            media = 50
            break;
    }
    if (puntosCombate < minZona) {
        puntosCombate = minZona
    }
    if (puntosCombate > maxZona) {
        puntosCombate = maxZona
    }
    let arrayEnemigos = new Array<any>()
    let arrayTemporal = new Array<any>()
    let arraytemporalPuntos = new Array<[number, number]>()
    let contador = 0
    let acumulador = 0
    while (contador < 10) {
        while (acumulador < puntosCombate) {
            // SORTEANDO UN SUBARRAY DE ENEMIGOS, SEGUN LA DIFICULTAD
            // RECORDAR QUE newArray ES UN ARRAY QUE ALMACENA 3 SUBARRAYS
                // CADA UNO CON UN NIVEL DISTINTO DE ENEMIGOS, LOS ULTIMOS SON DE MAYOR NIVEL
            const indiceDificultad = Math.floor(Math.random() * 100)
            let indiceAleatorio = -1
            if (indiceDificultad < menor) {
                indiceAleatorio = 0
            } else if ((menor <= indiceDificultad) && (indiceDificultad <= media)) {
                indiceAleatorio = 1
            }else if (media < indiceDificultad) {
                indiceAleatorio = 2
            }
            // SORTEANDO UN ENEMIGO, DEL SUBARRAY SORTEADO DE ENEMIGOS POR ZONA
                // ESTE ENEMIGO SE AGREGA A UN ARRAY CAMPAMENTO
            const subIndiceAleatorio = Math.floor(Math.random() * (newArray[indiceAleatorio].length))
            arrayTemporal.push(newArray[indiceAleatorio][subIndiceAleatorio])
            acumulador += parseInt(newArray[indiceAleatorio][subIndiceAleatorio].PUNTOSBATALLA)
        }
        // AGREGANDO EL CAMPAMENTO AL ARRAY RUTA, JUNTO CON UN ARRAY SECUNDARIO PARA ORDENAR PUNTOS
        arrayEnemigos.push(arrayTemporal)
        arraytemporalPuntos.push([contador, acumulador])
        contador += 1
        arrayTemporal = new Array<any>()
        acumulador = 0
    }
    // ORDENANDO EL ARRAY DE PUNTOS, SEGUN EL SEGUNDO ELEMENTO QUE SON LOS PUNTOS.
    // EL PRIMER ELEMENTO SON LOS INDICES, QUE SERVIRAN PARA OBTENER EL ORDEN EN LA LISTA DE ENEMIGOS
    arraytemporalPuntos.sort(function(a, b){return a[1]-b[1]})
    let arrayFinal = new Array<any>()
    for (let index = 0; index < arraytemporalPuntos.length; index++) {
        arrayFinal.push(arrayEnemigos[arraytemporalPuntos[index][0]])
    }
    // TAMBIEN EN CADA CAMPAMENTO ORDENAR ENEMIGOS SEGUN EL ALCANCE, Y SEGUN EL NIVEL
    // PRIMERO ORDENO ENEMIGOS POR ALCANCE, LOS MELEE ADELANTE
    arrayFinal.sort(function(a, b){
        const a2 = a.RANGO === true ? 1 : 0;
        const b2 = b.RANGO === true ? 1 : 0;
        return a2-b2
    })
    // DESPUES ORDENO ENEMIGOS POR NIVEL, LOS NIVELES BAJOS ADELANTE. RESPETANDO LOS ALCANCES
    arrayFinal.sort(function(a, b){return a.NIVEL-b.NIVEL})
    // SOLO SE CONSERVAN LOS INDICES DE LA LISTA, PARA QUE LA FUNCION calcularAtributosEnemigos LOS INTERPRETE
    let arrayIndices = new Array<any>()
    let arrayIndicesAux = new Array<number>()
    for (let index = 0; index < arrayFinal.length; index++) {
        for (let i = 0; i < arrayFinal[index].length; i++) {
            arrayIndicesAux.push(arrayFinal[index][i].INDICE)
        }
        arrayIndices.push(arrayIndicesAux)
        arrayIndicesAux = []
    }
    return arrayIndices;
}
// AL EJECUTAR MUESTRA EL RESULTADO DE UNA PELEA.
export const battle: RequestHandler = async (req,res) => {
    try {
        const jugadores = await Jugador.findOne({"NOMBRE": req.body.NOMBRE}).exec();
        const datosString = JSON.stringify(jugadores)
        const datosJson = JSON.parse(datosString);
        
        // ESTO ERA PARA EL METODO GET
        // const idZona = parseInt(req.params.zone);
        // const idRuta = parseInt(req.params.route);
        // const idRuta = parseInt(req.params.camp);
        
        // ESTO PARA EL METODO POST
        const idZona = parseInt(req.body.zone);
        const idRuta = parseInt(req.body.route);
        const idCamp = parseInt(req.body.camp);

        let lisUnidades = new Array<any>()
        let lisEnemigos = new Array<any>()
        const todosLosHeroes = await Heroe.find().exec();
        const todosLosEnemigos = await Enemigo.find().exec();
        // ESTA FUNCION LEE: LA LISTA DE INDICES DE HEROES ESCOGIDOS,
        // LA COLECCION DE DATOS DEL JUGADOR, EN DONDE ESTAN LOS NIVELES,
        // Y LA COLECCION DE ATRIBUTOS MINIMOS Y MAXIMOS COMPLETA
            // Y CON ELLA CALCULA LOS ATRIBUTOS DE CADA UNIDAD
        lisUnidades = calcularAtributosHeroes(datosJson["ESCUADRON"], datosJson, todosLosHeroes)
        if ((idZona > 0) && (idZona < 11)) {
            if ((idRuta > 0) && (idRuta < 6)) {
                if ((-1 < idCamp)&&(idCamp < 10)) {
                    let puntosNecesarios = 1
                    switch (idZona) {
                        case 1:
                            puntosNecesarios = 2
                            break;
                        case 2:
                            puntosNecesarios = 2
                            break;
                        case 3:
                            puntosNecesarios = 3
                            break;
                        case 4:
                            puntosNecesarios = 3
                            break;
                        case 5:
                            puntosNecesarios = 3
                            break;
                        case 6:
                            puntosNecesarios = 4
                            break;
                        case 7:
                            puntosNecesarios = 4
                            break;
                        case 8:
                            puntosNecesarios = 4
                            break;
                        case 9:
                            puntosNecesarios = 5
                            break;
                        case 10:
                            puntosNecesarios = 5
                            break;
                    }
                    if (datosJson["ACCION"] >= puntosNecesarios) {

                        // indiceGuardado DEBERIA RECIBIRSE DESDE EL LOCAL STORAGE. POR AHORA LEE DE LA BD
                        const indiceGuardado = datosJson["PROXCAMP"]
                        if (idCamp == indiceGuardado) {
                            // LA LISTA lisEnemigosRuta DEBERIA RECIBIRSE DESDE EL LOCAL STORAGE. POR AHORA LEE DE LA BD
                            lisEnemigos = calcularAtributosEnemigos(datosJson["ARRAYRUTA"][idCamp], todosLosEnemigos)
                            // lisEnemigos = calcularAtributosEnemigos([0, 0, 0], todosLosEnemigos)
                            // ASIGNAR DE ESTA FORMA LOS JSON, ASEGURA QUE SERAN COPIAS INDEPENDIENTES Y SIN REFERENCIA
                            // const heroes = await Heroe.findOne({"NOMBRE": "Guerrero"}).exec();
                            // lisEnemigos.push(JSON.parse(JSON.stringify(heroes)) as typeof heroes)
        
                            let TerminoBatalla = false
                            let lisrespuesta = new Array<any>()
                            let lisaux = new Array<any>()
                            let reloj = 0.0
                            let relojEntero = 1
                            let monedasRecompensa = 0
                            let experienciaRecompensa = 0
                            let unidadesIniciales = new Array<any>()
                            let enemigosIniciales = new Array<any>()
                            for (let index = 0; index < lisUnidades.length; index++) {
                                unidadesIniciales.push([lisUnidades[index].NOMBRE, 0, lisUnidades[index].VIDATOTAL.toFixed(2)])
                            }
                            for (let index = 0; index < lisEnemigos.length; index++) {
                                enemigosIniciales.push([lisEnemigos[index].NOMBRE, 0, lisEnemigos[index].VIDATOTAL.toFixed(2)])
                            }
                            
                            console.log("INICIA SIMULACRO")
        
                            // MIENTRAS UNA DE LAS LISTAS TENGA ELEMENTOS, LA BATALLA CONTINUA
                            while (TerminoBatalla == false) {
                                // REVISA TURNOS DEL JUGADOR
                                // TAMBIEN EVALUA QUE NO SEA UN SANADOR, EN ESE CASO USA UNA FUNCION DISTINTA
                                for (let index = 0; index < lisUnidades.length; index++) {
                                    if (lisEnemigos.length > 0) {
                                        if (reloj >= lisUnidades[index]["PROXATAQUE"]) {
                                            if (lisUnidades[index]["SANADOR"]) {
                                                // ESTA FUNCION BUSCA UN OBJETIVO Y LO CURA
                                                // ES SIMILAR A atacarEliminar, PERO REQUIERE EL INDICE DEL SANADOR, Y EL reloj.
                                                // EN CASO DE NO ENCONTRAR NI UN OBJETIVO, POSPONE LA MITAD DE TIEMPO.
                                                // EL "PROXATAQUE" SE ASIGNA DENTRO DE LA FUNCION
                                                lisUnidades = buscarCurar(index, lisUnidades, reloj);
                                            } else {
                                                lisaux = atacarEliminar(lisUnidades[index], lisEnemigos, true, idCamp);
                                                monedasRecompensa += parseInt(lisaux[0])
                                                experienciaRecompensa += parseInt(lisaux[1])
                                                lisEnemigos = lisaux[2]
                                                lisUnidades[index]["PROXATAQUE"] = reloj + lisUnidades[index]["CADENCIA"]
                                                if (lisEnemigos.length <= 0) {
                                                    TerminoBatalla = true
                                                    lisrespuesta.push("VICTORIA")
                                                    // for (let index = 0; index < lisUnidades.length; index++) {
                                                    //     lisrespuesta.push([lisUnidades[index].NOMBRE, lisUnidades[index].VIDAACTUAL.toFixed(2)])
                                                    // }
                                                }
                                            }
                                        }
                                    }
                                }
                                // REVISA TURNOS DEL ENEMIGO
                                if (TerminoBatalla == false) {
                                    for (let index = 0; index < lisEnemigos.length; index++) {
                                        if (lisUnidades.length > 0) {
                                            if (reloj >= lisEnemigos[index]["PROXATAQUE"]) {
                                                lisaux = atacarEliminar(lisEnemigos[index], lisUnidades, false, idCamp);
                                                lisUnidades = lisaux[2]
                                                lisEnemigos[index]["PROXATAQUE"] = reloj + lisEnemigos[index]["CADENCIA"]
                                                if (lisUnidades.length <= 0) {
                                                    TerminoBatalla = true
                                                    lisrespuesta.push("DERROTA")
                                                    // for (let index = 0; index < lisEnemigos.length; index++) {
                                                    //     lisrespuesta.push([lisEnemigos[index].NOMBRE, lisEnemigos[index].VIDAACTUAL.toFixed(2)])
                                                    // }
                                                }
                                            }
                                        }
                                    }
                                }
                                reloj += 0.1
                                if (reloj >= relojEntero) {
                                    // APLICAR REGENERACIONES
                                    console.log("HEROES")
                                    for (let index = 0; index < lisUnidades.length; index++) {
                                        lisUnidades[index]["VIDAACTUAL"] += lisUnidades[index]["REGENERACION"]
                                        if (lisUnidades[index]["VIDAACTUAL"] > lisUnidades[index]["VIDATOTAL"]) {
                                            lisUnidades[index]["VIDAACTUAL"] = lisUnidades[index]["VIDATOTAL"]
                                        }
                                        console.log(lisUnidades[index]["VIDAACTUAL"])
                                    }
                                    console.log("ENEMIGOS")
                                    for (let index = 0; index < lisEnemigos.length; index++) {
                                        lisEnemigos[index]["VIDAACTUAL"] += lisEnemigos[index]["REGENERACION"]
                                        if (lisEnemigos[index]["VIDAACTUAL"] > lisEnemigos[index]["VIDATOTAL"]) {
                                            lisEnemigos[index]["VIDAACTUAL"] = lisEnemigos[index]["VIDATOTAL"]
                                        }
                                        console.log(lisEnemigos[index]["VIDAACTUAL"])
                                    }
                                    relojEntero += 1
                                }
                            }
                            // ADJUNTAR UNIDADES Y ENEMIGOS
                            lisrespuesta.push(unidadesIniciales)
                            lisrespuesta.push(enemigosIniciales)
                            let lisAux = new Array<any>()
                            if (lisrespuesta[0] == "VICTORIA") {
                                for (let index = 0; index < lisUnidades.length; index++) {
                                    lisAux.push(lisUnidades[index].VIDAACTUAL.toFixed(2))
                                }
                                let ultimoIndice = lisrespuesta[1].length - 1
                                for (let i = lisAux.length - 1; -1 < i; i--) {
                                    lisrespuesta[1][ultimoIndice][1] = lisAux[i]
                                    ultimoIndice -= 1
                                }
                            } else {
                                for (let index = 0; index < lisEnemigos.length; index++) {
                                    lisAux.push(lisEnemigos[index].VIDAACTUAL.toFixed(2))
                                }
                                let ultimoIndice = lisrespuesta[2].length - 1
                                for (let i = lisAux.length - 1; -1 < i; i--) {
                                    lisrespuesta[2][ultimoIndice][1] = lisAux[i]
                                    ultimoIndice -= 1
                                }
                            }
                            lisrespuesta.push(lisAux)

                            console.log(lisrespuesta[0])

                            // GUARDANDO LAS RECOMPENSAS
                            let jugador;
                            const monedasFinal = datosJson["MONEDAS"] + monedasRecompensa
                            let experienciaJugador = datosJson["EXPERIENCIA"] + experienciaRecompensa
                            let accionJugador = datosJson["ACCION"] - puntosNecesarios
                            if (lisrespuesta[0] == "VICTORIA") {
                                let proxCampamentoJugador = indiceGuardado + 1
                                let zonaJugador = datosJson["ZONA"]
                                if (proxCampamentoJugador > datosJson["ARRAYRUTA"].length - 1) {
                                    zonaJugador += 1
                                    proxCampamentoJugador = -1
                                }
                                // GUARDANDO EXP PARA CADA HEROE EN EL ESCUADRON
                                for (let i = 0; i < datosJson["ESCUADRON"].length; i++) {
                                    if (parseInt(datosJson["ESCUADRON"][i]) > 0) {
                                        // SUBIR DE NIVEL CADA HEROE EN EL ESCUADRON
                                        let nuevoNivel = datosJson["HEROE" + datosJson["ESCUADRON"][i]]["NIVEL"]
                                        let expNecesaria = 50 * (nuevoNivel**2 + nuevoNivel - 2)
                                        let experienciaHeroe = datosJson["HEROE" + datosJson["ESCUADRON"][i]]["EXPERIENCIA"] + experienciaRecompensa
                                        while (experienciaHeroe >= expNecesaria) {
                                            nuevoNivel += 1
                                            experienciaHeroe = experienciaHeroe - expNecesaria
                                            expNecesaria = 50 * (nuevoNivel**2 + nuevoNivel - 2)
                                        }
                                        const heroeJson = {
                                            "NIVEL": nuevoNivel,
                                            "EXPERIENCIA": experienciaHeroe,
                                            "OBJETOS": [0, 0, 0, 0, 0]
                                        }
                                        await Jugador.findOneAndUpdate({"NOMBRE": req.body.NOMBRE}, {$set : {["HEROE" + datosJson["ESCUADRON"][i]]: heroeJson}}, {new: true})
                                    }
                                }
                                // SUBIR DE NIVEL JUGADOR
                                let nuevoNivel = datosJson["NIVEL"]
                                let expNecesaria = 50 * ((nuevoNivel + 1)**2 + (nuevoNivel + 1) - 2)
                                while (experienciaJugador >= expNecesaria) {
                                    nuevoNivel += 1
                                    experienciaJugador = experienciaJugador - expNecesaria
                                    expNecesaria = 50 * ((nuevoNivel + 1)**2 + (nuevoNivel + 1) - 2)
                                }
                                // ARRIBA, EN EL WHILE PARA SUBIR DE NIVEL LOS HEROES, HAY VARIOS CAMBIOS EN EL REGISTRO, PERO ESTOS NO SON DEFINITIVOS.
                                    // SIN EMBARGO ESTE SI ES EL ULTIMO CAMBIO QUE ASEGURA GUARDAR EL RESULTADO DEL COMBATE. Y ES EL QEU SE DEVUELVE AL App DEL FRONTEND.
                                jugador = await Jugador.findOneAndUpdate({"NOMBRE": req.body.NOMBRE}, {$set : {"MONEDAS": monedasFinal, "NIVEL": nuevoNivel, "EXPERIENCIA": experienciaJugador, "ACCION": accionJugador, "PROXCAMP": proxCampamentoJugador, "ZONA": zonaJugador}}, {new: true})
                            } else {
                                jugador = await Jugador.findOneAndUpdate({"NOMBRE": req.body.NOMBRE}, {$set : {"ACCION": accionJugador}}, {new: true})
                            }

                            console.log("RESULTADOS")
                            return res.json(
                                {"message": "RESULTADOS",
                                "datosJugador": jugador,
                                "lisrespuesta": lisrespuesta});
                        } else if (indiceGuardado == -1) {
                            return res.json({"message": "FELICIDADES. SE TERMINO LA EXPEDICION, AHORA DEBE INICIAR UNA NUEVA"});
                        } else {
                            return res.json({"message": "INDICE DE CAMPAMENTO ERRONEO, DISPONIBLE EL: " + indiceGuardado});
                        }
                    } else {
                        return res.json({"message": "PUNTOS DE ACCION INSUFICIENTES: " + datosJson["ACCION"] + "/" + puntosNecesarios});
                    }
                } else {
                    return res.json({"message": "INDICE DE CAMPAMENTO INEXISTENTE"});
                }
            } else {
                return res.json({"message": "INDICE DE RUTA INEXISTENTE"});
            }
        } else {
            return res.json({"message": "INDICE DE ZONA INEXISTENTE"});
        }
    } catch (error) {
        res.json(error)
    }
}
function atacarEliminar(Atacante: any, lisRivales: any, atacanteHeroe: boolean, ruta: number) {
    // ESTA FUNCION ESCOGE EL ELEMENTO 0 EN LA LISTA DEL RIVAL, Y LE DESCUENTA VIDA.
        // TAMBIEN ELIMINA EL ELEMENTO 0, SI ESTE NO TIENE VIDA
    // EVALUA SI atacanteHeroe ES TRUE, ENTONCES CALCULA LA RECOMPENSA EN MONEDAS Y LA ADJUNTA A LA RESPUESTA
    let danioentrante = 0;
    let daniofinal = 0;
    const evasionaux = Math.floor(Math.random() * 100)
    if (evasionaux <= lisRivales[0]["EVASION"]) {
        daniofinal = 0;
    }
    else {
        danioentrante = Atacante["ATAQUE"]
        const criticoaux = Math.floor(Math.random() * 100)
        if (criticoaux <= Atacante["CRITICO"]) {
            danioentrante *= 2;
        }
        if (lisRivales[0]["DEFENSA"] >= 0) {
            daniofinal = danioentrante * (1 - (lisRivales[0]["DEFENSA"] / (100.0 + lisRivales[0]["DEFENSA"])));
        }
        else {
            daniofinal = danioentrante * (1 - (2 - (lisRivales[0]["DEFENSA"] / (100.0 + lisRivales[0]["DEFENSA"]))));
        }
        const aturdiraux = Math.floor(Math.random() * 100)
        if (aturdiraux <= Atacante["ATURDIR"]) {
            lisRivales[0]["PROXATAQUE"] += 1;
        }
    }
    lisRivales[0]["VIDAACTUAL"] -= daniofinal;
    let lisRespuesta = new Array<any>()
    let monedasRecompensaActual = 0
    let experienciaRecompensaActual = 0
    if (lisRivales[0]["VIDAACTUAL"] <= 0) {
        if (atacanteHeroe) {
            monedasRecompensaActual = sumarMonedas(lisRivales[0]["NIVEL"], ruta)
            experienciaRecompensaActual = sumarExperiencia(lisRivales[0]["NIVEL"], ruta)
        }
        lisRivales.shift();
    }
    lisRespuesta.push(monedasRecompensaActual)
    lisRespuesta.push(experienciaRecompensaActual)
    lisRespuesta.push(lisRivales)
    return lisRespuesta;
}
function calcularAtributosHeroes(lisIndices: any, datosJson: any, todosLosHeroes: any) {
    // ESTA FUNCION LEE UNA LISTA DE INDICES, Y CON ELLA CALCULA LOS ATRIBUTOS DE CADA UNIDAD
    let lisAtributos = new Array<any>()
    for (let index = 0; index < lisIndices.length; index++) {
        if (lisIndices[index] > 0) {
            const nivel = parseInt(datosJson["HEROE" + lisIndices[index]]["NIVEL"])
            // AHORA CON LOS NIVELES, CALCULAR LOS ATRIBUTOS FINALES
            let sanador = ((13 <= lisIndices[index]) && (lisIndices[index] <= 15) ? true : false)
            const heroeActual = todosLosHeroes[lisIndices[index] - 1]
            let nombre = JSON.parse(JSON.stringify(heroeActual))["NOMBRE"]
            const ataqueMaximo = JSON.parse(JSON.stringify(heroeActual))["ATAQUEMAX"]
            const ataqueMinimo = JSON.parse(JSON.stringify(heroeActual))["ATAQUEMIN"]
            let ataque = (((ataqueMaximo - ataqueMinimo) / 100) * nivel) + ataqueMinimo
            const defensaMaximo = JSON.parse(JSON.stringify(heroeActual))["DEFENSAMAX"]
            const defensaMinimo = JSON.parse(JSON.stringify(heroeActual))["DEFENSAMIN"]
            let defensa = (((defensaMaximo - defensaMinimo) / 100) * nivel) + defensaMinimo
            const vidaMaximo = JSON.parse(JSON.stringify(heroeActual))["VIDAMAX"]
            const vidaMinimo = JSON.parse(JSON.stringify(heroeActual))["VIDAMIN"]
            let vidatotal = (((vidaMaximo - vidaMinimo) / 100) * nivel) + vidaMinimo
            const regenMaximo = JSON.parse(JSON.stringify(heroeActual))["REGENMAX"]
            const regenMinimo = JSON.parse(JSON.stringify(heroeActual))["REGENMIN"]
            let regeneracion = (((regenMaximo - regenMinimo) / 100) * nivel) + regenMinimo
            // RECORDAR QUE LA CADENCIA DECRECE A MEDIDA QUE SUBE DE NIVEL
            const cadenciaMaximo = JSON.parse(JSON.stringify(heroeActual))["CADENCIAMAX"]
            const cadenciaMinimo = JSON.parse(JSON.stringify(heroeActual))["CADENCIAMIN"]
            let cadencia = (((cadenciaMaximo - cadenciaMinimo) / 100) * (100 - nivel)) + cadenciaMinimo
            let proxAtaque = cadencia / 2
            const criticoMaximo = JSON.parse(JSON.stringify(heroeActual))["CRITICOMAX"]
            const criticoMinimo = JSON.parse(JSON.stringify(heroeActual))["CRITICOMIN"]
            let critico = (((criticoMaximo - criticoMinimo) / 100) * nivel) + criticoMinimo
            const evasionMaximo = JSON.parse(JSON.stringify(heroeActual))["EVASIONMAX"]
            const evasionMinimo = JSON.parse(JSON.stringify(heroeActual))["EVASIONMIN"]
            let evasion = (((evasionMaximo - evasionMinimo) / 100) * nivel) + evasionMinimo
            const aturdirMaximo = JSON.parse(JSON.stringify(heroeActual))["ATURDIRMAX"]
            const aturdirMinimo = JSON.parse(JSON.stringify(heroeActual))["ATURDIRMIN"]
            let aturdir = (((aturdirMaximo - aturdirMinimo) / 100) * nivel) + aturdirMinimo
            const jsonHeroe = {
                "SANADOR": sanador,
                "NOMBRE": nombre,
                "ATAQUE": ataque,
                "DEFENSA": defensa,
                "VIDATOTAL": vidatotal,
                "VIDAACTUAL": vidatotal,
                "REGENERACION": regeneracion,
                "CADENCIA": cadencia,
                "PROXATAQUE": proxAtaque,
                "CRITICO": critico,
                "EVASION": evasion,
                "ATURDIR": aturdir
            }
            lisAtributos.push(jsonHeroe)
        }
    }
    return lisAtributos;
}
function calcularAtributosEnemigos(lisIndices: any, todosLosEnemigos: any) {
    // ESTA FUNCION LEE UNA LISTA DE INDICES, Y DEVUELVE LOS ATRIBUTOS DE CADA ENEMIGO
    let lisAtributos = new Array<any>()
    for (let index = 0; index < lisIndices.length; index++) {
        const enemigoActual = todosLosEnemigos[lisIndices[index]]
        const nombre = JSON.parse(JSON.stringify(enemigoActual))["NOMBRE"]
        const nivel = JSON.parse(JSON.stringify(enemigoActual))["NIVEL"]
        const experiencia = JSON.parse(JSON.stringify(enemigoActual))["EXPERIENCIA"]
        const ataque = JSON.parse(JSON.stringify(enemigoActual))["ATAQUE"]
        const defensa = JSON.parse(JSON.stringify(enemigoActual))["DEFENSA"]
        const vidatotal = JSON.parse(JSON.stringify(enemigoActual))["VIDA"]
        const regeneracion = JSON.parse(JSON.stringify(enemigoActual))["REGENERACION"]
        const cadencia = JSON.parse(JSON.stringify(enemigoActual))["CADENCIA"]
        const proxAtaque = cadencia / 2
        const critico = JSON.parse(JSON.stringify(enemigoActual))["CRITICO"]
        const evasion = JSON.parse(JSON.stringify(enemigoActual))["EVASION"]
        const aturdir = JSON.parse(JSON.stringify(enemigoActual))["ATURDIR"]
        const jsonHeroe = {
            "NOMBRE": nombre,
            "NIVEL": nivel,
            "ATAQUE": ataque,
            "EXPERIENCIA": experiencia,
            "DEFENSA": defensa,
            "VIDATOTAL": vidatotal,
            "VIDAACTUAL": vidatotal,
            "REGENERACION": regeneracion,
            "CADENCIA": cadencia,
            "PROXATAQUE": proxAtaque,
            "CRITICO": critico,
            "EVASION": evasion,
            "ATURDIR": aturdir
        }
        lisAtributos.push(jsonHeroe)
    }
    return lisAtributos;
}
function buscarCurar(indiceSanador: number, lisAliados: any, reloj:number) {
    // ESTA FUNCION BUSCA EL ELEMENTO CON MAYOR PORCENTAJE DE VIDA FALTANTE EN LA LISTA DE ALIADOS,
    // EN CASO DE NO EXISTIR, POSPONE SU ATAQUE LA MITAD DE TIEMPO.
    // PRIMERO BUSCAR OBJETIVO
    let indice = -1
    let proporcion = 1.0
    for (let index = 0; index < lisAliados.length; index++) {
        if (lisAliados[index]["VIDAACTUAL"] < lisAliados[index]["VIDATOTAL"]) {
            const proporcionaux = lisAliados[index]["VIDAACTUAL"] / lisAliados[index]["VIDATOTAL"]
            if (proporcionaux < proporcion) {
                proporcion = proporcionaux
                indice = index
            }
        }        
    }
    // DESPUES CURAR
    if (indice >= 0) {
        let curacion = lisAliados[indiceSanador]["ATAQUE"]
        const criticoaux = Math.floor(Math.random() * 100)
        if (criticoaux <= lisAliados[indiceSanador]["CRITICO"]) {
            curacion *= 2;
        }
        lisAliados[indice]["VIDAACTUAL"] += curacion;
        if (lisAliados[indice]["VIDAACTUAL"] > lisAliados[indice]["VIDATOTAL"]) {
            lisAliados[indice]["VIDAACTUAL"] = lisAliados[indice]["VIDATOTAL"]
        }
        lisAliados[indiceSanador]["PROXATAQUE"] = reloj + lisAliados[indiceSanador]["CADENCIA"]
    } else {
        lisAliados[indiceSanador]["PROXATAQUE"] = reloj + (lisAliados[indiceSanador]["CADENCIA"] / 2)
    }
    return lisAliados;
}
function sumarMonedas(nivel: number, ruta: number) {
    // ESTA FUNCION CALCULA LA CANTIDAD DE MONEDAS GANADAS POR DERROTAR A UN ENEMIGO.
    // EL VALOR ES ALEATORIO BASADO EN EL NIVEL DEL ENEMIGO DERROTADO, Y LA RUTA TOMADA.
    let multiploRuta = 0
    switch (ruta) {
        case 0:
            multiploRuta = 0.8
            break;
        case 1:
            multiploRuta = 0.9
            break;
        case 2:
            multiploRuta = 1
            break;
        case 3:
            multiploRuta = 1.1
            break;
        case 4:
            multiploRuta = 1.2
            break;
        case 5:
            multiploRuta = 1.3
            break;
        case 6:
            multiploRuta = 1.4
            break;
        case 7:
            multiploRuta = 1.5
            break;
        case 8:
            multiploRuta = 1.6
            break;
        case 9:
            multiploRuta = 1.7
            break;
    }
    // SORTEANDO UN FLOTANTE ENTRE 0.1 Y 0.3
    const aleatorio = Math.random() * (0.3 - 0.1) + 0.1
    const monedas = (nivel * 100) * (multiploRuta + aleatorio)
    return Math.floor(monedas);
}
function sumarExperiencia(nivelEnemigo: number, ruta: number) {
    // ESTA FUNCION CALCULA LA CANTIDAD DE EXPERIENCIA GANADA POR DERROTAR A UN ENEMIGO.
    // EL VALOR ES ALEATORIO BASADO EN EL NIVEL DEL ENEMIGO DERROTADO, Y LA RUTA TOMADA.
    const expBase = nivelEnemigo * 25
    let multiploRuta = 0
    switch (ruta) {
        case 0:
            multiploRuta = 0.8
            break;
        case 1:
            multiploRuta = 0.9
            break;
        case 2:
            multiploRuta = 1
            break;
        case 3:
            multiploRuta = 1.1
            break;
        case 4:
            multiploRuta = 1.2
            break;
        case 5:
            multiploRuta = 1.3
            break;
        case 6:
            multiploRuta = 1.4
            break;
        case 7:
            multiploRuta = 1.5
            break;
        case 8:
            multiploRuta = 1.6
            break;
        case 9:
            multiploRuta = 1.7
            break;
    }
    // SORTEANDO UN FLOTANTE ENTRE 0.1 Y 0.3
    const aleatorio = Math.random() * (0.3 - 0.1) + 0.1
    const experiencia = expBase * (multiploRuta + aleatorio)
    return Math.floor(experiencia);
}
