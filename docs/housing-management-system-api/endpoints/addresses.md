---
sidebar_position: 1
---

# Addresses

## GET: `/TenantAddresses`, `/CommunalAddresses`, `/LeaseholdAddresses` 

### Request:

#### Authorization

Bearer Token `<token>`

#### Query Params

| Key        | Example value | Required |
|------------|---------------| -------- |
| postcode   | M3 0W         | ✅       |


### Response:

List of found addresses

```json
[
    {
        "reference": {
            "id": "53660010",
            "description": null,
            "allocatedBy": "Universal Housing"
        },
        "postbox": null,
        "room": null,
        "department": null,
        "floor": null,
        "plot": null,
        "buildingNumber": "1 Cute Street",
        "buildingName": null,
        "complexName": null,
        "streetName": null,
        "cityName": null,
        "country": null,
        "addressLine": null,
        "type": null,
        "postalCode": "M3 0W"
    },
    {
        "reference": {
            "id": "53660020",
            "description": null,
            "allocatedBy": "Universal Housing"
        },
        "postbox": null,
        "room": null,
        "department": null,
        "floor": null,
        "plot": null,
        "buildingNumber": "2 Cute Street",
        "buildingName": null,
        "complexName": null,
        "streetName": null,
        "cityName": null,
        "country": null,
        "addressLine": [
            "Cute Street 2"
        ],
        "type": null,
        "postalCode": "M3 0W"
    }
]
```
