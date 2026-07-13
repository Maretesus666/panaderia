CREATE DATABASE IF NOT EXISTS librosPlana;
USE librosPlana;

DROP TABLE IF EXISTS libro;

CREATE TABLE libro (
    id INT PRIMARY KEY AUTO_INCREMENT,
    autor VARCHAR(80) NOT NULL,
    titulo VARCHAR(70) NOT NULL,
    precio INT UNSIGNED NOT NULL,
    stock INT UNSIGNED NOT NULL,
    imagen VARCHAR(200) NOT NULL
);

INSERT INTO libro (autor, titulo, precio, stock, imagen) VALUES
    ('Panaderia', 'boliiiiiiiitas', 750, 12, 'bolitas.jpg'),
    ('Panaderia', 'dulcedeleche', 900, 8, 'dulcedeleche.jpg'),
    ('Panaderia', 'maicena', 650, 15, 'maicena.jpg'),
    ('Panaderia', 'librito', 620, 10, 'librito.jpg'),
    ('Panaderia', 'canon', 780, 9, 'canon.jpg');

