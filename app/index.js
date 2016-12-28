
// de electron nos traemos app y BrowserWindow
const { app, BrowserWindow } = require('electron');
// definimos `window`, acá vamos a guardar la instancia de BrowserWindow actual
let window;
// cuando nuestra app haya terminado de iniciar va a disparar el evento `ready`
// lo escuchamos y ejecutamos la función `createWindow`
app.on('ready', crearVentana);
// escuchamos el evento `window-all-closed` y si no estamos en Mac cerramos la aplicación
// lo de Mac es debido a que en este SO es común que se pueda cerrar todas las ventanas sin cerrar
// la aplicación completa
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
// definimos la función `crearVentana`
function crearVentana() {
  // instanciamos BrowserWindow, esto va a iniciar un proceso `renderer`
  window = new BrowserWindow({
    height: 768,
    width: 1024,
  });
  window.setMenu(null);
  // le decimos a nuestro `renderer` que cargue un archivo que tenemos en `statics/index.html`
  // acá podríamos cargar cualquier URL, por ejemplo podríamos haber iniciado un servidor HTTP
  // y luego cargar la URL de este servidor
  window.loadURL(`file://${__dirname}/index.html`);
  window.on('closed', () => {
    // por último escuchamos el evento `closed` de la ventana para limpar la variable `window`
    // de esta forma permitimos matar la ventana sin matar al aplicación
    window = null
  });
}
