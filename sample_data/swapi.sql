--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.6
-- Dumped by pg_dump version 9.5.6



DROP TABLE IF EXISTS public.planet_votes;
DROP SEQUENCE IF EXISTS public.planet_votes_seq;
CREATE TABLE planet_votes (
    id serial NOT NULL PRIMARY KEY,
    planet_id integer,
    planet_name integer,
    user_id integer,
    submission_time timestamp without time zone
);


DROP TABLE IF EXISTS public.users;
CREATE TABLE users (
    user_id serial PRIMARY KEY,
    submission_time timestamp without time zone,
    username varchar(15) NOT NULL UNIQUE,
    pwd_hash varchar(60) NOT NULL
);


ALTER TABLE ONLY users
    ADD CONSTRAINT pk_user_id PRIMARY KEY (user_id);

ALTER TABLE ONLY planet_votes
    ADD CONSTRAINT pk_id PRIMARY KEY (id);

ALTER TABLE ONLY planet_votes
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id);


