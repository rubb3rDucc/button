CREATE button_db;

CREATE TABLE button_metrics (
    times_pressed integer,
    last_pressed  timestamp default now() not null
);

INSERT INTO button_metrics (times_pressed, last_pressed) values (1, now()) returning *;


