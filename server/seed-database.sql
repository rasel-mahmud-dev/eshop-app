CREATE TABLE users
(
    id           SERIAL PRIMARY KEY,
    username     VARCHAR(255) UNIQUE NOT NULL,
    password     VARCHAR(255)        NOT NULL,
    email        VARCHAR(255) UNIQUE NOT NULL,
    first_name   VARCHAR(255),
    last_name    VARCHAR(255),
    address      TEXT,
    city         VARCHAR(255),
    state        VARCHAR(255),
    postal_code  VARCHAR(20),
    country      VARCHAR(255),
    phone_number VARCHAR(20),
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories
(
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(255) NOT NULL UNIQUE,
    slug      VARCHAR(255) NOT NULL UNIQUE,
    logo      VARCHAR(1024),
    parent_id INT,
    CONSTRAINT fk_parent
        FOREIGN KEY (parent_id)
            REFERENCES categories (id)
            ON DELETE SET NULL
);

select name,
       id,
       slug,
       logo
from categories
where parent_id IS NULL

