CREATE TABLE user (
id int NOT NULL auto_increment,
nombreUsuario VARCHAR(256) NOT NULL,
apellidoUsuario VARCHAR(256) NOT NULL,
login VARCHAR(256) NOT NULL,
password VARCHAR(256) NOT NULL,
PRIMARY KEY (`id`)
);

CREATE TABLE pedido (
id int NOT NULL auto_increment,
nombrePedido VARCHAR(256) NOT NULL,
fechaLimite VARCHAR(256) NOT NULL,
tamano VARCHAR(256) NOT NULL,
tipo VARCHAR(256) NOT NULL,
descripcion VARCHAR(256) NOT NULL,
estadoActual VARCHAR(256) NOT NULL,
idUsuario int NOT NULL,
PRIMARY KEY (`id`)
);

CREATE TABLE direccion (
estado VARCHAR(256) NOT NULL,
nombreResidente VARCHAR(256) NOT NULL,
direccion VARCHAR(256) NOT NULL,
codigoPostal int NOT NULL,
numeroTelefonico long NOT NULL,
idUsuario int NOT NULL,
PRIMARY KEY (`direccion`)
);

CREATE TABLE credito (
numeroDeTarjeta bigint(16) NOT NULL,
nombreEnTarjeta VARCHAR(256) NOT NULL,
fechaVencimiento VARCHAR(256) NOT NULL,
idUsuario int NOT NULL,
PRIMARY KEY (`numeroDeTarjeta`)
);

select * from pedido;
select * from pedido where idUsuario = 1;
SELECT * FROM user WHERE login="193286";
select * from direccion;
select * from direccion where direcciondireccion="Bolevard Revolucion 380 Oriente";
select * from credito;
insert into credito (numeroDeTarjeta,nombreEnTarjeta,fechaVencimiento,idUsuario) values (1234567812345678, "Ivan", "12/23/2020",1);
select * from credito where numeroDeTarjeta=1234567812345678;
truncate table user;