---
sidebar_position: 2
---

# Available appointments

## GET: `/appointments/AvailableAppointments`

### Request:

#### Authorization

Bearer Token `<token>`

#### Query Params

| Key            | Example value  |
|----------------|----------------|
| repairLocation | kitchen        |
| repairProblem  | cupboards      |
| repairIssue    | doorHangingOff |
| locationId     | 333333         |

:::info
This makes a subsequent request to the Scheduling API to retrieve
available appointments
:::

### Response:

List of available appointment slots

```json
[
    {
        "id": null,
        "startTime": "2022-03-09T08:00:00Z",
        "endTime": "2022-03-09T12:00:00Z"
    },
    {
        "id": null,
        "startTime": "2022-03-09T12:00:00Z",
        "endTime": "2022-03-09T16:00:00Z"
    },
    {
        "id": null,
        "startTime": "2022-03-11T08:00:00Z",
        "endTime": "2022-03-11T12:00:00Z"
    },
    {
        "id": null,
        "startTime": "2022-03-11T12:00:00Z",
        "endTime": "2022-03-11T16:00:00Z"
    },
    {
        "id": null,
        "startTime": "2022-03-14T08:00:00Z",
        "endTime": "2022-03-14T12:00:00Z"
    },
    {
        "id": null,
        "startTime": "2022-03-14T12:00:00Z",
        "endTime": "2022-03-14T16:00:00Z"
    },
    {
        "id": null,
        "startTime": "2022-03-15T08:00:00Z",
        "endTime": "2022-03-15T12:00:00Z"
    },
    {
        "id": null,
        "startTime": "2022-03-15T12:00:00Z",
        "endTime": "2022-03-15T16:00:00Z"
    },
    {
        "id": null,
        "startTime": "2022-03-16T08:00:00Z",
        "endTime": "2022-03-16T12:00:00Z"
    },
    {
        "id": null,
        "startTime": "2022-03-16T12:00:00Z",
        "endTime": "2022-03-16T16:00:00Z"
    }
]
```
