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

Response Body (Success):

```json
{
    "data":[
        {
        "id":"f2a20cf1-1343-456d-ae27-70dd23c3eecb",
        "name":"test",
        "email":"test@mail.com",
        "phone":"08123456789",
        "address":"jl. test no. 19"
        },
        {
        "id":"a3b20cf1-2343-456d-be27-80dd23c3eecb",
        "name":"example",
        "email":"example@mail.com",
        "phone":"08123456780",
        "address":"jl. example no. 20"
        },
        {
        "id":"b4c20cf1-3343-456d-ce27-90dd23c3eecb",
        "name":"sample",
        "email":"sample@mail.com",
        "phone":"08123456781",
        "address":"jl. sample no. 21"
        }
    ]
}
```

Response Body (Failed):

```json
{
    "errors": "No sales record found"
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

Endpoint : DELETE /api/sales:id

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