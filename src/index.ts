import app from './app'
// SI NO SE INCLUYE ./database AQUI, CIERRA TODAS LAS PETICIONES HTTP
import './database'

//INICIANDO SERVIDOR CON EXPRESS
// USANDO LA VARIABLE port, DESDE app
app.listen(app.get('port'), () => {
    console.log('Servidor iniciado en el puerto :', app.get('port'));
})