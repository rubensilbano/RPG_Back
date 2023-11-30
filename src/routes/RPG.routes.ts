// ACA ESTAN SOLAMENTE LAS RUTAS PARA EL CRUD, DE LOS OBJETOS VIDEO.
// ROUTER ES LA FUNCION DE EXPRESS, PARA MANEJAR RUTAS
    //ESTE ES UN INTERMEDIARIO PARA RECIBIR LOS LLAMADOS A LAS RUTAS, PERO NO LAS RESUELVE.
    //LLAMA A LAS IMPLEMENTACIONES EN videos.controller
import { Router } from "express"
const router = Router();

// * IMPORTA TODO EL MODULO, Y LE ASIGNA UN APODO rpgCtrl
import * as adminCtrl from "../controllers/Admin.controller";
import * as heroCtrl from "../controllers/CustomHero.controller";
import * as logRegCtrl from "../controllers/LogReg.controller";
import * as rpgCtrl from "../controllers/RPG.controller";

// UNA MISMA RUTA PUEDE TENER DOS CONTROLADORES DISTINTOS.
    // SI ESTOS SON DIFERENCIADOS POR LA CANTIDAD DE ARGUMENTOS/PROPS, O EL METODO HTTP

router.post('/createPlayer', logRegCtrl.createPlayer);
router.post('/login', logRegCtrl.login);



// ESTA RUTA ES SOLO PARA DESARROLLO, MUESTRA TODOS LOS REGISTROS EN LA TABLA Jugadores.
// NO DEBE EXISTIR EN EL DEPLOY.
router.get('/allPlayers', adminCtrl.getAllPlayers);
// ESTA RUTA SIRVE PARA CREAR LOS REGISTROS CONSTANTES EN LAS TABLAS HEROES Y ENEMIGOS.
// ESTO DEBIDO A QUE RAILWAY NO PERMITE INGRESAR MAS QUE UN REGISTRO A LA VEZ.
router.get('/ASD123', adminCtrl.respaldo);

// ESTAS SON LAS RUTAS DEL ANTERIOR PROYECTO. NO OLVIDAR ELIMINARLAS
router.delete('/videos/:id', adminCtrl.deleteVideo);



// router.get('/tavern', rpgCtrl.tavern);
router.post('/getHeroNames', heroCtrl.getHeroNames);
// router.put('/buyHero/:id', rpgCtrl.buyHero);
router.post('/buyHero', heroCtrl.buyHero);
// LA RUTA getAvailable NO ES NECESARIA.
router.get('/getAvailable', heroCtrl.getAvailable);
// router.put('/setSquad', rpgCtrl.setSquad);
router.post('/setSquad', heroCtrl.setSquad);


// router.get('/zone/:id', rpgCtrl.getZone);
router.post('/zone', rpgCtrl.getZone);
// router.get('/route/:zone/:route', rpgCtrl.getRoute);
router.post('/route', rpgCtrl.getRoute);
// router.get('/battle/:zone/:route/:camp', rpgCtrl.battle);
router.post('/battle', rpgCtrl.battle);

export default router;
    