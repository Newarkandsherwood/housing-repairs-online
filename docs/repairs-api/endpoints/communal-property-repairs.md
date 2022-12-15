---
sidebar_position: 3
---

# Communal Property Repairs

## GET: `/CommunalPropertyRepairs`

### Request:

#### Authorization

Bearer Token `<token>`

#### Query Params

| Key                     | Example value  | Required |
|-------------------------|----------------| -------- |
| propertyReference       | "1440546"      | ✅       |


### Response:

```json
[
  {
    "address": {
      "display": "123 Cute Street, M3 0W",
      "locationId": "1440546"
    },
    "location": {
      "value": "communalArea",
      "display": "Communal area"
    },
    "problem": {
      "value": "publicToilet",
      "display": "Public toilet"
    },
    "issue": {
      "value": "toiletNotFlushing",
      "display": "Toilet not flushing"
    },
    "description": {
      "text": "description"
    }
  },
  {
    "address": {
      "display": "123 Cute Street, M3 0W",
      "locationId": "1440546"
    },
    "location": {
      "value": "communalArea",
      "display": "Communal area"
    },
    "problem": {
      "value": "doorIncludingBackDoor",
      "display": "Door, including back door"
    },
    "issue": {
      "value": "internalDoorIssueIncludingHingesHandlesOrSticking",
      "display": "Internal door issue, including hinges, handles or sticking"
    },
    "description": {
      "text": "test description"
    }
  }
]
```
