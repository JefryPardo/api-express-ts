
-- CREATE DATABASE "tesis-bd"
--     WITH
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'Spanish_Latin America.1252'
--     LC_CTYPE = 'Spanish_Latin America.1252'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1;

CREATE TABLE Usuario (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    direccion VARCHAR(255),
    celular VARCHAR(15),
    fecha_creacion TIMESTAMP,
    intentos_fallidos VARCHAR(2),
    clave VARCHAR(255),
    usuario VARCHAR(255),
    estado VARCHAR(15)
);

CREATE TABLE Usuario_Rol (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    id_usuario VARCHAR(255),
    id_rol VARCHAR(255)
);

CREATE TABLE Rol (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    rol VARCHAR(255),
    estado VARCHAR(255)
);

CREATE TABLE Rol_Permiso (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    id_rol VARCHAR(255),
    id_permiso VARCHAR(255)
);

CREATE TABLE Permiso (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    permiso VARCHAR(255),
    estado VARCHAR(255)
);

CREATE TABLE Categoria (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nombre VARCHAR(255)
);

CREATE TABLE Ganancia (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    id_usuario VARCHAR(255),
    id_producto VARCHAR(255),
    porcentaje_ganancia DECIMAL(2, 2)
);

CREATE TABLE Cotizacion_Producto (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    id_usuario VARCHAR(255),
    id_categoria VARCHAR(255)
);

CREATE TABLE Producto (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion VARCHAR(255),
    referencia VARCHAR(255),
    referencia_local VARCHAR(255),
    precio DECIMAL(10, 2),
    ficha_tecnica VARCHAR(255),
    unidades VARCHAR(255),
    estado VARCHAR(255),
    id_categoria VARCHAR(255),
    id_tipo VARCHAR(255),
    id_marca VARCHAR(255)
);

CREATE TABLE Cotizacion (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    id_producto VARCHAR(255),
    id_cotizacion VARCHAR(255)
);

CREATE TABLE Marca (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    marca VARCHAR(255)
);

CREATE TABLE Tipo (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tipo VARCHAR(255)
);


INSERT INTO usuario (id, nombre,apellido, direccion, celular,fecha_creacion, intentos_fallidos, clave, usuario, estado) VALUES ('a2fbca23-dbdb-42f5-beeb-448cf0a19e00','jeff','pardo','call 1','3022318153','2023-10-23 13:32:00','0','$2b$10$lB.eLeFr0xz2Xl7hQ32THu9k/rYW2P0WXKMWxCOrL.8fIQ34NyhDW','jeffryjhoan1996@gmail.con','activo');
INSERT INTO rol (rol, estado) VALUES ('usuario','activo');
INSERT INTO usuario_rol (id_usuario, id_rol) VALUES ('a2fbca23-dbdb-42f5-beeb-448cf0a19e00','b19517e2-b383-4656-8099-67d49ca3a8c7');