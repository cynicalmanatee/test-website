CREATE DATABASE IF NOT EXISTS scoutninja;

use scoutninja;

CREATE TABLE IF NOT EXISTS Game (
    id serial PRIMARY KEY,
    game_name VARCHAR(30),
    player_id VARCHAR(100) REFERENCES Player(email),
    start_coord_long NUMERIC(10, 7) NOT NULL,
    start_coord_lat NUMERIC(10, 7) NOT NULL,
    end_coord_long NUMERIC(10, 7) NOT NULL,
    end_coord_lat NUMERIC(10, 7) NOT NULL,
    boundary INT,
    time_limit INT,
    link VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Player (
    email varchar(100) NOT NULL PRIMARY KEY,
    nickname varchar(30),
    country varchar(50),
    created_on TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Highscore (
    player_email varchar(100) REFERENCES Player(email),
    game_id int REFERENCES Game(id),
    completed boolean DEFAULT false,
    highscore int DEFAULT 0,
    PRIMARY KEY (player_email,game_id)
);

CREATE TABLE IF NOT EXISTS CluesHint (
    game_id int REFERENCES Game(id),
    order_num int NOT NULL,
    clue varchar(100) NOT NULL,
    hint varchar(100),
    PRIMARY KEY (game_id,order_num)
);

CREATE TABLE IF NOT EXISTS Friend (
    primary_user_mail varchar(100) REFERENCES Player(email),
    friend_user_mail varchar(100) REFERENCES Player(email),
    PRIMARY KEY (primary_user_mail,friend_user_mail)
);
