---
sidebar_position: 1
---

# Address search

## GET: `/TenantAddresses` `/CommunalAddresses` `/LeaseholdAddresses` 

### Request:

#### Authorization

Bearer Token `<token>`

#### Query Params

| Key      | Example value | Required |
|----------|-------------- | -------- |
| postcode | M3 0W         | ✅       |

:::info
This makes a subsequent request to the Housing management API to retrieve
eligible addresses
:::

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
