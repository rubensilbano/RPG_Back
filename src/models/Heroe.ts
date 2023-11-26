import {Schema, model} from "mongoose";

// AQUI SE GUARDA UNA ABSTRACCION DEL REGISTRO.
    // DE OTRO MODO MONGOOSE NO PUEDE INTERPRETAR LA INFORMACION EXTRAIDA DE LA DB.
    // Schema	ES LA ESTRUCTURA U OBJETO QUE DEBEN TENER LOS REGISTROS DE HEROE
    // model	PARECE ES EL NOMBRE DEL OBJETO, QUE SERA EXPORTADO AL FINAL.
const heroeSchema = new Schema({
    NOMBRE: {
        type: String,
        required: true,
        trim: true,
        // unique   EVITA QUE SE REPITA ESTE CAMPO ENTRE REGISTROS
        unique: true
    },
    ATAQUEMIN: {
        type: Number,
        trim: true
    },
    ATAQUEMAX: {
        type: Number,
        trim: true
    },
    DEFENSAMIN: {
        type: Number,
        trim: true
    },
    DEFENSAMAX: {
        type: Number,
        trim: true
    },
    VIDAMIN: {
        type: Number,
        trim: true
    },
    VIDAMAX: {
        type: Number,
        trim: true
    },
    REGENMIN: {
        type: Number,
        trim: true
    },
    REGENMAX: {
        type: Number,
        trim: true
    },
    CADENCIAMIN: {
        type: Number,
        trim: true
    },
    CADENCIAMAX: {
        type: Number,
        trim: true
    },
    CRITICOMIN: {
        type: Number,
        trim: true
    },
    CRITICOMAX: {
        type: Number,
        trim: true
    },
    EVASIONMIN: {
        type: Number,
        trim: true
    },
    EVASIONMAX: {
        type: Number,
        trim: true
    },
    ATURDIRMIN: {
        type: Number,
        trim: true
    },
    ATURDIRMAX: {
        type: Number,
        trim: true
    }
},
{
    versionkey: false, // DIJO QUE ES PARA QUE NO APAREZCA EL "WW PROPIO DE MONGOOSE"
    timestamps: false, // ES PARA ADJUNTAR AUTOMATICAMENTE FECHA DE CREACION Y ACTUALIZACION DE LOS REGISTROS.
    
    // ASI SE ESPECIFICA QUE COLECCION SE VA A USAR. TAMBIEN PERMITE USAR COLECCIONES PREVIAS.
        // DE OTRO MODO SE CREA UNA COLECCION POR DEFECTO VACIA, CON EL MISMO NOMBRE DE LA DB
    collection : 'TBL_Heroes'
});

// model(NOMBRE QUE TENDRA EL OBJETO EXPORTADO)
export default model('Heroe', heroeSchema);
