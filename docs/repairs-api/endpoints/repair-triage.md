---
sidebar_position: 4
---

# Repair Triage

## GET: `/repairTriage`

### Request:

#### Authorization

Bearer Token `<token>`

#### Query Params

| Key                      | Example value           | Required |
|--------------------------|-------------------------| -------- |
| emergencyValue           | emergency               | ✅       |
| notEligibleNonEmergency  | notEligibleNonEmergency | ✅       |
| unableToBook             | unableToBook            | ✅       |

### Response:

Repair triage options

```json
[
  {
    "value": "kitchen",
    "display": "Kitchen",
    "options": [
      {
        "value": "cupboards",
        "display": "Cupboards, including damaged...",
        "options": [
          {
            "value": "doorHangingOff",
            "display": "Hanging Door",
            "sorCode": "00001"
          },
          {
            "value": "doorMissing",
            "display": "Missing door",
            "sorCode": "00002"
          }
        ]
      },
      {
        "value": "worktop",
        "display": "Damaged worktop",
        "sorCode": "00003"
      },
      {
        "value": "dampOrMould",
        "display": "Damp or mould",
        "options": [
          {
            "value": "emergency",
            "display": "Damp or mould caused by a leak"
          },
          {
            "value": "dampOrMould",
            "display": "Damp or mould caused by something else",
            "sorCode": "00004"
          }
        ]
      },
      {
        "value": "unableToBook",
        "display": "Heating or hot water"
      },
      {
        "value": "electrical",
        "display": "Electrical, including extractor fans and lightbulbs",
        "options": [
          {
            "value": "lights",
            "display": "Lights",
            "sorCode": "00005"
          },
          {
            "value": "sockets",
            "display": "Sockets",
            "sorCode": "00006"
          }
        ]
      }
    ]
  },
  {
    "value": "bathroom",
    "display": "Bathroom",
    "options": [
      {
        "value": "bath",
        "display": "Bath, including taps",
        "options": [
          {
            "value": "bathTaps",
            "display": "Bath taps",
            "sorCode": "00007"
          },
          {
            "value": "sealAroundBath",
            "display": "Seal around bath",
            "sorCode": "00008"
          }
        ]
      }
    ]
  },
  {
    "value": "bedroom",
    "display": "Bedroom",
    "options": [
      {
        "value": "damagedOrStuckDoors",
        "display": "Damaged or stuck doors",
        "options": [
          {
            "value": "internalDoorIssue",
            "display": "Internal door issue, including hinges, handle, sticking",
            "sorCode": "00009"
          },
          {
            "value": "notEligibleNonEmergency",
            "display": "Adjusting a door after a carpet fitting"
          },
          {
            "value": "emergency",
            "display": "Door is on fire"
          },
          {
            "value": "unableToBook",
            "display": "Don't like door colour"
          }
        ]
      }
    ]
  }
]
```
