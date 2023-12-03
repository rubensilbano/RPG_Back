// ENDPOINTS PARA ELEGIR ZONA, RUTA, CAMPAMENTO, E INICIAR UNA PELEA Y MOSTRAR RESULTADOS.

// ESTE ES UN MANEJADOR PARA LAS RUTAS DE LAS PETICIONES ENVIADAS DESDE EL FRONTEND.
    //ESTA ES LA ESPECIFICACION E IMPLEMENTACION A LAS RUTAS
import { RequestHandler } from "express"
// PERMITE MANEJAR FUNCIONES ASINCRONAS CON EXPRESS
import Jugador from "../models/Jugador";
import Heroe from "../models/Heroe";
import Enemigo from "../models/Enemigo";

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

        console.log(idZona)
        console.log((idZona > 0))
        console.log((idZona < 11))
        console.log((idZona > 0) && (idZona < 11))

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
            default:
                puntosNecesarios = 1
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
                    monedasFinal = datosJson["MONEDAS"] + monedasRecompensa
                    proxCampamentoJugador = indiceGuardado + 1
                    if (proxCampamentoJugador > datosJson["ARRAYRUTA"].length - 1) {
                        if ((datosJson["ZONARUTA"][0] == datosJson["ZONA"]) && (datosJson["ZONA"] < 10)) {
                            zonaJugador += 1
                        }
                        proxCampamentoJugador = -1
                    }
                } else {
                    // EN CASO DE DERROTA
                    monedasFinal = datosJson["MONEDAS"] + Math.floor(monedasRecompensa / 2)
                    experienciaRecompensa = Math.floor(experienciaRecompensa / 2)
                }
                // GUARDANDO EXP PARA CADA HEROE EN EL ESCUADRON
                for (let i = 0; i < datosJson["ESCUADRON"].length; i++) {
                    if ((parseInt(datosJson["ESCUADRON"][i]) > 0) && (datosJson["HEROE" + datosJson["ESCUADRON"][i]]["NIVEL"] < 30)) {
                        // SUBIR DE NIVEL CADA HEROE EN EL ESCUADRON
                        let nuevoNivel = datosJson["HEROE" + datosJson["ESCUADRON"][i]]["NIVEL"]
                        let expNecesaria = 50 * (nuevoNivel**2 + nuevoNivel - 2)
                        let experienciaHeroe = datosJson["HEROE" + datosJson["ESCUADRON"][i]]["EXPERIENCIA"] + experienciaRecompensa
                        while (experienciaHeroe >= expNecesaria) {
                            nuevoNivel += 1
                            experienciaHeroe = experienciaHeroe - expNecesaria
                            expNecesaria = 50 * (nuevoNivel**2 + nuevoNivel - 2)
                            if (nuevoNivel == 30) {
                                experienciaHeroe = 0
                            }
                        }
                        const heroeJson = {
                            "NIVEL": nuevoNivel,
                            "EXPERIENCIA": experienciaHeroe,
                            "OBJETOS": [0, 0, 0, 0, 0]
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
                // ESTE SI ES EL ULTIMO CAMBIO QUE ASEGURA GUARDAR EL RESULTADO DEL COMBATE.
                    // Y ES EL QUE SE DEVUELVE AL App DEL FRONTEND.
                jugador = await Jugador.findOneAndUpdate({"NOMBRE": req.body.NOMBRE}, {$set : {"MONEDAS": monedasFinal, "NIVEL": nuevoNivel, "EXPERIENCIA": experienciaJugador, "ACCION": accionJugador, "PROXCAMP": proxCampamentoJugador, "ZONA": zonaJugador}}, {new: true})
                
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
