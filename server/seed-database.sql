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
where parent_id IS NULL;


CREATE TABLE brands
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(255)        NOT NULL,
    slug       VARCHAR(255) UNIQUE NOT NULL,
    logo       TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_brands_slug ON brands (slug);


DROP TABLE if exists products;
CREATE TABLE products
(
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(255)   NOT NULL,
    slug        VARCHAR(255)   NOT NULL UNIQUE,
    description TEXT,
    price       DECIMAL(10, 2) NOT NULL,
    image       VARCHAR(1024),
    category_id INTEGER default Null REFERENCES categories (id),
    brand_id    INTEGER default Null REFERENCES brands (id),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
