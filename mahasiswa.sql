create database mahasiswa;

create table mahasiswa
(
    nim    char(10)                not null
        primary key,
    nama   varchar(255)            null,
    gender enum ('L', 'P')         null,
    prodi  enum ('TI', 'TE', 'SI') null,
    alamat text
    class_id int                    null
);


create table class
(
    
    id int auto_increment primary key,
    name    varchar(255)            null,
    room    varchar(255)         null,
    kaprodi    varchar(255)         null,
);

