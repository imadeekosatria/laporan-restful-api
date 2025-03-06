# Produk API

## Create Produk

Endpoing: POST /api/produk

Request Header:
- Authorization : token

Request Body :

```json
{
    "name": "example",
    "harga_satuan": 10000,
    "harga": 1000,
    "stok": 20,
    "description": "description example",
}
```

Response Body (Success) :

```json
{
    "data":{
        "id":"f2a20cf1-1343-456d-ae27-70dd23c3eecb",
        "name": "example",
        "harga_satuan": 10000,
        "harga": 1000,
        "stok": 20,
        "description": "description example",
    }
}
```

Response Body (Failed):

```json
{
    "errors" : "Name required"
}
```

## Get Produk

Endpoing: GET /api/produk

Request Header:
- Authorization : token

Response Body (Success) :

```json
{
    "data":[
        {
            "id":"f2a20cf1-1343-456d-ae27-70dd23c3eecb",
            "name": "example",
            "harga_satuan": 10000,
            "harga": 1000,
            "stok": 20,
            "description": "description example"
        },
        {
            "id":"a3b21df2-2454-567e-bf38-81ee34d4ffdc",
            "name": "example2",
            "harga_satuan": 15000,
            "harga": 1500,
            "stok": 30,
            "description": "description example2"
        },
        {
            "id":"b4c32ef3-3565-678f-cg49-92ff45e5gged",
            "name": "example3",
            "harga_satuan": 20000,
            "harga": 2000,
            "stok": 40,
            "description": "description example3"
        }
    ]
}
```

Response Body (Failed):

```json
{
    "errors" : "No produk data found"
}
```


## Get Specific Produk

Endpoing: GET /api/produk/:id

Request Header:
- Authorization : token

Response Body (Success) :

```json
{
    "data":{
        "id":"f2a20cf1-1343-456d-ae27-70dd23c3eecb",
        "name": "example",
        "harga_satuan": 10000,
        "harga": 1000,
        "stok": 20,
        "description": "description example",
    }
}
```

Response Body (Failed):

```json
{
    "errors" : "No produk data found"
}
```

## Update Specific Produk

Endpoing: PUT /api/produk/:id

Request Header:
- Authorization : token

Request Body :

```json
{
    "name": "example",
    "harga_satuan": 10000,
    "harga": 1000,
    "stok": 20,
    "description": "description example",
}
```

Response Body (Success) :

```json
{
    "data":{
        "id":"f2a20cf1-1343-456d-ae27-70dd23c3eecb",
        "name": "example",
        "harga_satuan": 10000,
        "harga": 1000,
        "stok": 20,
        "description": "description example",
    }
}
```

Response Body (Failed):

```json
{
    "errors" : "Name already used"
}
```

## Delete Specific Produk

Endpoing: DELETE /api/produk/:id

Request Header:
- Authorization : token

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