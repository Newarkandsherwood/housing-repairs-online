---
sidebar_position: 3
---

# Update an appointment slot

## POST: `/Appointments/UpdateAppointmentSlot`

### Request:

#### Authorization

Bearer Token `<token>`

#### Query Params

| Key              | Example value                   | Required |
|------------------|---------------------------------| -------- |
| bookingreference | 2340345345345                   | ✅       |
| startDateTime    | "2023-12-14T11:54:13.545Z"      | ✅       |
| endDateTime      | "2023-12-14T11:54:13.545Z"      | ✅       |

:::info
This makes a subsequent request to the Scheduling System API to update an appointment slot
:::


### Response:

HTTP 200 - success

HTTP 404 - not found

HTTP 500 - error