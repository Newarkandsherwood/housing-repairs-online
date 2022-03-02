---
sidebar_position: 1
---

# Address search

## GET: `/Addresses`

### Request:

#### Authorization

Bearer Token `<token>`

#### Query Params

| Key      | Example value |
|----------|-------------- |
| postcode | M3 0W         |

### Response:

List of eligible addresses

```json
[
    {
        "locationId": "111111",
        "addressLine1": "121 Cute Street",
        "addressLine2": null,
        "postCode": "M3 0W"
    },
    {
        "locationId": "222222",
        "addressLine1": "122 Cute Street",
        "addressLine2": null,
        "postCode": "M3 0W"
    },
    {
        "locationId": "333333",
        "addressLine1": "123 Cute Street",
        "addressLine2": null,
        "postCode": "M3 0W"
    }
]
```
