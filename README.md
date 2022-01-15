# Store API

simples API to simulate e-commerce functionality

## API Reference

To use APIs that (require auth ) , get Access token from endpoint /user/login
, Add header authorization : Bearer {access_token} to requests

you can also find API docs when run project locally on http://localhost:4000/api-docs

#### Create new user

``` http
  POST /user
```

Request (body)
| Property| Type | Description |
| :-------- | :------- | :------------------------- |
| `first_name` | `string` | **Required**. first_name of user|
| `last_name` | `string` | last_name of user|
| `user_name` | `string` | **Required**. user_name of user|
| `password` | `string` | **Required**. password of user|

#### User login

get user access token to make authorized requests

``` http
  POST /user/login
```

Request (body)
| Property| Type | Description |
| :-------- | :------- | :------------------------- |
| `user_name` | `string` | **Required**. user_name of user|
| `password` | `string` | **Required**. password of user|

#### GET ALL USERS

get all users (require auth )

```http
  GET /users
```

#### GET USER By Id

get user by Id (require auth )

```http
  GET /users/{userId}
```

| parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `userId`  | `number` | **Required**. userId to show user data |

---

#### Add product

``` http
  POST /product
```

Request (body)
| Property| Type | Description |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. product name|
| `price` | `number` | **Required**. product price|

#### GET ALL Products

```http
  GET /product
```

#### GET Product By Id

```http
  GET /product/{id}
```

| parameter | Type     | Description                                  |
| :-------- | :------- | :------------------------------------------- |
| `id`      | `number` | **Required**. productId to show product data |

---

#### GET Orders Of user

get orders by userId (require auth )

```http
  GET /user/{userId}/order
```

| parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `userId`  | `number` | **Required**. userId to get his orders |

## Installation

Install my-project with npm

```bash
  npm install
  or
  yarn
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/HagarAyad/store_API.git
```

Go to the project directory

```bash
  cd store_API
```

Add your .env file
put these variables :
DB_NAME=store , DB_NAME_TEST=store_test .

add these variables with your own

```bash
  DB_HOST
  DB_USER
  DB_PASSWORD
  DB_PORT
```

Create database (open psql)

```bash
  psql postgres
  create database store
  create database store_test
```

Add migrations

```bash
  db-migrate up
```

Install dependencies

```bash
  npm install
  or
  yarn
```

Start the server

```bash
  npm run start
  or
  yarn start
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
  or
  yarn test
```
