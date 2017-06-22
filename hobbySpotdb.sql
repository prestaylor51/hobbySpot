-- A database for the HobbySpot web application --

-- create user hobbyist with password '1234';
-- GRANT INSERT ON location, hobby, _user, student_mentor, hobby_mentor TO hobbyist;
-- GRANT UPDATE ON location, hobby, _user, student_mentor, hobby_mentor TO hobbyist;
-- grant usage, select on sequence location_id_seq to hobbyist;
-- grant usage, select on sequence hobby_id_seq to hobbyist;
-- grant usage, select on sequence student_mentor_id_seq to hobbyist;
-- grant usage, select on sequence hobby_mentor_id_seq to hobbyist;

-- DROP TABLE location, hobby, _user, student_mentor, hobby_mentor	CASCADE;

CREATE TABLE location
(id			serial		  primary key,
 town		varchar(100)  not null,
 zip		varchar(5)		      not null,		
 state		varchar(2)	  not null);

CREATE TABLE hobby
(id			    serial 		primary key,
 name			varchar(100)	not null,
 description	varchar(1000)	not null);

CREATE TABLE _user
(id   Serial   PRIMARY KEY,
 first      VARCHAR(100)     NOT NULL,
 last   	VARCHAR(100)     NOT NULL,
 phone	    VARCHAR(10)      NOT NULL,
 email      VARCHAR(100)     NOT NULL,
 location   INT              REFERENCES location(id),
 password	VARCHAR(80)      NOT NULL);

CREATE TABLE student_mentor
(id   			serial	primary key, 
 student_id  	int 	references _user(id) 		not null,
 mentor_id   	int		references _user(id) 		not null,
 hobby_id       int		references hobby(id) 		not null,
 active		bool		not null);

CREATE TABLE hobby_mentor
(id			    serial 		primary key,
 hobby_id		int 		references hobby(id),
 mentor_id		int 		references _user(id),
 greeting		varchar(100)	not null);


-- INSERT DATA --

INSERT INTO location
(town, zip, state)
VALUES
('Rexburg', '83440', 'ID');