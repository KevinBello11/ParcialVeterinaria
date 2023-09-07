
CREATE DATABASE Veterinaria;
USE Veterinaria;

-- Crear la tabla dueño
CREATE TABLE dueño (
    id_dueño INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    telefono VARCHAR(15),
    direccion VARCHAR(255)
);

-- Crear la tabla mascota
CREATE TABLE mascota (
    id_mascota INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(255) NOT NULL,
    especie VARCHAR(100) NOT NULL,
    raza VARCHAR(100),
    fecha_nacimiento DATE,
    id_dueño INT,
    FOREIGN KEY (id_dueño) REFERENCES dueño(id_dueño)
);

-- Crear la tabla comida
CREATE TABLE comida (
    id_comida INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(255) NOT NULL,
    tipo VARCHAR(100),
    precio DECIMAL(10, 2),
    descripcion TEXT
);

-- Insertar cinco dueños
INSERT INTO dueño (nombre, apellido, telefono, direccion)
VALUES
    ('Juan', 'Perez', '123-456-7890', 'Calle 123, Ciudad'),
    ('Maria', 'Gomez', '555-555-5555', 'Avenida 456, Pueblo'),
    ('Pedro', 'Lopez', '777-123-4567', 'Carretera 789, Villa'),
    ('Ana', 'Rodriguez', '999-888-7777', 'Calle Principal, Aldea'),
    ('Luis', 'Martinez', '444-333-2222', 'Camino Secundario, Poblado');

-- Insertar cinco mascotas asociadas a los dueños
DECLARE @id_dueño1 INT, @id_dueño2 INT, @id_dueño3 INT, @id_dueño4 INT, @id_dueño5 INT;
SELECT TOP 5 @id_dueño1 = id_dueño FROM dueño WHERE nombre = 'Juan';
SELECT TOP 5 @id_dueño2 = id_dueño FROM dueño WHERE nombre = 'Maria';
SELECT TOP 5 @id_dueño3 = id_dueño FROM dueño WHERE nombre = 'Pedro';
SELECT TOP 5 @id_dueño4 = id_dueño FROM dueño WHERE nombre = 'Ana';
SELECT TOP 5 @id_dueño5 = id_dueño FROM dueño WHERE nombre = 'Luis';

INSERT INTO mascota (nombre, especie, raza, fecha_nacimiento)
VALUES
    ('Max', 'Perro', 'Labrador', '2020-01-15'),
    ('Luna', 'Gato', 'Siamés', '2019-05-20'),
    ('Rocky', 'Perro', 'Bulldog', '2018-08-10'),
    ('Whiskers', 'Gato', 'Persa', '2017-11-30'),
    ('Buddy', 'Perro', 'Golden Retriever', '2019-03-05');

-- Insertar cinco tipos de comida
INSERT INTO comida (nombre, tipo, precio, descripcion)
VALUES
    ('Croquetas para Perros', 'Seco', 15.99, 'Alimento balanceado para perros'),
    ('Comida para Gatos', 'Seco', 12.49, 'Alimento premium para gatos'),
    ('Comida Húmeda para Perros', 'Húmedo', 8.99, 'Alimento enlatado para perros'),
    ('Comida para Peces', 'Pellets', 5.79, 'Alimento flotante para peces tropicales'),
    ('Alimento para Aves', 'Semillas', 7.99, 'Mezcla de semillas para aves exóticas');
