### Variables de entorno
**Crear el archivo .env con las siguientes variables**
- DATABASE_URL= **"colocar el connectstring"**
- API_PORT= **"colocar el puerto del servidor"**
- TOKENKKEY= **"llave secreta para el token"**


## Diseño de la base de datos
![alt text](./arquitectura/db.PNG)

### Palabras claves de las base de datos
|abreviatura | significado |
|------------|--------|
|tma|tabla maestra|
|thist|tabla historia|
|code |llave primaria|
|pfcode|llave foranea|

### Nombre de las tablas 

|nombre de la tbls|significados|
|-------------|----------------------------|
|tmaecomponent|tabla maestra de componentes de los equipos que se disponen|
|tmaesoft|tabla maestra de los software que se dispone|
|tmaeusuar|tabla maestra de usuario del sistema|
|tmaedepartament |tabla maestra de departamentos|
|thistproveed |tabla historica del proveedor de cada componente|
|thistctrolrequipo |tabla historica de control de equipo|
|thistcomponentred |tabla historica de componentes de red y sus configuraciones|

