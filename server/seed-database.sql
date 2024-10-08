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
    deleted_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role         INT       default null REFERENCES roles (id)
);

alter table users
    add column role INT default null REFERENCES roles (id);



CREATE TABLE categories
(
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(255) NOT NULL UNIQUE,
    slug      VARCHAR(255) NOT NULL UNIQUE,
    logo      VARCHAR(1024),
    type      VARCHAR(1024) default 'category',
    parent_id INT,
    CONSTRAINT fk_parent
        FOREIGN KEY (parent_id)
            REFERENCES categories (id)
            ON DELETE SET NULL
);

alter table categories
    add column type varchar(1024) default 'category';

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
    category_id INTEGER   default Null REFERENCES categories (id),
    brand_id    INTEGER   default Null REFERENCES brands (id),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE roles
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL UNIQUE,
    slug        VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at  TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    status      varchar(8) default 'active'
);

INSERT INTO roles (name, slug, description, status)
VALUES ('Admin', 'admin', 'Administrator with full access to all system features.', 'active'),
       ('Manager', 'manager', 'Oversees inventory, sales, and other business operations.',
        'active'),
       ('Sales Representative', 'sales_representative',
        'Handles customer inquiries and sales transactions.', 'active'),
       ('Inventory Manager', 'inventory_manager', 'Manages stock levels and inventory.', 'active'),
       ('Customer Support', 'customer_support', 'Assists customers with inquiries and support.',
        'active'),
       ('Marketing Specialist', 'marketing_specialist',
        'Handles marketing campaigns and promotions.', 'active'),
       ('Content Editor', 'content_editor',
        'Manages and updates website content and product descriptions.', 'active'),
       ('Analyst', 'analyst', 'Analyzes sales data and metrics to provide business insights.',
        'active'),
       ('Supplier', 'supplier', 'Manages product supply and order fulfillment.', 'active'),
       ('Guest', 'guest', 'Role for users who have not logged in or registered.', 'inactive');



DROP TABLE if exists configs;
CREATE TABLE configs
(
    id                      SERIAL PRIMARY KEY,
    mobile_category_mapping jsonb     default '[]',
    created_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

[
    {
        id: 1,
        name: "Electronices",
        logo: "sdf",
        subMenu: [
            {name: "Tables", type: 'category'},
            {name: "Laptops", type: 'category'},
            {name: "Tables", type: 'category'},
        ]
    },
    {name: "Mobiles", logo: "sdf",
        subMenu: [
                {name: "Tables",  type: 'spotlight', values: [{name: "sdf", logo: 2, id: 1}]},
                {name: "Mobiles", type: 'category'},
                {name: "Shop by brands",  type: 'brands', values: [{name: "sdf", logo: 2, id: 1}]},
            ]
},
    {name: "Fashion", logo: "sdf"},
    {name: "Furnitures", logo: "sdf"},
    ...
]



CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);


CREATE TABLE searches (
  id SERIAL PRIMARY KEY,
  search_criteria TEXT NOT NULL,
  slug TEXT NOT NULL,
  user_id INTEGER NOT NULL references users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(slug, user_id)
);
