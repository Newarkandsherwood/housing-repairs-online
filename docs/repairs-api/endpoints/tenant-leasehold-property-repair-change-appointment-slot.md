---
sidebar_position: 6
---

# Tenant Or Leasehold Property Repair Change Appointment Slot

## POST: `/TenantOrLeaseholdPropertyRepairChangeAppointmentSlot`

### Request:

#### Authorization

Bearer Token `<token>`

#### Query Params

| Key            | Example value  | Required |
|----------------|----------------| -------- |
| postcode       | "M3 0W"        | ✅       |
| repairId       | "9C36D811"     | ✅       |

#### Body

| Key                 | Example value                                 | Required |
|---------------------|-----------------------------------------------| -------- |
| startDateTime       | "2023-12-14T11:54:13.545Z"                    | ✅       |
| endDateTime         | "2023-12-14T11:54:13.545Z"                    | ✅       |
| display             | "27th January 2023 between 12:00pm to 4:00pm" | ✅       |

```json
{
  "startDateTime": "2023-01-27T12:00:00.000Z",
  "endDateTime": "2023-01-27T16:00:00.000Z",
  "display": "27th January 2023 between 12:00pm to 4:00pm"
}
```

### Response:

HTTP 200 - success OR The repair already has the same start and end times as those provided

HTTP 404 - not found

HTTP 500 - Error
