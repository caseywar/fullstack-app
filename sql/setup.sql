DROP TABLE IF EXISTS favors;
CREATE TABLE favors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    favor TEXT NOT NULL,
    quantity INTEGER,
    contributor TEXT
);