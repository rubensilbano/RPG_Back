// ENDPOINTS REFERENTES A LA COMPRA DE HEROES, Y ORGANIZACION DEL ESCUADRON.
import { RequestHandler } from "express"
import Jugador from "../models/Jugador";
import Heroe from "../models/Heroe";

// AL EJECUTAR MUESTRA UNA LISTA CON LOS NOMBRES DE LOS HEROES DISPONIBLES EN LA TABERNA
export const getHeroNames: RequestHandler = async (req,res) => {
    try {
        const jugadores = await Jugador.findOne({"NOMBRE": req.body.NOMBRE}).exec();
        const datosString = JSON.stringify(jugadores)
        const datosJson = JSON.parse(datosString);
        let arrayCopy = datosJson["DISPONIBLES"]
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
function getFinalCost(cantidad: number, indice: number) {
    // CALCULA Y DEVUELVE EL COSTO, SEGUN LOS HEROES OBTENIDOS
    const cost = [1000, 500, 300, 1000, 500, 300, 1000, 500, 300, 1000, 500, 300, 1000, 500, 300, 1000, 500, 300, 1000, 500, 300, 1000, 500, 300]
    const costoBase = cost[indice - 1]
    const costo = costoBase * (1 + (cantidad * 0.2))
    return Math.floor(costo);
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

// ARMA UN VECTOR CON [0] INDICES DEL ESCUADRON ACTUAL, Y
    // [1] INDICES DE LOS HEROES COMPRADOS
// EL FRONTEND RESUELVE TODO ESTO, ASI QUE NO ES UNA RUTA NECESARIA.
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
