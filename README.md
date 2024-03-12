# Task Manager API

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/peace15008511/task-manager-api.git

   ```

2. Navigate to the project directory:

   ```bash
   cd task-manager-api

   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm run build
   npm run start
   ```

   The server will start on port 3000 by default. You can access the API at http://localhost:3000

# API Error Codes

### 200 OK

- **Description:** Indicates that the request was successful.
- **Meaning:** The server successfully processed the request.
- **Sample Response:**

```json
{
  "status": 200,
  "message": "Request successful",
  "data": {}
}
```

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
  "status": 401,
  "message": "Unauthorized",
  "error": "Authentication credentials are missing or invalid"
}
```

### 403 Forbidden

- **Description:** The client does not have permission to access the resource.
- **Meaning:** The server understood the request but refuses to authorize it.
- **Sample Response:**

```json
{
  "status": 403,
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
  "status": 404,
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
  "status": 500,
  "message": "Internal Server Error",
  "error": "An unexpected error occurred on the server"
}
```
