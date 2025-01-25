# User API

## Registrasi User

Endpoint : POST /api/user

Request Body :

```json
{
    "username": "imadeeko",
    "password": "admin123",
    "name": "I Made Eko Satria Wiguna",
}
```

Response Body (Success):

```json
{
    "data" : {
        "username" : "imadeeko",
        "name" : "I Made Eko Satria Wiguna",
    }
}
```

Response Body (Failed):

```json
{
    "errors" : "Username must not blank....."
}
```

## Login User

Endpoint : POST /api/users/login

Request Body : 

```json
{
    "username": "imadeeko",
    "password": "awokawok",
}
```

Response Body (Succes):

```json
{
    "data": {
        "username": "imadeeko",
        "name": "I Made Eko Satria Wiguna",
        "token": "token"
    }
}
```

## Get User

Enpoint : GET /api/users/current

Request Header:
- Authorization : token

Response Body (Succes):

```json
{
    "data": {
        "username": "imadeeko",
        "name": "I Made Eko Satria Wiguna",
    }
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header:
- Authorization : token

Request Body:

```json
{
    "name": "Kalau mau update nama",
    "password": "Kalau mau update password"
}
```

Response Body (Succes):

```json
{
    "data": {
        "username": "imadeeko",
        "name": "I Made Eko Satria Wiguna",
    }
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header:
- Authorization : token

Response Body (Succes)

```json
{
    "data": true
}
```