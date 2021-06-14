<h1 align="center">
API Documentation
</h1>

## Table of Contents

-   [Users](#users)
    -   [POST /api/users - Register new account](#register-new-account)
    -   [POST /api/users/login - Generate JWT token](#login-user)
    -   [POST /api/users/logout - Blacklist JWT token](#logout-user)
-   [Words](#words)
    -   [POST /api/words - Add new word](#add-new-word)
    -   [GET /api/words - Get all words from database](#get-words)
    -   [GET /api/words/:id - Get one word from database](#get-word)
    -   [PATCH /api/words/:id - Update word](#update-word)
    -   [DELETE /api/words/:id - Delete word](#delete-word)

## Users

### Register new account

**Endpoint**

```http
POST /api/users
```

**Request's configuration**

| Location | Parameter | Required |          Description           |
| :------: | :-------: | :------: | :----------------------------: |
|   Body   | username  |   true   |     Unique username string     |
|   Body   |   email   |   true   |      Unique email address      |
|   Body   | password  |   true   | Min 8 characters long password |

**Successful Response (200)**

```json
{
    "success": true,
    "result": "Username gregooroo (gregooroo@gmail.com) created successfully"
}
```

**Example**

```sh
curl --request POST \
  --url http://localhost:3000/api/users \
  --header 'Content-Type: application/json' \
  --data '{
	"username": "gregooroo",
	"email": "gregooroo@gmail.com",
	"password": "q1w2e3r4"
}'
```

### Login user

**Endpoint**

```http
POST /api/users/login
```

**Request's configuration**

|       Location       | Parameter | Required |           Description            |
| :------------------: | :-------: | :------: | :------------------------------: |
| Authorization Header |   Basic   |   true   | base64 encoded username:password |

**Successful Response (200)**

```json
{
    "success": true,
    "result": "Successfully logged in"
}
```

This endpoint will also save a HttpOnly cookie named `accessToken`.

**Example**

```sh
curl --request POST \
  --url http://localhost:3000/api/users/login \
  --header 'Authorization: Basic Z3JlZ29vcm9vOnExdzJlM3I0'
```

### Logout user

**Endpoint**

```http
POST /api/users/logout
```

**Request's configuration**

| Location |  Parameter  | Required |                                     Description                                      |
| :------: | :---------: | :------: | :----------------------------------------------------------------------------------: |
|  Cookie  | accessToken |   true   | A cookie that contains JWT token generated with [POST /api/users/login](#login-user) |

**Successful Response (200)**

```json
{
    "success": true,
    "result": "Successfully logged out"
}
```

This endpoint will destroy a cookie previously set by [POST /api/users/login](#login-user)

**Example**

```sh
curl --request POST \
  --url http://localhost:3000/api/users/logout \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDg3MWUwZDI5OWRhZDM5MzJhOWNjNmEiLCJ1c2VybmFtZSI6ImdyZWdvb3JvbyIsImlhdCI6MTYxOTk3MTUxNSwiZXhwIjoxNjIwMDU3OTE1fQ.FV8TbtDmaJp3diujN_mVMPx3qDpDvpUX-R1Rxik1IW4'
```

## Words

### Add new word

**Endpoint**

```http
POST /api/words
```

**Request's configuration**

| Location |  Parameter   | Required |                                     Description                                      |
| :------: | :----------: | :------: | :----------------------------------------------------------------------------------: |
|  Cookie  | accessToken  |   true   | A cookie that contains JWT token generated with [POST /api/users/login](#login-user) |
|   Body   |     word     |   true   |                              string, **Compound Index**                              |
|   Body   |  definition  |   true   |                                        string                                        |
|   Body   | translations |   true   |                         array of strings, **Compound Index**                         |
|   Body   |   examples   |   true   |                                   array of strings                                   |
|   Body   | partOfSpeech |   true   |                                        string                                        |

-   Word and translation (element in array) together form a compound index which mean word and translation must be unique

**Successful Response (200)**

```json
{
    "success": true,
    "result": {
        "translations": ["rolnictwo"],
        "examples": [
            "Agriculture here is still largely based on traditional methods."
        ],
        "_id": "608edf06c0dd844ef1ea7d56",
        "word": "agriculture",
        "definition": "the practice and science of farming",
        "partOfSpeech": "noun"
    }
}
```

**Example**

```sh
curl --location --request POST 'localhost:3000/api/words' \
--header 'Content-Type: application/json' \
--header 'Cookie: accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM3YWJlNTg1M2IyMjU4MjE3N2I5ZmIiLCJ1c2VybmFtZSI6ImdyZWdvb3JvbyIsImlhdCI6MTYyMzcwNDk4NiwiZXhwIjoxNjIzNzkxMzg2fQ.EEP7WW3Ok-uBAs_5Xjcvi_plhXJ7eDeF2HEzcdqQuQs' \
--data-raw '{
	"word": "agriculture",
	"definition": "the practice and science of farming",
	"translations": [
		"rolnictwo"
	],
	"examples": [
		"Agriculture here is still largely based on traditional methods."
	],
	"partOfSpeech": "noun"
}'
```

### Get words

**Endpoint**

```http
GET /api/words
```

**Request's configuration**

| Location |  Parameter  | Required |                                     Description                                      |
| :------: | :---------: | :------: | :----------------------------------------------------------------------------------: |
|  Cookie  | accessToken |   true   | A cookie that contains JWT token generated with [POST /api/users/login](#login-user) |
|  Query   |    page     | false\*  |                               Pagination: page number                                |
|  Query   |    limit    | false\*  |                         Pagination: amount of items per page                         |

-   If either page or limit is provided in a request other one must be provided too

**Successful Response (200)**

```json
{
    "success": true,
    "result": {
        "totalItems": 2,
        "items": [
            {
                "_id": "608edf06c0dd844ef1ea7d56",
                "translations": ["rolnictwo"],
                "examples": [
                    "Agriculture here is still largely based on traditional methods."
                ],
                "word": "agriculture",
                "definition": "the practice and science of farming",
                "partOfSpeech": "noun"
            },
            {
                "_id": "608ee43a87a17c69371e893c",
                "translations": ["sadza"],
                "examples": [
                    "Soot can leave ugly stains on anything it comes in contact with."
                ],
                "word": "soot",
                "definition": "a black powder produced when wood, coal etc. is burned",
                "partOfSpeech": "noun"
            }
        ]
    }
}
```

**Example**

```sh
curl --location --request GET 'localhost:3000/api/words' \
--header 'Cookie: accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM3YWJlNTg1M2IyMjU4MjE3N2I5ZmIiLCJ1c2VybmFtZSI6ImdyZWdvb3JvbyIsImlhdCI6MTYyMzcwNDk4NiwiZXhwIjoxNjIzNzkxMzg2fQ.EEP7WW3Ok-uBAs_5Xjcvi_plhXJ7eDeF2HEzcdqQuQs'
```

### Get word

**Endpoint**

```http
GET /api/words/:id
```

**Request's configuration**

| Location |  Parameter  | Required |                                     Description                                      |
| :------: | :---------: | :------: | :----------------------------------------------------------------------------------: |
|  Cookie  | accessToken |   true   | A cookie that contains JWT token generated with [POST /api/users/login](#login-user) |
|   Url    |     :id     |   true   |                                   Valid MongoDB id                                   |

**Successful Response (200)**

```json
{
    "success": true,
    "result": {
        "_id": "608edf06c0dd844ef1ea7d56",
        "translations": ["rolnictwo"],
        "examples": [
            "Agriculture here is still largely based on traditional methods."
        ],
        "word": "agriculture",
        "definition": "the practice and science of farming",
        "partOfSpeech": "noun"
    }
}
```

**Example**

```sh
curl --location --request GET 'localhost:3000/api/words/60c7ac2c853b22582177b9fe' \
--header 'Cookie: accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM3YWJlNTg1M2IyMjU4MjE3N2I5ZmIiLCJ1c2VybmFtZSI6ImdyZWdvb3JvbyIsImlhdCI6MTYyMzcwNDk4NiwiZXhwIjoxNjIzNzkxMzg2fQ.EEP7WW3Ok-uBAs_5Xjcvi_plhXJ7eDeF2HEzcdqQuQs'
```

### Update Word

**Endpoint**

```http
PATCH /api/words/:id
```

**Request's configuration**

| Location |  Parameter   | Required |                                     Description                                      |
| :------: | :----------: | :------: | :----------------------------------------------------------------------------------: |
|  Cookie  | accessToken  |   true   | A cookie that contains JWT token generated with [POST /api/users/login](#login-user) |
|   Url    |     :id      |   true   |                                   Valid MongoDB id                                   |
|   Body   |     word     |   true   |                              string, **Compound Index**                              |
|   Body   |  definition  |   true   |                                        string                                        |
|   Body   | translations |   true   |                         array of strings, **Compound Index**                         |
|   Body   |   examples   |   true   |                                   array of strings                                   |
|   Body   | partOfSpeech |   true   |                                        string                                        |

-   Word and translation (element in array) together form a compound index which mean word and translation must be unique

**Successful Response (200)**

```json
{
    "success": true,
    "result": {
        "_id": "608edf06c0dd844ef1ea7d56",
        "translations": ["rolnictwo", "uprawa roli"],
        "examples": [
            "Agriculture here is still largely based on traditional methods."
        ],
        "word": "agriculture",
        "definition": "the practice and science of farming",
        "partOfSpeech": "noun"
    }
}
```

-   Result property is a new version of a document that was modified

**Example**

```sh
curl --location --request PATCH 'localhost:3000/api/words/60c7ac2c853b22582177b9fe' \
--header 'Content-Type: application/json' \
--header 'Cookie: accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM3YWJlNTg1M2IyMjU4MjE3N2I5ZmIiLCJ1c2VybmFtZSI6ImdyZWdvb3JvbyIsImlhdCI6MTYyMzcwNDk4NiwiZXhwIjoxNjIzNzkxMzg2fQ.EEP7WW3Ok-uBAs_5Xjcvi_plhXJ7eDeF2HEzcdqQuQs' \
--data-raw '{
    "translations": [
        "rolnictwo"
    ],
    "examples": [
        "Agriculture here is still largely based on traditional methods."
    ],
    "word": "agriculture",
    "definition": "the practice and science of farming",
    "partOfSpeech": "noun"
}'
```

### Delete word

**Endpoint**

```http
DELETE /api/words/:id
```

**Request's configuration**

| Location |  Parameter  | Required |                                     Description                                      |
| :------: | :---------: | :------: | :----------------------------------------------------------------------------------: |
|  Cookie  | accessToken |   true   | A cookie that contains JWT token generated with [POST /api/users/login](#login-user) |
|   Url    |     :id     |   true   |                                   Valid MongoDB id                                   |

**Successful Response (200)**

```json
{
    "success": true,
    "result": {
        "_id": "608edf06c0dd844ef1ea7d56",
        "translations": ["rolnictwo", "uprawa roli"],
        "examples": [
            "Agriculture here is still largely based on traditional methods."
        ],
        "word": "agriculture",
        "definition": "the practice and science of farming",
        "partOfSpeech": "noun"
    }
}
```

-   Result property is a deleted document

**Example**

```sh
curl --location --request DELETE 'localhost:3000/api/words/60c7c6d3ea55cb91efba86ae' \
--header 'Cookie: accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM3YWJlNTg1M2IyMjU4MjE3N2I5ZmIiLCJ1c2VybmFtZSI6ImdyZWdvb3JvbyIsImlhdCI6MTYyMzcwNDk4NiwiZXhwIjoxNjIzNzkxMzg2fQ.EEP7WW3Ok-uBAs_5Xjcvi_plhXJ7eDeF2HEzcdqQuQs'
```
