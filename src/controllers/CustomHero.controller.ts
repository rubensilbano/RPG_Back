// ENDPOINTS REFERENTES A LA COMPRA DE HEROES, Y ORGANIZACION DEL ESCUADRON.
import { RequestHandler } from "express"
import Jugador from "../models/Jugador";
import Heroe from "../models/Heroe";
import Objeto from "../models/Objeto";

// AL EJECUTAR DEVUELVE LA LISTA CON LOS HEROES DISPONIBLES EN LA TABERNA,
    // PERO A CADA INDICE SE LE AGREGA EL NOMBRE
    // [INDICE HEROE, COSTO MONEDAS, NOMBRE HEROE]
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
                const pbMinimos = [850, 720, 592, 846, 717, 589, 733, 622, 511, 774, 655, 538, 653, 553, 455, 617, 522, 429, 888, 753, 619, 776, 656, 539]
                const heroeJson = {
                    "NIVEL": 1,
                    "EXPERIENCIA": 0,
                    "OBJETOS": [0, 0, 0, 0, 0],
                    "PUNTOSBATALLA": [pbMinimos[arrayCopy[indice][0] - 1], 0]
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

// EL FRONTEND RECIBIRA LOS ATRIBUTOS BASE DEL HEROE SOLICITADO, SEGUN EL NIVEL
export const getAttributes: RequestHandler = async (req,res) => {
    try {
        const heroe = await Heroe.findOne({"NOMBRE": req.body.NOMBRE}).exec();
        const atributosHeroe = calcularAtributosUnSoloHeroe(heroe, req.body.NIVEL)
        return res.json({
            "message": "HEROE CALCULADO EXITOSAMENTE!!!",
            "datosHeroe": atributosHeroe
        });
    } catch (error) {
        res.json(error)
    }
}
function calcularAtributosUnSoloHeroe(heroeActual: any, nivel: number) {
    // ESTA FUNCION CALCULA LOS ATRIBUTOS DE UN SOLO HEROE
        // NO CALCULA EXACTAMENTE TODOS LOS ATRIBUTOS NECESARIOS EN COMBATE.
    // const nivelMaximo = 100
    const nivelMaximo = 30
    let nombre = JSON.parse(JSON.stringify(heroeActual))["NOMBRE"]
    const ataqueMaximo = JSON.parse(JSON.stringify(heroeActual))["ATAQUEMAX"]
    const ataqueMinimo = JSON.parse(JSON.stringify(heroeActual))["ATAQUEMIN"]
    let ataque = (((ataqueMaximo - ataqueMinimo) / nivelMaximo) * nivel) + ataqueMinimo
    const defensaMaximo = JSON.parse(JSON.stringify(heroeActual))["DEFENSAMAX"]
    const defensaMinimo = JSON.parse(JSON.stringify(heroeActual))["DEFENSAMIN"]
    let defensa = (((defensaMaximo - defensaMinimo) / nivelMaximo) * nivel) + defensaMinimo
    const vidaMaximo = JSON.parse(JSON.stringify(heroeActual))["VIDAMAX"]
    const vidaMinimo = JSON.parse(JSON.stringify(heroeActual))["VIDAMIN"]
    let vidatotal = (((vidaMaximo - vidaMinimo) / nivelMaximo) * nivel) + vidaMinimo
    const regenMaximo = JSON.parse(JSON.stringify(heroeActual))["REGENMAX"]
    const regenMinimo = JSON.parse(JSON.stringify(heroeActual))["REGENMIN"]
    let regeneracion = (((regenMaximo - regenMinimo) / nivelMaximo) * nivel) + regenMinimo
    // RECORDAR QUE LA CADENCIA DECRECE A MEDIDA QUE SUBE DE NIVEL
    const cadenciaMaximo = JSON.parse(JSON.stringify(heroeActual))["CADENCIAMAX"]
    const cadenciaMinimo = JSON.parse(JSON.stringify(heroeActual))["CADENCIAMIN"]
    let cadencia = (((cadenciaMaximo - cadenciaMinimo) / nivelMaximo) * (nivelMaximo - nivel)) + cadenciaMinimo
    const criticoMaximo = JSON.parse(JSON.stringify(heroeActual))["CRITICOMAX"]
    const criticoMinimo = JSON.parse(JSON.stringify(heroeActual))["CRITICOMIN"]
    let critico = (((criticoMaximo - criticoMinimo) / nivelMaximo) * nivel) + criticoMinimo
    const evasionMaximo = JSON.parse(JSON.stringify(heroeActual))["EVASIONMAX"]
    const evasionMinimo = JSON.parse(JSON.stringify(heroeActual))["EVASIONMIN"]
    let evasion = (((evasionMaximo - evasionMinimo) / nivelMaximo) * nivel) + evasionMinimo
    const aturdirMaximo = JSON.parse(JSON.stringify(heroeActual))["ATURDIRMAX"]
    const aturdirMinimo = JSON.parse(JSON.stringify(heroeActual))["ATURDIRMIN"]
    let aturdir = (((aturdirMaximo - aturdirMinimo) / nivelMaximo) * nivel) + aturdirMinimo
    const jsonHeroe = {
        "NOMBRE": nombre,
        "ATAQUE": ataque,
        "DEFENSA": defensa,
        "VIDA": vidatotal,
        "REGENERACION": regeneracion,
        "CADENCIA": cadencia,
        "CRITICO": critico,
        "EVASION": evasion,
        "ATURDIR": aturdir
    }
    return jsonHeroe;
}
// EL FRONTEND RECIBIRA LA LISTA CON TODOS LOS OBJETOS, Y SUS ATRIBUTOS
export const getObjects: RequestHandler = async (req,res) => {
    try {
        const objeto = await Objeto.find().exec();
        return res.json({
            "message": "LISTADO DE OBJETOS OBTENIDO",
            "listado": objeto
        });
    } catch (error) {
        res.json(error)
    }
}
// GUARDA 3 CAMBIOS: INVENTARIO DEL HEROE ACTUAL, INVENTARIO DEL JUGADOR, SUMATORIA DE PB DE OBJETOS
export const saveInventory: RequestHandler = async (req,res) => {
    try {
        const jugadores = await Jugador.findOne({"NOMBRE": req.body.NOMBRE}).exec();
        const datosString = JSON.stringify(jugadores)
        const datosJson = JSON.parse(datosString);
        datosString
        const indice = req.body.INDICEHEROE
        const heroeJson = {
            "NIVEL": datosJson["HEROE" + indice]["NIVEL"],
            "EXPERIENCIA": datosJson["HEROE" + indice]["EXPERIENCIA"],
            "OBJETOS": req.body.INVHEROE,
            "PUNTOSBATALLA": [datosJson["HEROE" + indice]["PUNTOSBATALLA"][0], req.body.PBOBJETOS]
        }
        const jugador = await Jugador.findOneAndUpdate({"NOMBRE": req.body.NOMBRE}, {$set : {["HEROE" + indice]: heroeJson, "ARRAYOBJETOS": req.body.INVJUGADOR}}, {new: true})
        return res.json({
            "message": "DATOS GUARDADOS EXITOSAMENTE!!!",
            "datosJugador": jugador
        });
    } catch (error) {
        res.json(error)
    }
}