-- A database for the HobbySpot web application --

-- create user hobbyist with password '1234';
-- GRANT INSERT ON location, hobby, _user, student_mentor, hobby_mentor TO hobbyist;
-- GRANT UPDATE ON location, hobby, _user, student_mentor, hobby_mentor TO hobbyist;
-- grant usage, select on sequence location_id_seq to hobbyist;
-- grant usage, select on sequence hobby_id_seq to hobbyist;
-- grant usage, select on sequence student_mentor_id_seq to hobbyist;
-- grant usage, select on sequence hobby_mentor_id_seq to hobbyist;

-- GET MENTORS
-- SELECT u.first, u.last, l.town, hm.mentor_id, h.name, hm.greeting FROM _user u 
-- 	JOIN hobby_mentor hm ON u.id = hm.mentor_id
-- 	JOIN hobby h ON h.id = hm.hobby_id
-- 	JOIN location l ON u.location_id = l.id
-- 	WHERE h.name = 'Chess'; 

-- SIGN UP
-- INSERT INTO _user
-- (username, first, last, phone, email, location_id, password) 
-- VALUES
-- ();

-- Get Students (according to mentor)
-- SELECT * FROM _user u
-- JOIN student_mentor sm ON sm.student_id = u.id AND sm.mentor_id = $mentor;

DROP TABLE location, hobby, _user, student_mentor, hobby_mentor	CASCADE;

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
 username   VARCHAR(100)     NOT NULL,
 first      VARCHAR(100)     NOT NULL,
 last   	VARCHAR(100)     NOT NULL,
 phone	    VARCHAR(10),
 email      VARCHAR(100)     NOT NULL,
 location_id   INT           NOT NULL  REFERENCES location(id),
 password	VARCHAR(255)      NOT NULL);

CREATE TABLE hobby_mentor
(id			    serial 		primary key,
 hobby_id		int 		NOT NULL references hobby(id),
 mentor_id		int 		NOT NULL references _user(id),
 greeting		varchar(1000)	not null);

CREATE TABLE student_mentor
(id   			serial	primary key, 
 student_id  	int 	NOT NULL references _user(id) 		not null,
 mentor_id   	int		NOT NULL references hobby_mentor(id) 		not null,
 hobby_id       int		NOT NULL references hobby(id) 		not null,
 active		bool		not null);

-- INSERT location --

INSERT INTO location
(town, zip, state)
VALUES
('Rexburg', '83440', 'ID');

-- INSERT hobby --

INSERT INTO hobby
(name, description)
VALUES
('Chess', 'The game of chess; rules and strategies'),
('Python Programming', 'Learning Python: Python is a versitile, high-level programming language');

-- INSERT _user --

INSERT INTO _user
(username, first, last, phone, email, location_id, password) 
VALUES
('admin', 'Preston', 'Taylor', '1111111111', 'admin@mail.com', 1, 'password'),
('jman123', 'John', 'Jones', '2222222222','jman123@gmail.net', 1, 'password'),
('mpool', 'Matt', 'Pool', '3333333333','mpool@gmail.net', 1, 'password');

-- INSERT hobby_mentor --

INSERT INTO hobby_mentor
(hobby_id, mentor_id, greeting)
VALUES
(1, 2, 'Hello, I''m John. I love the game of chess. I played for 4 years i high school and competed in the state championship.'),
(1, 3, 'Sup bros I love chess! I love to teach it too!'),
(2, 3, 'Sup bros, I''m all about programming in python. I am a professional programmer and want teach other about all of the cool things they can do through programming ');

-- INSERT student_mentor --

INSERT INTO student_mentor
(student_id, mentor_id, hobby_id, active) 
VALUES
(1, 2, 1, 'true'),
(1, 3, 2, 'true');




