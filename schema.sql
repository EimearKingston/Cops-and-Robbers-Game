DROP TABLE IF EXISTS users;
CREATE TABLE users
(
username TEXT PRIMARY KEY NOT NULL,
password TEXT NOT NULL,
point INTEGER 
);
DROP TABLE IF EXISTS points;
CREATE TABLE points
(
username TEXT NOT NULL,
point INTEGER 
);
INSERT INTO points(username, point)
VALUES
    ("user7", 11);

