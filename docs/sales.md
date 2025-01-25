# Sales API

## Create Sales

Endpoint : POST /api/sales

Request Header:
- Authorization : token

Request Body :

```json
{
    "name": "example",
    "email": "example@mail.com",
    "phone": "08123456789",
    "address": "jl. test no. 19",
}
```

Response Body (Success):

```json
{
    "data":{
        "id":"f2a20cf1-1343-456d-ae27-70dd23c3eecb",
        "name":"test",
        "email":"test@mail.com",
        "phone":"08123456789",
        "address":"jl. test no. 19",
    }
}
```

Response Body (Failed):

```json
{
    "errors" : "String must contain at least 1 characters"
}
```

## Get Sales

Endpoint : GET /api/sales/

Request Header:
- Authorization : token

Response Body (Failed):

```json
{

}

```

## Get Specific Sales

Endpoint : GET /api/sales/:id

Request Header:
- Authorization : token

Response Body (Success):

```json
{
    "data":{
        "id":"f2a20cf1-1343-456d-ae27-70dd23c3eecb",
        "name":"test",
        "email":"test@mail.com",
        "phone":"08123456789",
        "address":"jl. test no. 19",
    }
}
```

Response Body (Failed):

```json
{
    "errors" : "Sales not found"
}
```

## Update Sales

Endpoint : PUT /api/sales/:id

Request Header:
- Authorization : token

Request Body :

```json
{
    "name": "example",
    "email": "example@mail.com",
    "phone": "08123456789",
    "address": "jl. test no. 19",
}
```

Response Body (Success):

```json
{
    "data":{
        "id":"f2a20cf1-1343-456d-ae27-70dd23c3eecb",
        "name":"test",
        "email":"test@mail.com",
        "phone":"08123456789",
        "address":"jl. test no. 19",
    }
}
```

Response Body (Failed):

```json
{
    "errors" : "Sales not found"
}
```

## Delete Sales

Endpoint : DELETE /api/sales

Request Body :

```json
{
    "id": "example",
}
```

Response Body (Success):

```json
{
    "data":{"true"}
}
```

Response Body (Failed):

```json
{
    "errors" : "Sales not found"
}
```