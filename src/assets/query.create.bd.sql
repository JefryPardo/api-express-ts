
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
    id_producto VARCHAR(255),
    id_cotizacion VARCHAR(255)
);

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
    id_categoria VARCHAR(255),
    id_tipo VARCHAR(255),
    id_marca VARCHAR(255)
);

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

CREATE TABLE Marca (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    marca VARCHAR(255)
);

CREATE TABLE Tipo (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tipo VARCHAR(255)
);


INSERT INTO usuario (id, nombre,apellido, direccion, celular,fecha_creacion, intentos_fallidos, clave, usuario, estado) VALUES ('a2fbca23-dbdb-42f5-beeb-448cf0a19e00','jeff','pardo','call 1','3022318153','2023-10-23 13:32:00','0','$2b$10$lB.eLeFr0xz2Xl7hQ32THu9k/rYW2P0WXKMWxCOrL.8fIQ34NyhDW','jeffryjhoan1996@gmail.con','activo');
INSERT INTO rol (id,rol, estado) VALUES ('b19517e2-b383-4656-8099-67d49ca3a8c7','usuario','activo');
INSERT INTO usuario_rol (id_usuario, id_rol) VALUES ('a2fbca23-dbdb-42f5-beeb-448cf0a19e00','b19517e2-b383-4656-8099-67d49ca3a8c7');

INSERT INTO categoria (nombre) values('camara'),('televisor'),('celular'),('portatil');
INSERT INTO tipo (tipo) values('led'),('smart'),('slim'),('digital');
INSERT INTO marca (marca) values('lg'),('samsung'),('sony'),('acer');


INSERT INTO producto (nombre, descripcion, url_imagen, referencia, referencia_local, precio, ficha_tecnica, unidades, estado, id_categoria, id_tipo, id_marca)
VALUES
    ('Laptop Acer', 'Una poderosa laptop Acer', ARRAY['https://olimpica.vtexassets.com/arquivos/ids/1065782/5223975.3.electro.jpg?v=638161519405670000', 'https://olimpica.vtexassets.com/arquivos/ids/1065781-1200-auto?v=638161519252570000&width=1200&height=auto&aspect=true', 'https://olimpica.vtexassets.com/arquivos/ids/1065780-1200-auto?v=638161519133700000&width=1200&height=auto&aspect=true'], '12345', 'ACER-001', 1230400.99, 'Especificaciones de la laptop', '10 unidades', 'activo', '503ed8e6-bd0d-4260-a498-00e513884fb9', '1', '1'),
    ('Teléfono Samsung Galaxy S21', 'Un teléfono inteligente de alta gama', ARRAY['https://www.alkosto.com/medias/750Wx750H-master-hotfolder-transfer-incoming-deposit-hybris-interfaces-IN-media-product-8806092837812-004.jpg?context=bWFzdGVyfGltYWdlc3wxNzIxMnxpbWFnZS9qcGVnfGFEUTVMMmc1WWk4eE16ZzVPVE0xTWpJM056QXlNaTgzTlRCWGVEYzFNRWhmYldGemRHVnlMMmh2ZEdadmJHUmxjaTkwY21GdWMyWmxjaTlwYm1OdmJXbHVaeTlrWlhCdmMybDBMMmg1WW5KcGN5MXBiblJsY21aaFkyVnpMMGxPTDIxbFpHbGhMM0J5YjJSMVkzUXZPRGd3TmpBNU1qZ3pOemd4TWw4d01EUXVhbkJufDk1ZTExZmE0ZGFhMDZhOTljYzJkZTZkZmQ5YTU0NmEyYTQyNzVkYjMwMmE1MWUxMGRlNjMyYWQ2Y2RiZjNkNDk','https://www.alkosto.com/medias/750Wx750H-master-hotfolder-transfer-incoming-deposit-hybris-interfaces-IN-media-product-8806092837812-003.jpg?context=bWFzdGVyfGltYWdlc3wxNzc0NDJ8aW1hZ2UvanBlZ3xhRFV6TDJobU55OHhNemc1T1RNMU1UWTROekU1T0M4M05UQlhlRGMxTUVoZmJXRnpkR1Z5TDJodmRHWnZiR1JsY2k5MGNtRnVjMlpsY2k5cGJtTnZiV2x1Wnk5a1pYQnZjMmwwTDJoNVluSnBjeTFwYm5SbGNtWmhZMlZ6TDBsT0wyMWxaR2xoTDNCeWIyUjFZM1F2T0Rnd05qQTVNamd6TnpneE1sOHdNRE11YW5CbnxhMGI2NDBkMDZjYjk2OGFmMmViNWQ2MDE4NTlkNTllMGVjZjM3ODU2MzkwYWU0Mjk4ZDkwMmFmNzA5OTNlYjcz','https://www.alkosto.com/medias/750Wx750H-master-hotfolder-transfer-incoming-deposit-hybris-interfaces-IN-media-product-8806092837812-001.jpg?context=bWFzdGVyfGltYWdlc3wyMDYzODZ8aW1hZ2UvanBlZ3xhRGsxTDJnNVlTOHhNemc1T1RNMU1EVXdOelUxTUM4M05UQlhlRGMxTUVoZmJXRnpkR1Z5TDJodmRHWnZiR1JsY2k5MGNtRnVjMlpsY2k5cGJtTnZiV2x1Wnk5a1pYQnZjMmwwTDJoNVluSnBjeTFwYm5SbGNtWmhZMlZ6TDBsT0wyMWxaR2xoTDNCeWIyUjFZM1F2T0Rnd05qQTVNamd6TnpneE1sOHdNREV1YW5CbnwyN2FkNjJmN2RjZTA1MDkxMmQ0NWM5NDM1YjdiZGFkNjVjOGI4ZGRhMjhiZDkyMWY2ZjU4ODhhMjg0MmEzNWVi'], '67890', 'SAMSUNG-001', 799.00, 'Especificaciones del teléfono', '5 unidades', 'activo', 'b0e55f2c-4f20-47a5-bd01-569b867215b6', '2', '2'),
    ('TV LED LG 55 pulgadas', 'Televisor LG con resolución 4K', ARRAY['https://www.alkosto.com/medias/750Wx750H-master-hotfolder-transfer-incoming-deposit-hybris-interfaces-IN-media-product-8806091856739-002.jpg?context=bWFzdGVyfGltYWdlc3wxNjg0Mjh8aW1hZ2UvanBlZ3xhRFV6TDJobFlTOHhNemd4TkRrek5UQTJNRFV4TUM4M05UQlhlRGMxTUVoZmJXRnpkR1Z5TDJodmRHWnZiR1JsY2k5MGNtRnVjMlpsY2k5cGJtTnZiV2x1Wnk5a1pYQnZjMmwwTDJoNVluSnBjeTFwYm5SbGNtWmhZMlZ6TDBsT0wyMWxaR2xoTDNCeWIyUjFZM1F2T0Rnd05qQTVNVGcxTmpjek9WOHdNREl1YW5CbnwzOWEwMTdlZmZkYWE3MjI3MjczOGNlNDIxNmNlODlkNWY4NzllOWQ3MDUwZmVjMjI1ZDlkNThmNDI1ZjRiNTMy','bWFzdGVyfGltYWdlc3w0NTEzMDJ8aW1hZ2UvanBlZ3xhR0V6TDJoaU9TOHhNemd4TkRrek5EUTNNRFk0Tmk4M05UQlhlRGMxTUVoZmJXRnpkR1Z5TDJodmRHWnZiR1JsY2k5MGNtRnVjMlpsY2k5cGJtTnZiV2x1Wnk5a1pYQnZjMmwwTDJoNVluSnBjeTFwYm5SbGNtWmhZMlZ6TDBsT0wyMWxaR2xoTDNCeWIyUjFZM1F2T0Rnd05qQTVNVGcxTmpjek9WOHdNREV1YW5CbnxhNmRiMTkxNGEwNjY5NzNmOTdhZjY0ZDBmYjg2ZGZmNTJhNjQ4ODVhOTM1NjdmZGFlOTU5ZTQ2NjBjOTJmZWMw','https://www.alkosto.com/medias/750Wx750H-master-hotfolder-transfer-incoming-deposit-hybris-interfaces-IN-media-product-8806091856739-006.jpg?context=bWFzdGVyfGltYWdlc3w1MzQwNnxpbWFnZS9qcGVnfGFEazRMMmd3T1M4eE16Z3hORGt6TnpReE9UZ3dOaTgzTlRCWGVEYzFNRWhmYldGemRHVnlMMmh2ZEdadmJHUmxjaTkwY21GdWMyWmxjaTlwYm1OdmJXbHVaeTlrWlhCdmMybDBMMmg1WW5KcGN5MXBiblJsY21aaFkyVnpMMGxPTDIxbFpHbGhMM0J5YjJSMVkzUXZPRGd3TmpBNU1UZzFOamN6T1Y4d01EWXVhbkJufDNkZGNhMjk3NWU2MDJkNzRjYmExYThiOTlmMjAyNjQyOGIxNmE5MmU5MTRlOTJlODIxZDk2YjM0ZDUwY2Y5ZTU'], '54321', 'LG-001', 599.99, 'Especificaciones del televisor', '8 unidades', 'activo', '742fb857-5b36-4b7d-9554-593fcd8ffb8b', '3', '3'),
    ('Cámara Canon EOS Rebel', 'Una cámara réflex digital', ARRAY['https://m.media-amazon.com/images/I/71EWRyqzw0L.jpg','https://m.media-amazon.com/images/I/717xSjyDRzL.jpg','https://m.media-amazon.com/images/I/71YqHRYSluL.jpg'], '98765', 'CANON-001', 699.95, 'Especificaciones de la cámara', '12 unidades', 'activo', '25e06dd6-48a8-4d9e-89d8-6c04e1528407', '4', '4');