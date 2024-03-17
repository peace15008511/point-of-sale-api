# Point Of Sale API

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/peace15008511/point-of-sale-api.git

   ```

2. Navigate to the project directory:

   ```bash
   cd point-of-sale-api

   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure your database

   ```bash
   cp .env.example .env #Configure sensitive environment variables
   ```

   - Open .env file and configure PORT, DB_NAME, DB_USERNAME, DB_PASSWORD, and DB_HOST as your prefarence. NB make sure to configure a user that has all permissions.
   - Create a database schema as per your DB_NAME configuration. You can do this using mysql cli, workbench or phpmyadmin.

   - mysql cli example below:
     ```bash
     mysql -u <DB_USERNAME> -p -h <DB_HOST> # replace <DB_HOST>  and <DB_USERNAME> as per your .env configurations
     CREATE DATABASE <DB_NAME>; # Replace <DB_NAME> as per your .env configurations
     ```

5. Start the server:

   ```bash
   npm run build
   npm run start
   ```

   The server will start on port 8080 by default if environment varible <PORT> is not set. You can access the API at http://localhost:8080 or http://localhost:<PORT>

---

# APIs Documentation

### Create User

Method: POST
Path: /user
Request Body:

```json
{
  "email": "string",
  "password": "string"
}
```

Success Code:201

```json
{
  "message": "Success",
  "response": true
}
```

### User Login

Method: POST
Path: /user/login
Request Body:

```json
{
  "email": "string",
  "password": "string"
}
```

Success Code:200

```json
{
  "message": "Success",
  "response": "token"
}
```

### Add Product

Method: POST
Path: /products
Request Header: Authorization = token
Request Body:

```json
{
  "name": string,
  "description": string,
  "price": number,
  "quantity": number,
}
```

Success Code:201

```json
{
  "message": "Success",
  "response": true
}
```

### Get Products

## Success error codes as expected from APIs

Method: GET
Path: /products
Request Header: Authorization = token

```json
{
  "name": string,
  "description": string,
  "price": number,
  "quantity": number,
}
```

Success Code:201

```json
{
  "message": "Success",
  "response": true
}
```

### Update Product

Method: PUT
Path: /products/:id
Request Headers: Authorization = token
Request Params: id

```json
{
  //NB:atleast one should be populated
  "name": string, //optional
  "description": string, //optional
  "price": number, //optional
  "quantity": number, //optional
}
```

Success Code:200

```json
{
  "message": "Success",
  "response": true
}
```

### Delete Product

Method: DELETE
Path: /products/:id
Request Headers: Authorization = token
Request Params: id

Success Code:204

---

## Common error codes

### 400 Bad Request

- **Description:** The request was invalid or cannot be served.
- **Meaning:** The client's request cannot be fulfilled due to invalid syntax or missing parameters.
- **Sample Response:**

```json
{
  "status": 400,
  "message": "Bad Request",
  "error": "Invalid parameters provided"
}
```

### 401 Unauthorized

- **Description:** Authentication is required and has failed or has not been provided.
- **Meaning:** The client needs to authenticate to gain access to the resource but has failed to do so.
- **Sample Response:**

```json
{
  "message": "Unauthorized",
  "error": "Authentication credentials are missing or invalid"
}
```

or

```json
{
  "message": "Unauthorized",
  "error": "Unauthorized: Token not provided"
}
```

### 403 Forbidden

- **Description:** The client does not have permission to access the resource.
- **Meaning:** The server understood the request but refuses to authorize it.
- **Sample Response:**

```json
{
  "message": "Forbidden",
  "error": "Access to the requested resource is forbidden"
}
```

### 404 Not Found

- **Description:** The requested resource could not be found.
- **Meaning:** The server cannot find the requested resource.
- **Sample Response:**

```json
{
  "message": "Not Found",
  "error": "The requested resource does not exist"
}
```

### 500 Internal Server Error

- **Description:** A generic error message indicating that something went wrong on the server's end.
- **Meaning:** The server encountered an unexpected condition that prevented it from fulfilling the request.
- **Sample Response:**

```json
{
  "message": "Internal Server Error",
  "error": "An unexpected error occurred on the server"
}
```
