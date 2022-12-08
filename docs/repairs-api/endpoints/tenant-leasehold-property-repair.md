---
sidebar_position: 3
---

# Tenant Or Leasehold Property Repair

## GET: `/TenantOrLeaseholdPropertyRepair`

### Request:

#### Authorization

Bearer Token `<token>`

#### Query Params

| Key            | Example value  | Required |
|----------------|----------------| -------- |
| postcode       | "M3 0W"        | ✅       |
| repairId       | "9C36D811"     | ✅       |

### Response:

```json
{
    "address": {
        "display": "123 Cute Street, M3 0W",
        "locationId": "3333333"
    },
    "location": {
        "value": "kitchen",
        "display": "Kitchen"
    },
    "problem": {
        "value": "cupboards",
        "display": "Cupboards, including damaged cupboard doors"
    },
    "issue": {
        "value": "doorHangingOff",
        "display": "Hanging door"
    },
    "appointmentTime": {
        "startDateTime": "2022-01-27T12:00:00Z",
        "endDateTime": "2022-01-27T16:00:00Z",
        "display": "27th January 2022 between 12:00pm to 4:00pm"
    }
}
```
