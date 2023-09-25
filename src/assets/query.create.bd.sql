
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
    token VARCHAR(255),
    secret VARCHAR(255),
    fechaCreacion TIMESTAMP,
    intentosFallidos VARCHAR(2),
    clave VARCHAR(255),
    login VARCHAR(255),
    activo BOOLEAN
);

CREATE TABLE Usuario_Rol (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    idUsuario VARCHAR(255),
    idRol VARCHAR(255)
);

CREATE TABLE Rol (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    rol VARCHAR(255)
);

CREATE TABLE Rol_Permiso (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    idRol VARCHAR(255),
    idPermiso VARCHAR(255)
);

CREATE TABLE Permiso (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    permiso VARCHAR(255)
);

CREATE TABLE Categoria (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nombre VARCHAR(255)
);

CREATE TABLE Configuracion_Ganancia (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    idUsuario VARCHAR(255),
    idCategoria VARCHAR(255),
    porcentajeGanancia DECIMAL(2, 2)
);

CREATE TABLE Cotizacion_Producto (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    idUsuario VARCHAR(255),
    idCategoria VARCHAR(255)
);

CREATE TABLE Producto (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion VARCHAR(255),
    referencia VARCHAR(255),
    referenciaLocal VARCHAR(255),
    precio DECIMAL(10, 2),
    fichaTecnica VARCHAR(255),
    unidades VARCHAR(255),
    idCategoria VARCHAR(255),
    idTipo VARCHAR(255),
    idMarca VARCHAR(255)
);

CREATE TABLE Cotizacion (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    idProducto VARCHAR(255),
    idCotizacion VARCHAR(255)
);

CREATE TABLE Marca (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    marca VARCHAR(255)
);

CREATE TABLE Tipo (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tipo VARCHAR(255)
);


-- insert
INSERT INTO Rol (rol)
VALUES ('Administrador');

INSERT INTO Rol (rol)
VALUES ('Asesor');