create database pantec;
use pantec;

create table cliente(
id int primary key auto_increment,
nome varchar(80),
email varchar(80),
telefone char(14),
senha varchar(80),
cep int(8),
logradouro varchar(80),
bairro varchar(80),
cidade varchar(30),
numero int
);

select * from cliente;