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

|       Location       | Parameter | Required |                             Description                             |
| :------------------: | :-------: | :------: | :-----------------------------------------------------------------: |
| Authorization Header |  Bearer   |   true   | valid jwt token generated with [POST /api/users/login](#login-user) |

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

## Words

### Add new word

**Endpoint**

```http
POST /api/words
```

**Request's configuration**

|       Location       |  Parameter   | Required |                             Description                             |
| :------------------: | :----------: | :------: | :-----------------------------------------------------------------: |
| Authorization Header |    Bearer    |   true   | valid jwt token generated with [POST /api/users/login](#login-user) |
|         Body         |     word     |   true   |                     string, **Compound Index**                      |
|         Body         |  definition  |   true   |                               string                                |
|         Body         | translations |   true   |                array of strings, **Compound Index**                 |
|         Body         |   examples   |   true   |                          array of strings                           |
|         Body         | partOfSpeech |   true   |                               string                                |

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
curl --request POST \
  --url http://localhost:3000/api/words \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDg3MWUwZDI5OWRhZDM5MzJhOWNjNmEiLCJ1c2VybmFtZSI6ImdyZWdvb3JvbyIsImlhdCI6MTYxOTk3NTkzOSwiZXhwIjoxNjIwMDYyMzM5fQ.HbaA_Rtq7h4aFPyLEbWNk5DtqSP9yqxL_wft5sxLeyM' \
  --header 'Content-Type: application/json' \
  --data '{
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

|       Location       | Parameter | Required |                             Description                             |
| :------------------: | :-------: | :------: | :-----------------------------------------------------------------: |
| Authorization Header |  Bearer   |   true   | valid jwt token generated with [POST /api/users/login](#login-user) |
|        Query         |   page    | false\*  |                       Pagination: page number                       |
|        Query         |   limit   | false\*  |                Pagination: amount of items per page                 |

-   If either page or limit is provided in a request other one must be provided too

**Successful Response (200)**

```json
{
    "success": true,
    "result": [
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
```

**Example**

```sh
curl --request GET \
  --url 'http://localhost:3000/api/words?page=1&limit=2' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDg3MWUwZDI5OWRhZDM5MzJhOWNjNmEiLCJ1c2VybmFtZSI6ImdyZWdvb3JvbyIsImlhdCI6MTYxOTk3NTkzOSwiZXhwIjoxNjIwMDYyMzM5fQ.HbaA_Rtq7h4aFPyLEbWNk5DtqSP9yqxL_wft5sxLeyM'
```

### Get word

**Endpoint**

```http
GET /api/words/:id
```

**Request's configuration**

|       Location       | Parameter | Required |                             Description                             |
| :------------------: | :-------: | :------: | :-----------------------------------------------------------------: |
| Authorization Header |  Bearer   |   true   | valid jwt token generated with [POST /api/users/login](#login-user) |
|         Url          |    :id    |   true   |                          Valid MongoDB id                           |

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
curl --request GET \
  --url http://localhost:3000/api/words/608edf06c0dd844ef1ea7d56 \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDg3MWUwZDI5OWRhZDM5MzJhOWNjNmEiLCJ1c2VybmFtZSI6ImdyZWdvb3JvbyIsImlhdCI6MTYxOTk3NTkzOSwiZXhwIjoxNjIwMDYyMzM5fQ.HbaA_Rtq7h4aFPyLEbWNk5DtqSP9yqxL_wft5sxLeyM'
```

### Update Word

**Endpoint**

```http
PATCH /api/words/:id
```

**Request's configuration**

|       Location       |  Parameter   | Required |                             Description                             |
| :------------------: | :----------: | :------: | :-----------------------------------------------------------------: |
| Authorization Header |    Bearer    |   true   | valid jwt token generated with [POST /api/users/login](#login-user) |
|         Url          |     :id      |   true   |                          Valid MongoDB id                           |
|         Body         |     word     |   true   |                     string, **Compound Index**                      |
|         Body         |  definition  |   true   |                               string                                |
|         Body         | translations |   true   |                array of strings, **Compound Index**                 |
|         Body         |   examples   |   true   |                          array of strings                           |
|         Body         | partOfSpeech |   true   |                               string                                |

-   Word and translation (element in array) together form a compound index which mean word and translation must be unique

**Successful Response (200)**

```json
{
{
  "success": true,
  "result": {
    "_id": "608edf06c0dd844ef1ea7d56",
    "translations": [
      "rolnictwo",
      "uprawa roli"
    ],
    "examples": [
      "Agriculture here is still largely based on traditional methods."
    ],
    "word": "agriculture",
    "definition": "the practice and science of farming",
    "partOfSpeech": "noun",
  }
}
```

-   Result property is a new version of a document that was modified

**Example**

```sh
curl --request PATCH \
  --url http://localhost:3000/api/words/608edf06c0dd844ef1ea7d56 \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDg3MWUwZDI5OWRhZDM5MzJhOWNjNmEiLCJ1c2VybmFtZSI6ImdyZWdvb3JvbyIsImlhdCI6MTYyMDA2MjAyOCwiZXhwIjoxNjIwMTQ4NDI4fQ.7ujrJk6oVqniotNqMz8uQFzbW2fVetYIrBWJrQjvs_4' \
  --header 'Content-Type: application/json' \
  --data '{
	"word": "agriculture",
	"definition": "the practice and science of farming",
	"translations": [
		"rolnictwo",
		"uprawa roli"
	],
	"examples": [
		"Agriculture here is still largely based on traditional methods."
	],
	"partOfSpeech": "noun"
}'
```

### Delete word

**Endpoint**

```http
DELETE /api/words/:id
```

**Request's configuration**

|       Location       | Parameter | Required |                             Description                             |
| :------------------: | :-------: | :------: | :-----------------------------------------------------------------: |
| Authorization Header |  Bearer   |   true   | valid jwt token generated with [POST /api/users/login](#login-user) |
|         Url          |    :id    |   true   |                          Valid MongoDB id                           |

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
curl --request DELETE \
  --url http://localhost:3000/api/words/608edf06c0dd844ef1ea7d56 \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDg3MWUwZDI5OWRhZDM5MzJhOWNjNmEiLCJ1c2VybmFtZSI6ImdyZWdvb3JvbyIsImlhdCI6MTYyMDA2MjAyOCwiZXhwIjoxNjIwMTQ4NDI4fQ.7ujrJk6oVqniotNqMz8uQFzbW2fVetYIrBWJrQjvs_4'
```
