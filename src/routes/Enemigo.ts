import {Schema, model} from "mongoose";

// AQUI SE GUARDA UNA ABSTRACCION DE LOS VIDEOS.
    // DE OTRO MODO MONGOOSE NO PUEDE INTERPRETAR LA INFORMACION EXTRAIDA DE LA DB.
    // Schema	ES LA ESTRUCTURA U OBJETO QUE DEBEN TENER LOS REGISTROS DE VIDEO
    // model	PARECE ES EL NOMBRE DEL OBJETO, QUE SERA EXPORTADO AL FINAL.
        // IMAGINABA QUE EXPORTARIA UNA INSTANCIA DE videoSchema, PERO NO
const enemigoSchema = new Schema({
    NOMBRE: {
        type: String,
        required: true,
        trim: true,
        // unique   EVITA QUE SE REPITA ESTE CAMPO ENTRE REGISTROS
        unique: true
    },
    NIVEL: {
        type: Number,
        trim: true
    },
    INDICE: {
        type: Number,
        trim: true
    },
    ZONA: {
        type: String,
        trim: true
    },
    RANGO: {
        type: Boolean,
        trim: true
    },
    PUNTOSBATALLA: {
        type: Number,
        trim: true
    },
    // EXPERIENCIA: {
    //     type: Number,
    //     trim: true
    // },
    ATAQUE: {
        type: Number,
        trim: true
    },
    DEFENSA: {
        type: Number,
        trim: true
    },
    VIDA: {
        type: Number,
        trim: true
    },
    REGENERACION: {
        type: Number,
        trim: true
    },
    CADENCIA: {
        type: Number,
        trim: true
    },
    CRITICO: {
        type: Number,
        trim: true
    },
    EVASION: {
        type: Number,
        trim: true
    },
    ATURDIR: {
        type: Number,
        trim: true
    }
},
{
    versionkey: false, // DIJO QUE ES PARA QUE NO APAREZCA EL "WW PROPIO DE MONGOOSE"
    timestamps: false, // ES PARA ADJUNTAR AUTOMATICAMENTE FECHA DE CREACION Y ACTUALIZACION DE LOS REGISTROS.
    
    // ASI SE ESPECIFICA QUE COLECCION SE VA A USAR. TAMBIEN PERMITE USAR COLECCIONES PREVIAS.
        // DE OTRO MODO SE CREA UNA COLECCION POR DEFECTO VACIA, CON EL MISMO NOMBRE DE LA DB
    collection : 'TBL_Enemigos'
});

// model(NOMBRE QUE TENDRA EL OBJETO EXPORTADO)
export default model('Enemigo', enemigoSchema);
