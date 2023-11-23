// ACA ESTAN SOLAMENTE LAS RUTAS PARA EL CRUD, DE LOS OBJETOS VIDEO.
// ROUTER ES LA FUNCION DE EXPRESS, PARA MANEJAR RUTAS
    //ESTE ES UN INTERMEDIARIO PARA RECIBIR LOS LLAMADOS A LAS RUTAS, PERO NO LAS RESUELVE.
    //LLAMA A LAS IMPLEMENTACIONES EN videos.controller
import { Router } from "express"
const router = Router();

// * IMPORTA TODO EL MODULO, Y LE ASIGNA UN APODO videoCtrl
import * as videoCtrl from "./RPG.controller";

// UNA MISMA RUTA PUEDE TENER DOS CONTROLADORES DISTINTOS.
    // SI ESTOS SON DIFERENCIADOS POR LA CANTIDAD DE ARGUMENTOS/PROPS, O EL METODO HTTP

router.post('/createPlayer', videoCtrl.createPlayer);
router.post('/login', videoCtrl.login);


router.get('/allPlayers', videoCtrl.getAllPlayers);



// ESTAS SON LAS RUTAS DEL ANTERIOR PROYECTO. NO OLVIDAR ELIMINARLAS
router.delete('/videos/:id', videoCtrl.deleteVideo);



// router.get('/tavern', videoCtrl.tavern);
router.post('/tavern', videoCtrl.tavern);
// router.put('/buyHero/:id', videoCtrl.buyHero);
router.post('/buyHero', videoCtrl.buyHero);

// LA RUTA getAvailable NO ES NECESARIA.
router.get('/getAvailable', videoCtrl.getAvailable);
// router.put('/setSquad', videoCtrl.setSquad);
router.post('/setSquad', videoCtrl.setSquad);

// router.get('/zone/:id', videoCtrl.getZone);
router.post('/zone', videoCtrl.getZone);
// router.get('/route/:zone/:route', videoCtrl.getRoute);
router.post('/route', videoCtrl.getRoute);
// router.get('/battle/:zone/:route/:camp', videoCtrl.battle);
router.post('/battle', videoCtrl.battle);

export default router;
    