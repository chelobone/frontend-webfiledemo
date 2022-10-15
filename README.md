# Laboratorio carga de archivos: Frontend

### Este es un laboratorio para entender como se comportan las distintas formas de transferir archivos 

## *Tus*

#### Es un estándar de transferencia de archivos. Este framework separa en bloques de bytes el archivo, y los envia al servidor para que este los junte. Pueden revisar esta [prueba de concepto](https://github.com/chelobone/chunkUpload) que realicé el año 2019, para entender como funciona este tipo de estándar

El archivo [FileTus.tsx](src/tus/FileTus.tsx) permite probar la carga de archivos usando el estándar Tus.
#
## *Multi-part upload*

#### Este estándar de carga de archivos permite enviar el archivo en partes separadas en un mismo body

El archivo [File.tsx](src/multipart/File.tsx) permite proba la carga de archivos usando el estándar multipart.

## *Bonus!*

Esta prueba de concepto tiene un agregado, y es que al cargar un archivo usando este estándar, se cargará adicionalmente en un bucket de AWS S3.
#
## Helper
El archivo [Helper.tsx](src/helpers/Helper.tsx) tiene los métodos de consulta al API de prueba de concepto.

## *Backend de carga de archivos*
El proyecto de backend para carga de archivos lo pueden encontrar en este link: [WebFileDemo](https://github.com/chelobone/webfiledemo)

#

### *Para ejecutar localmente*
Para poder ejecutar localmente este proyecto, debes tener la versión 16.16.0
```
git clone
npm install
npm start
```