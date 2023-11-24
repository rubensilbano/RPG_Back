import {Schema, model} from "mongoose";

// AQUI SE GUARDA UNA ABSTRACCION DE LOS VIDEOS.
    // DE OTRO MODO MONGOOSE NO PUEDE INTERPRETAR LA INFORMACION EXTRAIDA DE LA DB.
    // Schema	ES LA ESTRUCTURA U OBJETO QUE DEBEN TENER LOS REGISTROS DE VIDEO
    // model	PARECE ES EL NOMBRE DEL OBJETO, QUE SERA EXPORTADO AL FINAL.
        // IMAGINABA QUE EXPORTARIA UNA INSTANCIA DE videoSchema, PERO NO
const jugadorSchema = new Schema({
    NOMBRE: {
        type: String,
        required: true,
        trim: true,
        // unique   EVITA QUE SE REPITA ESTE CAMPO ENTRE REGISTROS
        unique: true
    },
    CLAVE: {
        type: String,
        required: true,
        trim: true
    },
    HEROE1: {
        type: Object,
        trim: true,
        default: {"NIVEL": 0, "EXPERIENCIA": 0, "OBJETOS": [0, 0, 0, 0, 0]}
    },
    HEROE2: {
        type: Object,
        trim: true,
        default: {"NIVEL": 1, "EXPERIENCIA": 0, "OBJETOS": [0, 0, 0, 0, 0]}
    },
    HEROE3: {
        type: Object,
        trim: true,
        default: {"NIVEL": 0, "EXPERIENCIA": 0, "OBJETOS": [0, 0, 0, 0, 0]}
    },
    HEROE4: {
        type: Object,
        trim: true,
        default: {"NIVEL": 0, "EXPERIENCIA": 0, "OBJETOS": [0, 0, 0, 0, 0]}
    },
    HEROE5: {
        type: Object,
        trim: true,
        default: {"NIVEL": 0, "EXPERIENCIA": 0, "OBJETOS": [0, 0, 0, 0, 0]}
    },
    HEROE6: {
        type: Object,
        trim: true,
        default: {"NIVEL": 0, "EXPERIENCIA": 0, "OBJETOS": [0, 0, 0, 0, 0]}
    },
    HEROE7: {
        type: Object,
        trim: true,
        default: {"NIVEL": 0, "EXPERIENCIA": 0, "OBJETOS": [0, 0, 0, 0, 0]}
    },
    HEROE8: {
        type: Object,
        trim: true,
        default: {"NIVEL": 0, "EXPERIENCIA": 0, "OBJETOS": [0, 0, 0, 0, 0]}
    },
    HEROE9: {
        type: Object,
        trim: true,
        default: {"NIVEL": 0, "EXPERIENCIA": 0, "OBJETOS": [0, 0, 0, 0, 0]}
    },
    HEROE10: {
        type: Object,
        trim: true,
        default: {"NIVEL": 0, "EXPERIENCIA": 0, "OBJETOS": [0, 0, 0, 0, 0]}
    },
    HEROE11: {
        type: Object,
        trim: true,
        default: {"NIVEL": 0, "EXPERIENCIA": 0, "OBJETOS": [0, 0, 0, 0, 0]}
    },
    HEROE12: {
        type: Object,
        trim: true,
        default: {"NIVEL": 0, "EXPERIENCIA": 0, "OBJETOS": [0, 0, 0, 0, 0]}
    },
    HEROE13: {
        type: Object,
        trim: true,
        default: {"NIVEL": 0, "EXPERIENCIA": 0, "OBJETOS": [0, 0, 0, 0, 0]}
    },
    HEROE14: {
        type: Object,
        trim: true,
        default: {"NIVEL": 0, "EXPERIENCIA": 0, "OBJETOS": [0, 0, 0, 0, 0]}
    },
    HEROE15: {
        type: Object,
        trim: true,
        default: {"NIVEL": 0, "EXPERIENCIA": 0, "OBJETOS": [0, 0, 0, 0, 0]}
    },
    HEROE16: {
        type: Object,
        trim: true,
        default: {"NIVEL": 0, "EXPERIENCIA": 0, "OBJETOS": [0, 0, 0, 0, 0]}
    },
    HEROE17: {
        type: Object,
        trim: true,
        default: {"NIVEL": 0, "EXPERIENCIA": 0, "OBJETOS": [0, 0, 0, 0, 0]}
    },
    HEROE18: {
        type: Object,
        trim: true,
        default: {"NIVEL": 0, "EXPERIENCIA": 0, "OBJETOS": [0, 0, 0, 0, 0]}
    },
    HEROE19: {
        type: Object,
        trim: true,
        default: {"NIVEL": 0, "EXPERIENCIA": 0, "OBJETOS": [0, 0, 0, 0, 0]}
    },
    HEROE20: {
        type: Object,
        trim: true,
        default: {"NIVEL": 0, "EXPERIENCIA": 0, "OBJETOS": [0, 0, 0, 0, 0]}
    },
    HEROE21: {
        type: Object,
        trim: true,
        default: {"NIVEL": 0, "EXPERIENCIA": 0, "OBJETOS": [0, 0, 0, 0, 0]}
    },
    HEROE22: {
        type: Object,
        trim: true,
        default: {"NIVEL": 0, "EXPERIENCIA": 0, "OBJETOS": [0, 0, 0, 0, 0]}
    },
    HEROE23: {
        type: Object,
        trim: true,
        default: {"NIVEL": 0, "EXPERIENCIA": 0, "OBJETOS": [0, 0, 0, 0, 0]}
    },
    HEROE24: {
        type: Object,
        trim: true,
        default: {"NIVEL": 0, "EXPERIENCIA": 0, "OBJETOS": [0, 0, 0, 0, 0]}
    },
    CANTIDAD: {
        type: Number,
        trim: true,
        default: 1
    },
    NIVEL: {
        type: Number,
        trim: true,
        default: 1
    },
    EXPERIENCIA: {
        type: Number,
        trim: true,
        default: 0
    },
    MONEDAS: {
        type: Number,
        trim: true,
        default: 500
    },
    ACCION: {
        type: Number,
        trim: true,
        default: 0
    },
    FECHA: {
        type: Date,
        trim: true,
        default: calcularFecha()
    },
    DISPONIBLES: {
        type: Object,
        trim: true,
        default: [[1,1000],[8,500],[3,300],[4,1000],[5,500]]
    },
    ESCUADRON: {
        type: Object,
        trim: true,
        default: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    ZONA: {
        type: Number,
        trim: true,
        default: 1
    },
    ARRAYRUTA: {
        type: Object,
        trim: true,
        default: []
    },
    PROXCAMP: {
        type: Number,
        trim: true,
        default: -1
    },
    ZONARUTA: {
        type: Object,
        trim: true,
        default: [0, 0]
    },
},
{
    versionKey: false, // ES PARA QUE NO APAREZCA EL "__v PROPIO DE MONGOOSE".
    timestamps: false, // ES PARA ADJUNTAR AUTOMATICAMENTE FECHA DE CREACION Y ACTUALIZACION DE LOS REGISTROS.
    
    // ASI SE ESPECIFICA QUE COLECCION SE VA A USAR. TAMBIEN PERMITE USAR COLECCIONES PREVIAS.
        // DE OTRO MODO SE CREA UNA COLECCION POR DEFECTO VACIA, CON EL MISMO NOMBRE DE LA DB
    collection : 'TBL_Jugadores'
});
function calcularFecha() {
    // CALCULA Y DEVUELVE EL DIA ACTUAL CON UN MES DE DEMORA.
        // ESTO ES PARA QUE LA RUTA tavern PUEDA EJECUTARSE EL MISMO DIA DEL REGISTRO.
        // LA RUTA tavern ES DEMASIADO GRANDE COMO PARA EJECUTARLA AQUI
    let hoy = new Date();
    hoy.setUTCMonth(hoy.getUTCMonth() - 1)
    return hoy;
}
// model(NOMBRE QUE TENDRA EL OBJETO EXPORTADO)
export default model('Jugador', jugadorSchema);
