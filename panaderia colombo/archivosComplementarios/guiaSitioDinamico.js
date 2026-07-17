//VIDEO 7 -> instalarexpress y crear un servidor local
//Sitio dinámico: utilizamos express para crear servidor local y poder conectar nuestro front al backend
//NPM INIT (en caso de no haberlo hecho)
//instalar dependencias: mysql  express y motor de vistas (vamos usar ejs)
//crear archivo principal (será el que va en el package.json como main)
//creamos const para hacer el require (importar libreria) de express
//crear objeto para llamar los métodos de express const app = express()

//configurar el puerto para el server (en general el 3000) localhost:3000
//node nombreArchivo.js te hace el link al servidor


//ruta inicial app.get("/ruta inicial",función(req, res))
//res.send -> enviamos mensaje al html


//VIDEO 8 -> 

//crear ruta a archivo estático
//crear ruta a página dinámica
//ahora en vez de send con un mensaje, renderizamos una página, para ello creamos las vistas.
//Organizamos estos archivos en una carpeta, los de configuración y el main por un lado. Y por otro los demás en una carpeta llamada public (la carpeta node_modules NO!)

//ruta de archivos estáticas app.use(express.static("public")) 
//ESTOS PASOS NO ME PERMITEN POR AHORA CONECTARME CON UNA BD

//VIDEO 9 ->
//probar que pasa si el archivo tiene otro nmbre que no sea index.html (no lo encuentra)
//documentación de express  middleware https://expressjs.com/es/
// archivos estáticos: https://expressjs.com/es/starter/static-files.html
//puedo cargar crear todas las url con archivos .html que deseo

//VIDEO 10 formulario con base de datos

//VIDEO 11 comunicar página con BD -> 
//teoría para conectar el archivo con BD debemos cambiar la terminación html por PHP (una de las formas de hacerlo)
//para hacerlo con NODE -> motor de vistas

//VIDEO 12 instalación de motor de plantillas (práctico, el 11 es teorico)
//Hay varios motores de plantilas, elegimos ejs (trabajamos con html y js normal -- como venimos trabajando. Viene intregrado en express)
//instalar motor de plantillas (ejs) https://ejs.co/
//instalación npm install ejs 
//configuraciones: app.set("view engine", "ejs")
//crear carpeta con todas las vistas, debe ser views (nombre por defecto)
//trasladamos los .html y cambiar extensión del archivo a .ejs
//usamos página que no está en public por lo tanto creamos una ruta -> app.get("/", function(req, res))
//Segundo parámetro function donde ta la request y la response (lo que requiere y lo que responde la petición)
//respuesta del servidor sea: res.render("index")   sin la terminación .ejs
//recomendación al archivo .js principal no llamarlo index, propone app.js
//detalles varios sobre las rutas y las terminaciones .ejs y .html

//SIGUIENTES VIDEOS LAS DEMÁS PÁGINAS DEL PROYECTO