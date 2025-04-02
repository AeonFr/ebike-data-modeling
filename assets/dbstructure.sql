-- 1) USER
CREATE TABLE user (
    id               SERIAL PRIMARY KEY,
    email            VARCHAR(255) NOT NULL,
    password_hash    VARCHAR(255) NOT NULL,
    created_at       TIMESTAMP DEFAULT NOW()
);

-- 2) PRODUCTS
CREATE TABLE products (
    id               SERIAL PRIMARY KEY,
    name             VARCHAR(255) NOT NULL,         -- e.g. "Bicycle", "Skis", etc.
    base_price       DECIMAL(10, 2) DEFAULT 0.0,
    description      TEXT
);

-- 3) PRODUCT_PART_CATEGORIES
CREATE TABLE product_part_categories (
    id               SERIAL PRIMARY KEY,
    product_id       INT NOT NULL REFERENCES products(id),
    name             VARCHAR(255) NOT NULL          -- e.g. "Frame Type", "Wheels", etc.
);

-- 4) PRODUCT_PARTS
CREATE TABLE product_parts (
    id               SERIAL PRIMARY KEY,
    category_id      INT NOT NULL REFERENCES product_part_categories(id),
    name             VARCHAR(255) NOT NULL,         -- e.g. "Full-suspension", "Matte", etc.
    base_price       DECIMAL(10, 2) DEFAULT 0.0,
    is_in_stock      BOOLEAN DEFAULT TRUE
);

-- 5) PRODUCT_PARTS_COMPATIBILITIES
-- For capturing whether two product_parts can or cannot be combined
CREATE TABLE product_parts_compatibilities (
    id                  SERIAL PRIMARY KEY,
    product_part_id_1   INT NOT NULL REFERENCES product_parts(id),
    product_part_id_2   INT NOT NULL REFERENCES product_parts(id),
    is_compatible       BOOLEAN NOT NULL,
    UNIQUE (product_part_id_1, product_part_id_2)
);

-- 6) PRODUCT_PARTS_PRICING_RULES
-- For special pricing based on specific combinations of parts
CREATE TABLE product_parts_pricing_rules (
    id                   SERIAL PRIMARY KEY,
    description          VARCHAR(255),
    product_part_id_1    INT NOT NULL REFERENCES product_parts(id),
    product_part_id_2    INT NOT NULL REFERENCES product_parts(id),
    price_adjustment     DECIMAL(10,2) NOT NULL
);

-- 7) CART
CREATE TABLE cart (
    id               SERIAL PRIMARY KEY,
    user_id          INT NOT NULL REFERENCES user(id),
    created_at       TIMESTAMP DEFAULT NOW()
);

-- 8) CART_ITEM
CREATE TABLE cart_item (
    id               SERIAL PRIMARY KEY,
    cart_id          INT NOT NULL REFERENCES cart(id),
    product_id       INT NOT NULL REFERENCES products(id),
    quantity         INT DEFAULT 1,
    unit_price       DECIMAL(10,2) NOT NULL,   -- price for this specific configuration at time of adding
    created_at       TIMESTAMP DEFAULT NOW()
);

-- 9) CART_ITEM_PRODUCT_PART
-- Mapping each cart_item to the parts selected
CREATE TABLE cart_item_product_part (
    cart_item_id     INT NOT NULL REFERENCES cart_item(id),
    product_part_id  INT NOT NULL REFERENCES product_parts(id),
    PRIMARY KEY (cart_item_id, product_part_id)
);
