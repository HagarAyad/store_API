# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
- Show (args: product id)
- Create (args: Product)[token required]

#### Users

- Index [token required]
- Show (args: id)[token required]
- Create (args: User)

#### Orders

- Current Order by user (args: user id)[token required]

## Data Shapes

#### Users

| parameter   | Type                      |
| :---------- | :------------------------ |
| `id`        | `integer`(primary key)    |
| `user_name` | ` character varying(100)` |
| `firstName` | ` character varying(100)` |
| `last_name` | ` character varying(100)` |
| `password`  | ` character varying(255)` |

#### Products

| parameter | Type                      |
| :-------- | :------------------------ |
| `id`      | `integer`(primary key)    |
| `name`    | ` character varying(100)` |
| `price`   | `integer`                 |

#### Orders

| parameter | Type                              |
| :-------- | :-------------------------------- |
| `id`      | `integer`(primary key)            |
| `status`  | ` character varying(100)`         |
| `user_id` | `bigint` foreign key to user (id) |

#### Orders_products

| parameter    | Type                                  |
| :----------- | :------------------------------------ |
| `id`         | `integer`(primary key)                |
| `quantity`   | `integer`                             |
| `order_id`   | `bigint` foreign key to Orders (id)   |
| `product_id` | `bigint` foreign key to Products (id) |
