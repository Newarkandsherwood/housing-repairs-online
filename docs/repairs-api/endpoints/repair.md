---
sidebar_position: 3
---

# Save repair

## POST: `/repair`

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
        "fileextension": "png",
        "base64img": "== base64 encoded image ==",
        "text": "Excepturi quod aute "
    },
    "contactDetails": {
        "type": "email",
        "value": "luna@email.com"
    },
    "time": {
        "value": "27th January 2022 12:00pm to 4:00pm",
        "display": "27th January 2022 between 12:00pm to 4:00pm"
    }
}
```

### Response:

`Id` of saved repair

```json
9C36D811
```
