create database mahasiswa;

create table mahasiswa
(
    nim    char(10)                not null
        primary key,
    nama   varchar(255)            null,
    gender enum ('L', 'P')         null,
    prodi  enum ('TI', 'TE', 'SI') null,
    alamat text                    null
);

