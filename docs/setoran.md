# Setoran API

## Create Laporan

Endpoint : POST /api/setoran

Request Header:
- Authorization : token

Request Body :

```json
{
    "setoran": {
        "sales_id": "eb04f2a1-1fd8-4c05-9df7-ec46a1d96112",
        "total": 100000,
        "setor": 100000,
    },
    "transaksi":[
        {
            "produk_id":"9a8f7faa-3969-459a-828f-6915a93b5554",
            "sales_id":"eb04f2a1-1fd8-4c05-9df7-ec46a1d96112",
            "harga":10000,
            "jumlah":3,
            "total":"30000",
        },
        {
            "sales_id": "eb04f2a1-1fd8-4c05-9df7-ec46a1d96112",
            "produk_id": "9a8f7faa-3969-459a-828f-6915a93b5554",
            "harga": 5000,
            "jumlah": 2,
            "total": 10000,
        },
    ]
}
```

Response Body (Success):

```json
{
    "data" : {
        "setoran":{
            "id":"933a75e2-7fd1-42f5-83d3-e2e0622c3bf2",
            "kekurangan":"0",
            "sales_id":"eb04f2a1-1fd8-4c05-9df7-ec46a1d96112",
            "setor":"100000",
            "total":"100000"
        },
        "transaksi":[
            {
                "harga":"10000",
                "id":"8a010aa3-c1c0-4f56-9cf0-0f0a12951c92",
                "jumlah":"3",
                "produk_id":"9a8f7faa-3969-459a-828f-6915a93b5554",
                "sales_id":"eb04f2a1-1fd8-4c05-9df7-ec46a1d96112",
                "setoran_id":"933a75e2-7fd1-42f5-83d3-e2e0622c3bf2","total":"30000",
                "transaksi_id":"933a75e2-7fd1-42f5-83d3-e2e0622c3bf2"
            },
            {
                "id":"c07b22d4-0d10-4bdf-9c4d-94a18f41cf50",
                "setoran_id":"933a75e2-7fd1-42f5-83d3-e2e0622c3bf2","total":"30000",
                "harga":"10000",
                "jumlah":"3",
                "produk_id":"6bb35c92-8d60-492b-a728-f8ff5f55a6e0",
                "sales_id":"eb04f2a1-1fd8-4c05-9df7-ec46a1d96112",
                "transaksi_id":"933a75e2-7fd1-42f5-83d3-e2e0622c3bf2"
            },
            {
                "id":"9e0bf877-a194-4304-8cb8-590d0dc35152",
                "setoran_id":"933a75e2-7fd1-42f5-83d3-e2e0622c3bf2",
                "produk_id":"98be4622-a870-4227-9956-932def7c1af7",
                "sales_id":"eb04f2a1-1fd8-4c05-9df7-ec46a1d96112",
                "transaksi_id":"933a75e2-7fd1-42f5-83d3-e2e0622c3bf2",
                "total":"60000",
                "jumlah":"6",
                "harga":"10000",
            }
        ]
    }
}
```

Response Body (Failed):

```json
{
    "errors" : "Error...."
}
```

## Get Laporan

Endpoint : GET /api/setoran

Request Header:
- Authorization : token

Response Body (Sussces):

```json
{
    "data":[
        {
            "id":"159a4461-0116-4a15-8d62-639c3953c419",
            "sales_id":"21e555de-a274-4770-8654-484affbe98c6",
            "setor":"900000",
            "kekurangan":"100000",
            "total":"1000000"
        },
        {
            "id":"74c2a8ef-8fef-4092-b56e-be8b5c0b9450",
            "sales_id":"21e555de-a274-4770-8654-484affbe98c6",
            "setor":"1800000",
            "kekurangan":"200000",
            "total":"2000000"
        },
        {
            "id":"d954d922-faee-4e9b-837c-fac1d3d1b4ab",
            "sales_id":"21e555de-a274-4770-8654-484affbe98c6",
            "setor":"1400000",
            "kekurangan":"100000",
            "total":"1500000"
        },
        {
            "id":"4691134e-e26b-4386-903a-d3d1431783c1",
            "sales_id":"21e555de-a274-4770-8654-484affbe98c6",
            "kekurangan":"200000",
            "setor":"2300000",
            "total":"2500000"
        },
        {
            "id":"b1392523-d290-4bde-9e21-b83d110643cf",
            "sales_id":"21e555de-a274-4770-8654-484affbe98c6",
            "kekurangan":"100000",
            "setor":"2900000",
            "total":"3000000"
        }
    ]
}
```

Response body (Failed):

```json
{
    "errors":"Unauthorized"
}
```
## Get Specific Laporan

Endpoint : GET /api/setoran/:id

Request Header:
- Authorization : token

Response Body (Success):

```json
{
    "data":{
        "setoran":{
            "id":"b92c30ff-7b7f-47be-8b42-68f26eaa2bfc",
            "sales_id":"25457798-56bc-4e4d-8bf7-a78e794e0e72",
            "kekurangan":"0",
            "setor":"1000000",
            "total":"1000000"
        },
        "transaksi":{
            "data":[
                {
                    "id":"90317624-d9ed-4843-8e97-4a46a630795b",
                    "produk_id":"56bd1be5-29d0-4a2c-aec3-c2339a259143",
                    "sales_id":"25457798-56bc-4e4d-8bf7-a78e794e0e72",
                    "setoran_id":"b92c30ff-7b7f-47be-8b42-68f26eaa2bfc",
                    "harga":"10000",
                    "jumlah":"1",
                    "total":"10000"
                },
                {
                    "id":"96525716-8abd-4fee-a157-ed928d4ef8d6",
                    "produk_id":"5c4685de-263f-49cd-afda-7032896fb755",
                    "sales_id":"25457798-56bc-4e4d-8bf7-a78e794e0e72",
                    "setoran_id":"b92c30ff-7b7f-47be-8b42-68f26eaa2bfc",
                    "harga":"10000",
                    "jumlah":"1",
                    "total":"10000"
                },
                {
                    "id":"a582528f-5d2c-44c5-81a0-e28886a77eb5",
                    "produk_id":"b2981e41-036b-4f3e-86e9-dfe02a24871d",
                    "sales_id":"25457798-56bc-4e4d-8bf7-a78e794e0e72",
                    "setoran_id":"b92c30ff-7b7f-47be-8b42-68f26eaa2bfc",
                    "harga":"10000",
                    "jumlah":"1",
                    "total":"10000"
                }
            ]
        }
    }
}
```

## Update Laporan

Endpoint : PUT /api/setoran/:id

Request Header:
- Authorization : token

Request Body (Success):

```json
{
    "setoran":{
            "sales_id":"25457798-56bc-4e4d-8bf7-a78e794e0e72",
            "setor":"1000000",
            "total":"1000000"
        },
    "transaksi":[
        {
            "id":"90317624-d9ed-4843-8e97-4a46a630795b",
            "produk_id":"56bd1be5-29d0-4a2c-aec3-c2339a259143",
            "sales_id":"25457798-56bc-4e4d-8bf7-a78e794e0e72",
            "setoran_id":"b92c30ff-7b7f-47be-8b42-68f26eaa2bfc",
            "harga":"10000",
            "jumlah":"1",
            "total":"10000"
        },
        {
            "id":"96525716-8abd-4fee-a157-ed928d4ef8d6",
            "produk_id":"5c4685de-263f-49cd-afda-7032896fb755",
            "sales_id":"25457798-56bc-4e4d-8bf7-a78e794e0e72",
            "setoran_id":"b92c30ff-7b7f-47be-8b42-68f26eaa2bfc",
            "harga":"10000",
            "jumlah":"1",
            "total":"10000"
        },
    ]       
}
```

Response Body (Failed):

```json
{
    "errors": "data tidak ditemukan"
}
```

## Delete Laporan

Endpoint : DELETE /api/setoran/:id

Request Header:
- Authorization : token

Response Body (Success):

```json
{
    "data": true
}
```

Response Body (Failed):

```json
{
    "errors": "Data tidak ditemukan"
}
```