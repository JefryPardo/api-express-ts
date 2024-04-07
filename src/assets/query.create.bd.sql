
-- CREATE DATABASE "tesis-bd"

-- 1
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE Producto (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion VARCHAR(255),
    url_imagen VARCHAR(1000)[],
    referencia VARCHAR(255),
    referencia_local VARCHAR(255),
    precio DECIMAL(10, 2),
    ficha_tecnica VARCHAR(255),
    unidades VARCHAR(255),
    estado VARCHAR(255),
    categoria VARCHAR(255),
    tipo VARCHAR(255),
    marca VARCHAR(255)
);
-- 1


-- 2
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
-- 2


-- 3
CREATE TABLE Ganancia (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    id_usuario VARCHAR(255),
    id_producto VARCHAR(255),
    porcentaje_ganancia DECIMAL(2, 2)
);
-- 3

-- 4
CREATE TABLE Cotizacion (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nombre VARCHAR(255),
    fecha_creacion VARCHAR(255),
    fecha_vencimiento VARCHAR(255),
    nombre_cliente VARCHAR(255),
    cedula_cliente VARCHAR(255),
    correo_cliente VARCHAR(255),
    id_usuario VARCHAR(255)
);

CREATE TABLE Cotizacion_Producto (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    cantidad VARCHAR(255),
    id_producto VARCHAR(255),
    id_cotizacion VARCHAR(255)
);
-- 4


-- productos repositorio img
-- https://github.com/JefryPardo/tesis-img/tree/master/producto

INSERT INTO usuario (id, nombre,apellido, direccion, celular,fecha_creacion, intentos_fallidos, clave, usuario, estado) VALUES ('a2fbca23-dbdb-42f5-beeb-448cf0a19e00','jeff','pardo','call 1','3022318153','2023-10-23 13:32:00','0','$2b$10$lB.eLeFr0xz2Xl7hQ32THu9k/rYW2P0WXKMWxCOrL.8fIQ34NyhDW','jeffryjhoan1996@gmail.com','activo');
INSERT INTO rol (id,rol, estado) VALUES ('b19517e2-b383-4656-8099-67d49ca3a8c7','usuario','activo');
INSERT INTO usuario_rol (id_usuario, id_rol) VALUES ('a2fbca23-dbdb-42f5-beeb-448cf0a19e00','b19517e2-b383-4656-8099-67d49ca3a8c7');

INSERT INTO producto (nombre, descripcion, url_imagen, referencia, referencia_local, precio, ficha_tecnica, unidades, estado, categoria, tipo, marca)
VALUES
    ('Cable para señal UTP Gris', 'Nuevo CABLE especial para SEÑAL DE VIDEO CCTV,  TIPO UTP CCA, pares trenzados Cat. 5E 4X2X24 AWG, diámetro 0,51 (Gris) PARA INTERIOR, ideal para distancias inferiores a 30 metros', ARRAY['https://raw.githubusercontent.com/JefryPardo/tesis-img/master/producto/CSIUTP5ECAG-CCTV.jpg'], 'CSIUTP5ECAG-CCTV', 'CABLES SUPERIORES', 1300.99, '', '1582', 'activo', '', 'cable', ''),
    ('Cable para señal UTP Gris', 'Nuevo CABLE especial para SEÑAL DE VIDEO CCTV,  TIPO UTP CCA, pares trenzados Cat. 5E 4X2X24 AWG, diámetro 0,51 (Blanco) PARA INTERIOR, ideal para distancias inferiores a 30 metros.', ARRAY['https://raw.githubusercontent.com/JefryPardo/tesis-img/master/producto/CSIUTP5ECAW-CCTV.jpg'], 'CSIUTP5ECAW-CCTV', 'CABLES SUPERIORES', 1800.00, '', '2340', 'activo', '', 'cable', ''),
    ('Video balun pasivo (presentación x par)', 'Video balun pasivo (presentación x par) , distancia máxima de 330 mt, terminal Push Pin, cable de 15cm mini-coax, Pig Tale', ARRAY['https://raw.githubusercontent.com/JefryPardo/tesis-img/master/producto/LY-VB330PPTEL.jpg'], 'LY-VB330PPTEL', 'balun pasivo', 4700.99, '', '678', 'activo', '', 'equipo', ''),
    ('Cámara Mini bala 4 en 1', 'NUEVA Cámara Mini bala 4 en 1, HD-TVI/AHD/CVI/CVBS, 2 MP(1080p), IR Smart Led 20m, Sensor CMOS, lente fijo 2.8mm, ICR, EXIR 2.0, IP66, 12VDC-500mA. Plástica', ARRAY['https://raw.githubusercontent.com/JefryPardo/tesis-img/master/producto/THC-B120-P.jpg'], 'THC-B120-P', 'CANON-001', 49900.95, 'Especificaciones de la cámara', '12 unidades', 'activo', '', 'equipo', '');