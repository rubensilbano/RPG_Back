// ENDPOINTS PARA ELEGIR ZONA, RUTA, CAMPAMENTO, E INICIAR UNA PELEA Y MOSTRAR RESULTADOS.

// ESTE ES UN MANEJADOR PARA LAS RUTAS DE LAS PETICIONES ENVIADAS DESDE EL FRONTEND.
    //ESTA ES LA ESPECIFICACION E IMPLEMENTACION A LAS RUTAS
import { RequestHandler } from "express"
// PERMITE MANEJAR FUNCIONES ASINCRONAS CON EXPRESS
import Jugador from "../models/Jugador";
import Heroe from "../models/Heroe";
import Enemigo from "../models/Enemigo";
import Objeto from "../models/Objeto";

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
                // const todosLosHeroes = await Heroe.find().exec();

                
                // ESTA FUNCION LEE: LA LISTA DE INDICES DE HEROES ESCOGIDOS,
                // LA COLECCION DE DATOS DEL JUGADOR, EN DONDE ESTAN LOS NIVELES,
                // Y LA COLECCION DE ATRIBUTOS MINIMOS Y MAXIMOS COMPLETA
                    // Y CON ELLA CALCULA LOS ATRIBUTOS DE CADA UNIDAD
                // const lisUnidades = calcularAtributosHeroes(datosJson["ESCUADRON"], datosJson, todosLosHeroes)
                // ESTA FUNCION VA A CALCULAR LOS PUNTOS DE BATALLA DEL ESCUADRON
                // const puntosEscuadron = calcularPuntosEscuadron(lisUnidades)

                // YA NO CALCULA LOS PUNTOS DE BATALA DEL ESCUADRON, LOS LEE DE CADA REGISTRO DE HEROE
                    // SI TODO SALE BIEN, AQUI NO DEBERIA NECESITAR MAS LA FUNCION calcularPuntosEscuadron()


                let puntosEscuadron = 0
                for (let i = 0; i < datosJson["ESCUADRON"].length; i++) {
                    if (0 < datosJson["ESCUADRON"][i]) {
                        puntosEscuadron += parseInt(datosJson["HEROE" + datosJson["ESCUADRON"][i]]["PUNTOSBATALLA"][0]);                   
                        puntosEscuadron += parseInt(datosJson["HEROE" + datosJson["ESCUADRON"][i]]["PUNTOSBATALLA"][1]);
                    }
                }
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
        const objeto = await Objeto.find().exec();
        const objetosString = JSON.stringify(objeto)
        const objetosJson = JSON.parse(objetosString);

        // ESTO ERA PARA EL METODO GET
        // const idZona = parseInt(req.params.zone);
        // const idRuta = parseInt(req.params.route);
        // const idRuta = parseInt(req.params.camp);
        
        // ESTO ES PARA EL METODO POST
        const idZona = parseInt(req.body.zone);
        const idRuta = parseInt(req.body.route);
        const idCamp = parseInt(req.body.camp);

        let lisUnidades = new Array<any>()
        let lisEnemigos = new Array<any>()
        const todosLosHeroes = await Heroe.find().exec();
        const todosLosEnemigos = await Enemigo.find().exec();
        // ESTA FUNCION LEE: LA LISTA DE INDICES DE HEROES ESCOGIDOS,
        // LA COLECCION DE DATOS DEL JUGADOR(EN DONDE ESTAN LOS NIVELES),
        // Y LA COLECCION DE ATRIBUTOS MINIMOS Y MAXIMOS COMPLETA.
            // Y CON ELLA CALCULA LOS ATRIBUTOS DE CADA HEROE
        lisUnidades = calcularAtributosHeroes(datosJson["ESCUADRON"], datosJson, todosLosHeroes)
        // AÑADE A LA LISTA DE ATRIBUTOS, LOS ATRIBUTOS DE LOS OBJETOS
        // REQUIERE LA COLECCION DE DATOS DEL JUGADOR(EN DONDE ESTAN LOS OBJETOS EQUIPADOS A CADA HEROE),
        // LA LISTA DE ATRIBUTOS FINALES,
        // Y LA COLECCION DE OBJETOS(EN DONDE ESTAN LOS ATRIBUTOS)
        lisUnidades = agregarAtributosObjetos(datosJson, lisUnidades, objetosJson)
        let puntosNecesarios = 1
        let chances = 10
        switch (idZona) {
            case 1:
                puntosNecesarios = 2
                chances = 10
                break;
            case 2:
                puntosNecesarios = 2
                chances = 20
                break;
            case 3:
                puntosNecesarios = 3
                chances = 20
                break;
            case 4:
                puntosNecesarios = 3
                chances = 30
                break;
            case 5:
                puntosNecesarios = 3
                chances = 30
                break;
            case 6:
                puntosNecesarios = 4
                chances = 40
                break;
            case 7:
                puntosNecesarios = 4
                chances = 40
                break;
            case 8:
                puntosNecesarios = 4
                chances = 50
                break;
            case 9:
                puntosNecesarios = 5
                chances = 50
                break;
            case 10:
                puntosNecesarios = 5
                chances = 60
                break;
            default:
                puntosNecesarios = 1
                chances = 10
                break;
        }
        // GUARD CLAUSULE CONJUNTO QUE EVALUA:
        // QUE EL JUGADOR TENGA LOS PUNTOS DE ACCION NECESARIOS
        // QUE EL ESCUADRON NO ESTE VACIO
        // QUE LA ZONA ESTE FUERA DEL RANGO 1-10
        // QUE LA RUTA ESTE FUERA DEL RANGO 1-5
        // QUE EL CAMPAMENTO ESTE FUERA DEL RANGO 0-9
        if (datosJson["ACCION"] < puntosNecesarios) {
            return res.json({"message": "PUNTOS DE ACCION INSUFICIENTES. SE REQUIEREN " + datosJson["ACCION"] + "/" + puntosNecesarios});
        } else if (lisUnidades.length <= 0) {
            return res.json({"message": "ESCUADRON VACIO. SE REQUIERE AL MENOS UN HEROE"});
        } else if(((idZona < 1) || (10 < idZona)) || 
        ((idRuta < 1) || (5 < idRuta)) || 
        ((idCamp < 0) || (9 < idCamp))) {
            return res.json({"message": "COMBINACION (ZONA, RUTA, CAMPAMENTO) INEXISTENTE."});
        }

        // indiceGuardado DEBERIA RECIBIRSE DESDE EL LOCAL STORAGE. POR AHORA LEE DE LA BD
        const indiceGuardado = datosJson["PROXCAMP"]
        if (idCamp == indiceGuardado) {
            // LA LISTA lisEnemigosRuta DEBERIA RECIBIRSE DESDE EL LOCAL STORAGE. POR AHORA LEE DE LA BD
            lisEnemigos = calcularAtributosEnemigos(datosJson["ARRAYRUTA"][idCamp], todosLosEnemigos)
            // lisEnemigos = calcularAtributosEnemigos([0, 0, 0], todosLosEnemigos)
            // ASIGNAR DE ESTA FORMA LOS JSON, ASEGURA QUE SERAN COPIAS INDEPENDIENTES Y SIN REFERENCIA
            // const heroes = await Heroe.findOne({"NOMBRE": "Guerrero"}).exec();
            // lisEnemigos.push(JSON.parse(JSON.stringify(heroes)) as typeof heroes)

            let jugador;
            if (0 == lisEnemigos.length) {
                jugador = await Jugador.findOneAndUpdate({"NOMBRE": req.body.NOMBRE}, {$set : {"ZONARUTA": [0, 0], "PROXCAMP": -1}}, {new: true})
                console.log("SIN ENEMIGOS")
                return res.json(
                    {"message": "SIN ENEMIGOS",
                    "datosJugador": jugador});
            } else {
                let TerminoBatalla = false
                let lisrespuesta = new Array<any>()
                let lisaux = new Array<any>()
                let lisauxCuracion = new Array<any>()
                let reloj = 0.0
                let relojEntero = 1
                let monedasRecompensa = 0
                let experienciaRecompensa = 0
                let unidadesIniciales = new Array<any>()
                let enemigosIniciales = new Array<any>()
                let lisAtaques = new Array<any>()
                let unidadesEstadisticas = new Array<number>()
                let enemigosEstadisticas = new Array<number>()
                let objetosGanados = new Array<number>()
                unidadesEstadisticas = [0, 0, 0, 0]
                enemigosEstadisticas = [0, 0, 0, 0]
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
                                    lisauxCuracion = buscarCurar(index, lisUnidades, reloj, true, lisAtaques, unidadesEstadisticas);
                                    lisUnidades = lisauxCuracion[0]
                                    lisAtaques = lisauxCuracion[1]
                                    unidadesEstadisticas = lisauxCuracion[2]
                                } else {
                                    lisaux = atacarEliminar(lisUnidades[index], lisEnemigos, true, idCamp, lisAtaques, unidadesEstadisticas, enemigosEstadisticas, objetosJson, chances, idZona);
                                    monedasRecompensa += parseInt(lisaux[0])
                                    experienciaRecompensa += parseInt(lisaux[1])
                                    lisEnemigos = lisaux[2]
                                    lisAtaques = lisaux[3]
                                    unidadesEstadisticas = lisaux[4]
                                    if (0 < parseInt(lisaux[5])) {
                                        objetosGanados.push(parseInt(lisaux[5]))
                                    }
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
                                    lisaux = atacarEliminar(lisEnemigos[index], lisUnidades, false, idCamp, lisAtaques, enemigosEstadisticas, unidadesEstadisticas, objetosJson, chances, idZona);
                                    lisUnidades = lisaux[2]
                                    lisAtaques = lisaux[3]
                                    enemigosEstadisticas = lisaux[4]
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
                    // EN CASO DE VICTORIA, ADJUNTA LOS PUNTOS DE VIDA RESTANTES DE LOS HEROES
                    for (let index = 0; index < lisUnidades.length; index++) {
                        lisAux.push(lisUnidades[index].VIDAACTUAL.toFixed(2))
                    }
                    let ultimoIndice = lisrespuesta[1].length - 1
                    for (let i = lisAux.length - 1; -1 < i; i--) {
                        lisrespuesta[1][ultimoIndice][1] = lisAux[i]
                        ultimoIndice -= 1
                    }
                } else {
                    // EN CASO DE DERROTA, ADJUNTA LOS PUNTOS DE VIDA RESTANTES DE LOS ENEMIGOS
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
                let monedasFinal = datosJson["MONEDAS"]
                let accionJugador = datosJson["ACCION"] - puntosNecesarios
                let proxCampamentoJugador = indiceGuardado
                let zonaJugador = datosJson["ZONA"]
                if (lisrespuesta[0] == "VICTORIA") {
                    // EN CASO DE VICTORIA
                    proxCampamentoJugador = indiceGuardado + 1
                    if (proxCampamentoJugador > datosJson["ARRAYRUTA"].length - 1) {
                        if ((datosJson["ZONARUTA"][0] == datosJson["ZONA"]) && (datosJson["ZONA"] < 10)) {
                            zonaJugador += 1
                        }
                        proxCampamentoJugador = -1
                    }
                } else {
                    // EN CASO DE DERROTA
                    monedasRecompensa = Math.floor(monedasRecompensa / 2)
                    experienciaRecompensa = Math.floor(experienciaRecompensa / 2)
                    const mitadObjetos = Math.floor(objetosGanados.length / 2)
                    objetosGanados = shuffleArray(objetosGanados)
                    let objetosAux = new Array<number>()
                    for (let i = 0; i < mitadObjetos; i++) {
                        objetosAux.push(objetosGanados[i])
                    }
                    objetosGanados = objetosAux
                }
                monedasFinal = datosJson["MONEDAS"] + monedasRecompensa
                let lisExpEscuadron = new Array<any>()
                // GUARDANDO EXP PARA CADA HEROE EN EL ESCUADRON
                for (let i = 0; i < datosJson["ESCUADRON"].length; i++) {
                    if ((parseInt(datosJson["ESCUADRON"][i]) > 0) && (datosJson["HEROE" + datosJson["ESCUADRON"][i]]["NIVEL"] < 30)) {
                        // SUBIR DE NIVEL CADA HEROE EN EL ESCUADRON
                        let nuevoNivel = datosJson["HEROE" + datosJson["ESCUADRON"][i]]["NIVEL"]
                        let subioNivel = false
                        let expNecesaria = 50 * (nuevoNivel**2 + nuevoNivel - 2)
                        let experienciaHeroe = datosJson["HEROE" + datosJson["ESCUADRON"][i]]["EXPERIENCIA"] + experienciaRecompensa
                        while (experienciaHeroe >= expNecesaria) {
                            nuevoNivel += 1
                            subioNivel = true
                            experienciaHeroe = experienciaHeroe - expNecesaria
                            expNecesaria = 50 * (nuevoNivel**2 + nuevoNivel - 2)
                            if (nuevoNivel == 30) {
                                experienciaHeroe = 0
                            }
                        }
                        // SI SUBE DE NIVEL, RECALCULA LOS PUNTOS DE BATALLA BASE DEL HEROE
                        let puntosHeroe = datosJson["HEROE" + datosJson["ESCUADRON"][i]]["PUNTOSBATALLA"][0]
                        if (subioNivel) {
                            const atributosHeroe = calcularAtributosUnSoloHeroe(datosJson["ESCUADRON"][i], datosJson, todosLosHeroes)
                            puntosHeroe = calcularPuntosHeroe(atributosHeroe)
                        }
                        lisExpEscuadron.push([experienciaHeroe, expNecesaria, nuevoNivel, subioNivel])
                        const heroeJson = {
                            "NIVEL": nuevoNivel,
                            "EXPERIENCIA": experienciaHeroe,
                            "OBJETOS": datosJson["HEROE" + datosJson["ESCUADRON"][i]]["OBJETOS"],
                            "PUNTOSBATALLA": [puntosHeroe, datosJson["HEROE" + datosJson["ESCUADRON"][i]]["PUNTOSBATALLA"][1]]
                        }
                        // ESTOS CAMBIOS EN EL REGISTRO SON INDIVIDUALES, MAS NO SON DEFINITIVOS.
                        await Jugador.findOneAndUpdate({"NOMBRE": req.body.NOMBRE}, {$set : {["HEROE" + datosJson["ESCUADRON"][i]]: heroeJson}}, {new: true})
                    }
                }
                // SUBIR DE NIVEL JUGADOR
                let experienciaJugador = datosJson["EXPERIENCIA"] + experienciaRecompensa
                let nuevoNivel = datosJson["NIVEL"]
                if (datosJson["NIVEL"] < 100) {
                    let expNecesaria = 50 * ((nuevoNivel + 1)**2 + (nuevoNivel + 1) - 2)
                    while (experienciaJugador >= expNecesaria) {
                        nuevoNivel += 1
                        experienciaJugador = experienciaJugador - expNecesaria
                        expNecesaria = 50 * ((nuevoNivel + 1)**2 + (nuevoNivel + 1) - 2)
                        if (nuevoNivel == 100) {
                            experienciaJugador = 0
                        }
                    }
                }
                // AÑADIENDO OBJETOS AL INVENTARIO
                let objetosAux = datosJson["ARRAYOBJETOS"]
                for (let i = 0; i < objetosGanados.length; i++) {
                    objetosAux[objetosGanados[i] - 1] += 1
                }
                // AÑADIENDO MONEDAS Y EXPERIENCIA PARA MOSTRAR EN EL FRONTEND
                let lisRecompensas = new Array<number>()
                lisRecompensas.push(monedasRecompensa)
                lisRecompensas.push(experienciaRecompensa)
                lisrespuesta.push(lisRecompensas)
                lisrespuesta.push(lisExpEscuadron)
                lisrespuesta.push(lisAtaques)
                lisrespuesta.push([unidadesEstadisticas, enemigosEstadisticas])
                lisrespuesta.push(objetosGanados)
                // ESTE SI ES EL ULTIMO CAMBIO QUE ASEGURA GUARDAR EL RESULTADO DEL COMBATE.
                    // Y ES EL QUE SE DEVUELVE AL App DEL FRONTEND.
                jugador = await Jugador.findOneAndUpdate({"NOMBRE": req.body.NOMBRE}, {$set : {"MONEDAS": monedasFinal, "NIVEL": nuevoNivel, "EXPERIENCIA": experienciaJugador, "ACCION": accionJugador, "PROXCAMP": proxCampamentoJugador, "ZONA": zonaJugador, "ARRAYOBJETOS": objetosAux}}, {new: true})
                
                console.log("RESULTADOS")
                
                return res.json(
                    {"message": "RESULTADOS",
                    "datosJugador": jugador,
                    "lisrespuesta": lisrespuesta});
            }
        } else {
            return res.json({"message": "INDICE DE CAMPAMENTO NO COINCIDE."});
        }
    } catch (error) {
        res.json(error)
    }
}
function atacarEliminar(Atacante: any, lisRivales: any, atacanteHeroe: boolean, idCamp: number, lisAtaques: any, lisAcumuladores: any, lisAcumuladoresRival: any, objetosJson: [], chances: number, zona: number) {
    // ESTA FUNCION ESCOGE EL ELEMENTO 0 EN LA LISTA DEL RIVAL, Y LE DESCUENTA VIDA.
        // TAMBIEN ELIMINA EL ELEMENTO 0, SI ESTE NO TIENE VIDA
    // EVALUA SI atacanteHeroe ES TRUE, ENTONCES CALCULA LA RECOMPENSA EN MONEDASY EXP. ADJUNTA TODO A LA RESPUESTA
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
            lisAcumuladoresRival[1] += danioentrante - daniofinal
        }
        else {
            daniofinal = danioentrante * (1 - (2 - (lisRivales[0]["DEFENSA"] / (100.0 + lisRivales[0]["DEFENSA"]))));
        }
        const aturdiraux = Math.floor(Math.random() * 100)
        if (aturdiraux <= Atacante["ATURDIR"]) {
            lisRivales[0]["PROXATAQUE"] += 1;
            lisAcumuladoresRival[3] += 1;
        }
    }
    let dañoCausado = parseInt(lisRivales[0]["VIDAACTUAL"])
    lisRivales[0]["VIDAACTUAL"] -= daniofinal;
    dañoCausado -= parseInt(lisRivales[0]["VIDAACTUAL"])
    lisAcumuladores[0] += dañoCausado

    // AGREGANDO REGISTRO DE ATAQUES
    let lisAtaquesAux = new Array<any>()
    // ATACA HEROE O ATACA ENEMIGO
    const esHeroe = atacanteHeroe ? "AH" : "AE"
    lisAtaquesAux.push(esHeroe)
    let palabra = Atacante["NOMBRE"] + "   causo " + dañoCausado.toFixed(2) + " en daño a   " + lisRivales[0]["NOMBRE"]
    lisAtaquesAux.push(palabra)
    lisAtaques.push(lisAtaquesAux)

    let lisRespuesta = new Array<any>()
    let monedasRecompensaActual = 0
    let experienciaRecompensaActual = 0
    // let objetosRecompensaActual = new Array<number>()
    let objetoRecompensaActual = -1
    if (lisRivales[0]["VIDAACTUAL"] <= 0) {
        lisAtaques.push([esHeroe, lisRivales[0]["NOMBRE"] + " fue derrotado."])
        if (atacanteHeroe) {
            monedasRecompensaActual = sumarMonedas(lisRivales[0]["NIVEL"], idCamp)
            experienciaRecompensaActual = sumarExperiencia(lisRivales[0]["NIVEL"], idCamp)

            // SORTEANDO OBJETOS
            const dropAux = Math.floor(Math.random() * 100)
            let objetosAux = new Array<any>()
            if (dropAux <= chances) {
                for (let i = 0; i < objetosJson.length; i++) {
                    // AQUI ARMA UNA LISTA RECORTADA, CON CADA OBJETO CUYO NIVEL SEA <= AL NUMERO DE ZONA -1
                        // DESPUES TOMA UN OBJETO ALEATORIO DE ESTA LISTA RECORTADA
                    // ORIGINALMENTE EL NIVEL DEBIA SER <= AL NUMERO DE ZONA.
                        // PERO ERA ABSURDO JUGAR LA ULTIMA ZONA, PARA CONSEGUIR LOS MEJORES OBJETOS.
                    if (parseInt(objetosJson[i]["NIVEL"]) <= zona - 1) {
                        objetosAux.push(i + 1)
                    }
                }
                objetoRecompensaActual = objetosAux[Math.floor(Math.random() * objetosAux.length)]
            }

        }
        lisRivales.shift();
    }
    lisRespuesta.push(monedasRecompensaActual)
    lisRespuesta.push(experienciaRecompensaActual)
    lisRespuesta.push(lisRivales)
    lisRespuesta.push(lisAtaques)
    lisRespuesta.push(lisAcumuladores)
    // lisRespuesta.push(objetosRecompensaActual)
    lisRespuesta.push(objetoRecompensaActual)
    return lisRespuesta;
}
function calcularAtributosHeroes(lisIndices: any, datosJson: any, todosLosHeroes: any) {
    // ESTA FUNCION LEE UNA LISTA DE INDICES, Y CON ELLA CALCULA LOS ATRIBUTOS DE CADA UNIDAD
    let lisAtributos = new Array<any>()
    for (let index = 0; index < lisIndices.length; index++) {
        if (lisIndices[index] > 0) {
            // const nivelMaximo = 100
            const nivelMaximo = 30
            const nivel = parseInt(datosJson["HEROE" + lisIndices[index]]["NIVEL"])
            // AHORA CON LOS NIVELES, CALCULAR LOS ATRIBUTOS FINALES
            let sanador = ((13 <= lisIndices[index]) && (lisIndices[index] <= 15) ? true : false)
            const heroeActual = todosLosHeroes[lisIndices[index] - 1]
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
            let proxAtaque = cadencia / 2
            const criticoMaximo = JSON.parse(JSON.stringify(heroeActual))["CRITICOMAX"]
            const criticoMinimo = JSON.parse(JSON.stringify(heroeActual))["CRITICOMIN"]
            let critico = (((criticoMaximo - criticoMinimo) / nivelMaximo) * nivel) + criticoMinimo
            const evasionMaximo = JSON.parse(JSON.stringify(heroeActual))["EVASIONMAX"]
            const evasionMinimo = JSON.parse(JSON.stringify(heroeActual))["EVASIONMIN"]
            let evasion = (((evasionMaximo - evasionMinimo) / nivelMaximo) * nivel) + evasionMinimo
            const aturdirMaximo = JSON.parse(JSON.stringify(heroeActual))["ATURDIRMAX"]
            const aturdirMinimo = JSON.parse(JSON.stringify(heroeActual))["ATURDIRMIN"]
            let aturdir = (((aturdirMaximo - aturdirMinimo) / nivelMaximo) * nivel) + aturdirMinimo
            const indice = lisIndices[index]
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
                "ATURDIR": aturdir,
                "INDICE": indice
            }
            lisAtributos.push(jsonHeroe)
        }
    }
    return lisAtributos;
}
function agregarAtributosObjetos(datosJson: any, lisUnidades: any, lisObjetos: any) {
    // ESTA FUNCION LEE LA LISTA DE ATRIBUTOS DE CADA UNIDAD,
        // Y LES AGREGA LOS ATRIBUTOS DE LOS OBJETOS EQUIPADOS
    for (let i = 0; i < lisUnidades.length; i++) {
        let ataque = parseInt(lisUnidades[i]["ATAQUE"])
        let defensa = parseInt(lisUnidades[i]["DEFENSA"])
        let vidatotal = parseInt(lisUnidades[i]["VIDATOTAL"])
        let regeneracion = parseInt(lisUnidades[i]["REGENERACION"])
        let auxSumatoriaCadenciaObjetos = 0
        let cadencia = parseInt(lisUnidades[i]["CADENCIA"])
        let critico = parseInt(lisUnidades[i]["CRITICO"])
        let evasion = parseInt(lisUnidades[i]["EVASION"])
        let aturdir = parseInt(lisUnidades[i]["ATURDIR"])
        for (let j = 0; j < 5; j++) {
            const indiceObjeto = parseInt(datosJson["HEROE" + lisUnidades[i]["INDICE"]]["OBJETOS"][j])
            if (0 < indiceObjeto) {
                ataque += lisObjetos[indiceObjeto - 1]["ATAQUE"]
                defensa += lisObjetos[indiceObjeto - 1]["DEFENSA"]
                vidatotal += lisObjetos[indiceObjeto - 1]["VIDA"]
                regeneracion += lisObjetos[indiceObjeto - 1]["REGENERACION"]
                auxSumatoriaCadenciaObjetos += lisObjetos[indiceObjeto - 1]["CADENCIA"]
                critico += lisObjetos[indiceObjeto - 1]["CRITICO"]
                evasion += lisObjetos[indiceObjeto - 1]["EVASION"]
                aturdir += lisObjetos[indiceObjeto - 1]["ATURDIR"]
            }
        }
        lisUnidades[i]["ATAQUE"] = ataque
        lisUnidades[i]["DEFENSA"] = defensa
        lisUnidades[i]["VIDATOTAL"] = vidatotal
        lisUnidades[i]["VIDAACTUAL"] = vidatotal
        lisUnidades[i]["REGENERACION"] = regeneracion
        // LA ACELERACION MAXIMA POR OBJETOS ES DE 90%
        let enteroADecimal = 90 < auxSumatoriaCadenciaObjetos ? 90 : auxSumatoriaCadenciaObjetos
        // ASI OBTENGO LA FRACCION RESTANTE A LA ACELERACION, Y CALCULO LA CADENCIA FINAL
        enteroADecimal = (100 - enteroADecimal) / 100
        cadencia *= enteroADecimal
        lisUnidades[i]["CADENCIA"] = cadencia
        lisUnidades[i]["PROXATAQUE"] = cadencia / 2
        lisUnidades[i]["CRITICO"] = critico
        lisUnidades[i]["EVASION"] = evasion
        lisUnidades[i]["ATURDIR"] = aturdir
    }
    return lisUnidades
}
function calcularAtributosEnemigos(lisIndices: any, todosLosEnemigos: any) {
    // ESTA FUNCION LEE UNA LISTA DE INDICES, Y DEVUELVE LOS ATRIBUTOS DE CADA ENEMIGO
    let lisAtributos = new Array<any>()
    for (let index = 0; index < lisIndices.length; index++) {
        const enemigoActual = todosLosEnemigos[lisIndices[index]]
        const nombre = JSON.parse(JSON.stringify(enemigoActual))["NOMBRE"]
        const nivel = JSON.parse(JSON.stringify(enemigoActual))["NIVEL"]
        // const experiencia = JSON.parse(JSON.stringify(enemigoActual))["EXPERIENCIA"]
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
            // "EXPERIENCIA": experiencia,
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
function buscarCurar(indiceSanador: number, lisAliados: any, reloj:number, atacanteHeroe: boolean, lisAtaques: any, lisAcumuladores: any) {
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
    // AHORA INTENTA CURAR
    if (indice >= 0) {
        let curacion = lisAliados[indiceSanador]["ATAQUE"]
        const criticoaux = Math.floor(Math.random() * 100)
        if (criticoaux <= lisAliados[indiceSanador]["CRITICO"]) {
            curacion *= 2;
        }
        let vidaCurada = lisAliados[indice]["VIDAACTUAL"]
        lisAliados[indice]["VIDAACTUAL"] += curacion;
        if (lisAliados[indice]["VIDAACTUAL"] > lisAliados[indice]["VIDATOTAL"]) {
            lisAliados[indice]["VIDAACTUAL"] = lisAliados[indice]["VIDATOTAL"]
        }
        vidaCurada = lisAliados[indice]["VIDAACTUAL"] - vidaCurada
        lisAliados[indiceSanador]["PROXATAQUE"] = reloj + lisAliados[indiceSanador]["CADENCIA"]
        lisAcumuladores[2] += vidaCurada
        
        // AGREGANDO REGISTRO DE CURACIONES. SOLO APLICA SI EFECTIVAMENTE SE CURO A ALGUIEN.
        let lisAtaquesAux = new Array<any>()
        // ESTA CURANDO UN HEROE O ENEMIGO?
        const esHeroe = atacanteHeroe ? "CH" : "CE"
        lisAtaquesAux.push(esHeroe)
        let palabra = lisAliados[indiceSanador]["NOMBRE"] + "   curo " + vidaCurada.toFixed(2) + " PV. a   " + lisAliados[indice]["NOMBRE"]
        lisAtaquesAux.push(palabra)
        lisAtaques.push(lisAtaquesAux)

    } else {
        lisAliados[indiceSanador]["PROXATAQUE"] = reloj + (lisAliados[indiceSanador]["CADENCIA"] / 2)
    }
    let lisRespuesta = new Array<any>()
    lisRespuesta.push(lisAliados)
    lisRespuesta.push(lisAtaques)
    lisRespuesta.push(lisAcumuladores)
    return lisRespuesta;
}
function sumarMonedas(nivel: number, idCamp: number) {
    // ESTA FUNCION CALCULA LA CANTIDAD DE MONEDAS GANADAS POR DERROTAR A UN ENEMIGO.
    // EL VALOR ES ALEATORIO BASADO EN EL NIVEL DEL ENEMIGO DERROTADO, Y LA RUTA TOMADA.
    let multiploRuta = 0
    switch (idCamp) {
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
function sumarExperiencia(nivelEnemigo: number, idCamp: number) {
    // ESTA FUNCION CALCULA LA CANTIDAD DE EXPERIENCIA GANADA POR DERROTAR A UN ENEMIGO.
    // EL VALOR ES ALEATORIO BASADO EN EL NIVEL DEL ENEMIGO DERROTADO, Y LA RUTA TOMADA.
    const expBase = nivelEnemigo * 25
    let multiploRuta = 0
    switch (idCamp) {
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
function calcularAtributosUnSoloHeroe(Indice: any, datosJson: any, todosLosHeroes: any) {
    // ESTA FUNCION CALCULA LOS ATRIBUTOS DE UN SOLO HEROE
        // NO CALCULA EXACTAMENTE TODOS LOS ATRIBUTOS NECESARIOS EN COMBATE.
    // const nivelMaximo = 100
    const nivelMaximo = 30
    const nivel = parseInt(datosJson["HEROE" + Indice]["NIVEL"])
    // AHORA CON LOS NIVELES, CALCULAR LOS ATRIBUTOS FINALES
    const heroeActual = todosLosHeroes[Indice - 1]
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
        "ATAQUE": ataque,
        "DEFENSA": defensa,
        "VIDATOTAL": vidatotal,
        "REGENERACION": regeneracion,
        "CADENCIA": cadencia,
        "CRITICO": critico,
        "EVASION": evasion,
        "ATURDIR": aturdir
    }
    return jsonHeroe;
}
function calcularPuntosHeroe(Heroe: any) {
    const sumatoria = Heroe.VIDATOTAL +
    (Heroe.REGENERACION * 30) +
    (Heroe.DEFENSA * 30) +
    (Heroe.ATAQUE * (1 / Heroe.CADENCIA)) +
    Heroe.CRITICO + Heroe.EVASION + Heroe.ATURDIR
    return Math.floor(sumatoria);
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
