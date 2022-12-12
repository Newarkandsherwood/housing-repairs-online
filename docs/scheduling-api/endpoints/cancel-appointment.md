---
sidebar_position: 2
---

# Cancel a repair

## POST: `/Appointments/CancelAppointment`

### Request:

#### Authorization

Bearer Token `<token>`

#### Query Params

| Key              | Example value         | Required |
|------------------|-------------- --------| -------- |
| bookingreference | 2340345345345         | ✅       |

:::info
This makes a subsequent request to the Scheduling System API to cancel an appointment
:::


### Response:

HTTP 200 - success

HTTP 404 - not found

HTTP 500 - Error