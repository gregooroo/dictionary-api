<h1 align="center">
API Documentation
</h1>

## Table of Contents

-   [Users](#users)
    -   [POST /api/users - Register new account](#register-new-account)
    -   [POST /api/users/login - Generate JWT token](#login-user)
    -   [POST /api/users/logout - Blacklist JWT token](#logout-user)

## Users

### Register new account

**Endpoint**

```http
POST /api/users
```

**Request's configuration**

| Parameter | Type | Required |          Description           |
| :-------: | :--: | :------: | :----------------------------: |
| username  | body |   true   |     Unique username string     |
|   email   | body |   true   |      Unique email address      |
| password  | body |   true   | Min 8 characters long password |

**Successful Response (200)**

```json
{
    "success": true,
    "result": "Username gregooroo (gregooroo@example.com) created successfully"
}
```

**Example**

```sh
curl --request POST \
  --url http://localhost:3000/api/users \
  --header 'Content-Type: application/json' \
  --data '{
	"username": "gregooroo",
	"email": "gregooroo@example.com",
	"password": "q1w2e3r4"
}'
```

### Login user

```http
POST /api/users/login
```

**Request's configuration**

| Parameter |       Type        | Required |       Description       |
| :-------: | :---------------: | :------: | :---------------------: |
| username  | Basic auth header |   true   | base64 encoded username |
| password  | Basic auth header |   true   | base64 encoded password |

**Successful Response (200)**

```json
{
    "success": true,
    "result": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDg3MWUwZDI5OWRhZDM5MzJhOWNjNmEiLCJ1c2VybmFtZSI6ImdyZWdvb3JvbyIsImlhdCI6MTYxOTk3MTUxNSwiZXhwIjoxNjIwMDU3OTE1fQ.FV8TbtDmaJp3diujN_mVMPx3qDpDvpUX-R1Rxik1IW4"
}
```

**Example**

```sh
curl --request POST \
  --url http://localhost:3000/api/users/login \
  --header 'Authorization: Basic Z3JlZ29vcm9vOnExdzJlM3I0'
```

### Logout user

```http
POST /api/users/logout
```

**Request's configuration**

| Parameter |        Type        | Required |                             Description                             |
| :-------: | :----------------: | :------: | :-----------------------------------------------------------------: |
| jwt token | Bearer auth header |   true   | valid jwt token generated with [POST /api/users/login](#login-user) |

**Successful Response (200)**

```json
{
    "success": true,
    "result": "Successfully logged out"
}
```

**Example**

```sh
curl --request POST \
  --url http://localhost:3000/api/users/logout \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDg3MWUwZDI5OWRhZDM5MzJhOWNjNmEiLCJ1c2VybmFtZSI6ImdyZWdvb3JvbyIsImlhdCI6MTYxOTk3MTUxNSwiZXhwIjoxNjIwMDU3OTE1fQ.FV8TbtDmaJp3diujN_mVMPx3qDpDvpUX-R1Rxik1IW4'
```
