// ENDPOINTS DE USO EXCLUSIVO PARA EL DESARROLLO.
import { RequestHandler } from "express"
import Jugador from "../models/Jugador";
import Heroe from "../models/Heroe";
import Enemigo from "../models/Enemigo";
import Objeto from "../models/Objeto";
import arrayHeroes from "./Heroes.json";
import arrayEnemigos from "./Enemigos.json";
import arrayObjetos from "./Objetos.json";

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
    // ESTO DEBIDO A QUE RAILWAY NO PERMITE INGRESAR MAS QUE UN REGISTRO A LA VEZ.
export const respaldo: RequestHandler = async (req,res) => {
    try {
        const heroes = await Heroe.insertMany(
            arrayHeroes
        )
        const enemigos = await Enemigo.insertMany(
            arrayEnemigos
        )
        const objetos = await Objeto.insertMany(
            arrayObjetos
        )
        return res.json({
        "message": "HEROES Y ENEMIGOS GENERADOS EXITOSAMENTE!!!",
        "heroes": heroes,
        "enemigos": enemigos,
        "objetos": objetos
        });
    } catch (error) {
        res.json(error)
    }
}

// DELETE VIDEO, BASICAMENTE ES LO MISMO QUE LA FUNCION getVideo
    // NECESARIO PARA ELIMINAR REGISTROS DE USUARIOS INACTIVOS
export const deleteVideo: RequestHandler = async (req,res) => {
    const videoFound = await Jugador.findByIdAndDelete(req.params.id);
    if (!videoFound) return res.status(204).json();
    return res.json(videoFound);
}