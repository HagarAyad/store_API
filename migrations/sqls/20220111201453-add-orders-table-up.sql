CREATE TABLE orders (
    id serial PRIMARY KEY,
    status VARCHAR (100),
    user_id bigint REFERENCES users(id) 
);