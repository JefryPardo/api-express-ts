##generar package.json
npm init -y

##instalar express, se usa lib para simplificar la creacion de la api
npm i express

#typescript
npm install -g ts-node


##instala postgreSQL 
npm i pg

##seusa cors para aceptar peticiones segun su config
npm i cors

##instalar nodemon para el ambiente de desarrollo por lo que usamos -D se usa para ver cambios sin necesidad de detener y subir el servidor a cada rato
npm i nodemon -D

##Ya instalado y agregado el script dev se pone a correr la api con
npm run local

#permite hacer validaciones con un nivel de seguridad alto, ejemplo validar correo
npm install validator
npm install @types/validator --save-dev

#uso de token jwt
npm i jsonwebtoken
npm install --save-dev @types/jsonwebtoken


#se usa para el encriptado de claves
npm install bcrypt
npm install --save-dev @types/bcrypt

#Nos ayudara a validar que tan fuerte es el password
npm install zxcvbn
npm install @types/zxcvbn --save-dev


#Nos ayuda con el tema de fechas y su formato
npm install moment
