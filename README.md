##generar package.json
npm init -y

##instalar express, se usa lib para simplificar la creacion de la api
npm i express

##instala postgreSQL 
npm i pg

##seusa cors para aceptar peticiones segun su config
npm i cors

##instalar nodemon para el ambiente de desarrollo por lo que usamos -D se usa para ver cambios sin necesidad de detener y subir el servidor a cada rato
npm i nodemon -D

##Ya instalado y agregado el script dev se pone a correr la api con
npm run dev