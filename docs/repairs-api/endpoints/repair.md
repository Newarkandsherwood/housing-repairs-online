---
sidebar_position: 3
---

# Save repair

## POST: `/TenantRepair`  `/LeaseholdRepair`  `/CommunalRepair`

### Request:

#### Authorization

Bearer Token `<token>`

#### Body

```json
{
    "postcode": "M3 0W",
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
    "contactPersonNumber": "01234567890",
    "description": {
        "fileextension": "png", // required if base64img is required
        "base64img": "== base64 encoded image ==", // optional
        "text": "Excepturi quod aute "
    },
    "contactDetails": {
        "type": "email", // can be set to sms
        "value": "luna@email.com" // must be a mobile number if type is sms
    },
    "time": {
        "value": "27th January 2022 12:00pm to 4:00pm",
        "display": "27th January 2022 between 12:00pm to 4:00pm"
    }
}
```
:::info
This makes the following subsequent requests:
1. Upload the base 64 image to azure blob storage
2. Upload a record of the repair to Cosmos DB
3. Make a request to the Scheduling API to book the appointment slot
4. Sends a notification of appointment to provided `contactDetails`
:::

### Response:

`Id` of saved repair

```json
9C36D811
```
