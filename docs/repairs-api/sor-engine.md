---
sidebar_position: 3
---

# SoR Engine

Repairs are represented by a Schedule of Rate (SoR) code.

The nationally published register of SoR codes contains 2500+ entries.

Each local authority selects which specific SoR codes it wants to use from the national register.
They can also create new SoR codes if an existing one doesn't fit a particular repair.

Different local authorities can attribute different SoR codes to the same repair as represented within Housing Repairs Online service.

For example, a repair of a kitchen cupboard door hanging off, local authority 1 can use SoR code 123 and local authority 2 can use SoR code ABC.

Due to this difference, the SoR engine was created to allow each local authority to be able to use the specific SoR code they would prefer for each online reportable repair.

The SoR Engine offers a 3-tiered mapping of where, what and best description of the issue to a SoR code.

Here is an example of the values possible at the 3 tiers:

| Tier question     | Value            |
|-------------------|------------------|
| Where?            | Kitchen          |
| What?             | Cupboard         |
| Best Description? | Door Hanging Off |

:::note
All journey's must have a minimum of 2 tiers and some do not have 3 tier's, e.g. Kitchen - Worktop

| Tier question     | Value            |
|-------------------|------------------|
| Where?            | Kitchen          |
| What?             | Worktop          |
| Best Description? | -                |
:::

### Configuration
The SoR engine is configured by specifying the `SOR_CONFIGURATION` environment variable.

The configuration allows specifying the key value, display text and either options (used to gather additional information) or a SoR code.

The `SOR_CONFIGURATION` value is used to determine which options to offer at each tier (where, what and best description) and a SoR code for the combination of options.  
The display text is shown to the user within the frontend.  
The value specified is used as a key to identify that option. All values need to be unique and do not need to be human readable as they won't be displayed.

#### Early Exit Points
An early exit point is an option selection which stops the user from continuing to make a repair request.
The following describes the values to use for specific exit points:

| Value                   | Description                                                     |
|-------------------------|-----------------------------------------------------------------|
| Emergency               | A option selected is identified as an emergency                 |
| UnableToBook            | A option which is not bookable via the service                  |
| NotEligibleNonEmergency | A option for which the Local Authority _may_ not be responsible |


When these options are selected, appropriate information is presented to the user.

## Example Configuration
The following example has:
- 2 and 3 tier options
- Each of the early exit points (both at tier 2 and tier 3)

```JSON
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
            "sorCode": "N373049"
          },
          {
            "value": "doorMissing",
            "display": "Missing door",
            "sorCode": "N373049"
          }
        ]
      },
      {
        "value": "worktop",
        "display": "Damaged worktop",
        "sorCode": "N372005"
      },
      {
        "value": "UnableToBook",
        "display": "Heating or hot water"
      },
      {
        "value": "dampOrMould",
        "display": "Damp or mould",
        "options": [
          {
            "value": "Emergency",
            "display": "Damp or mould caused by a leak"
          },
          {
            "value": "dampOrMould",
            "display": "Damp or mould caused by something else",
            "sorCode": "N114001"
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
            "sorCode": "N330007"
          },
          {
            "value": "NotEligibleNonEmergency",
            "display": "Adjusting a door after a carpet fitting"
          },
          {
            "value": "Emergency",
            "display": "Door is on fire"
          },
          {
            "value": "UnableToBook",
            "display": "Don't like door colour"
          }
        ]
      }
    ]
  }
]
```