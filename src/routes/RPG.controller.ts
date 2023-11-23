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
                    newArray[i][1] = getFinalCost(datosJson["CANTIDAD"] + 1, i)
                    
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
                                    // console.log("HEROES")
                                    for (let index = 0; index < lisUnidades.length; index++) {
                                        lisUnidades[index]["VIDAACTUAL"] += lisUnidades[index]["REGENERACION"]
                                        if (lisUnidades[index]["VIDAACTUAL"] > lisUnidades[index]["VIDATOTAL"]) {
                                            lisUnidades[index]["VIDAACTUAL"] = lisUnidades[index]["VIDATOTAL"]
                                        }
                                        // console.log(lisUnidades[index]["VIDAACTUAL"])
                                    }
                                    // console.log("ENEMIGOS")
                                    for (let index = 0; index < lisEnemigos.length; index++) {
                                        lisEnemigos[index]["VIDAACTUAL"] += lisEnemigos[index]["REGENERACION"]
                                        if (lisEnemigos[index]["VIDAACTUAL"] > lisEnemigos[index]["VIDATOTAL"]) {
                                            lisEnemigos[index]["VIDAACTUAL"] = lisEnemigos[index]["VIDATOTAL"]
                                        }
                                        // console.log(lisEnemigos[index]["VIDAACTUAL"])
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
                            // GUARDANDO LAS RECOMPENSAS
                            let jugador;
                            if (lisrespuesta[0] == "VICTORIA") {
                                const monedasFinal = datosJson["MONEDAS"] + monedasRecompensa
                                let experienciaJugador = datosJson["EXPERIENCIA"] + experienciaRecompensa
                                let accionJugador = datosJson["ACCION"] - puntosNecesarios
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
