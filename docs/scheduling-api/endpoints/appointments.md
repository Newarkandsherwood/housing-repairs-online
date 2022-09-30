---
sidebar_position: 1
---

# Available appointments

## GET: `/Appointments/AvailableAppointments`

### Request:

#### Authorization

Bearer Token `<token>`

#### Query Params

| Key        | Example value        | Required |
|------------|----------------------| -------- |
| sorCode    | 123ABC               | ✅       |
| locationId | 333333               | ✅       |
| fromDate   | 2022-03-09T08:00:00Z |          |

#### Body
The *optional* body should be a list of allowed appointment slots, with a `startTime` and `endTime` in JSON format, i.e,
```json
[
    {
        "startTime": "08:00:00",
        "endTime": "12:00:00"
    },
    {
        "startTime": "12:00:00",
        "endTime": "16:00:00"
    },
    {
        "startTime": "08:00:00",
        "endTime": "16:00:00"
    }
]
```

If no body is present in the request, all available appointment slots will be returned.

### Response:

List of available appointment slots from DRS

```json
[
    {
        "repairsProviderDegreeOfPreference": null,
        "repairsProviderPreferenceDescription": null,
        "meetsSLA": null,
        "meetsCustomerPreference": null,
        "customerDegreeOfPreference": null,
        "date": "2022-03-15T00:00:00Z",
        "timeOfDay": {
            "name": null,
            "earliestArrivalTime": "2022-03-15T12:00:00Z",
            "latestArrivalTime": "2022-03-15T16:00:00Z",
            "latestCompletionTime": "0001-01-01T00:00:00"
        },
        "workElementReference": null,
        "reference": null
    },
    {
        "repairsProviderDegreeOfPreference": null,
        "repairsProviderPreferenceDescription": null,
        "meetsSLA": null,
        "meetsCustomerPreference": null,
        "customerDegreeOfPreference": null,
        "date": "2022-03-16T00:00:00Z",
        "timeOfDay": {
            "name": null,
            "earliestArrivalTime": "2022-03-16T08:00:00Z",
            "latestArrivalTime": "2022-03-16T12:00:00Z",
            "latestCompletionTime": "0001-01-01T00:00:00"
        },
        "workElementReference": null,
        "reference": null
    },
    {
        "repairsProviderDegreeOfPreference": null,
        "repairsProviderPreferenceDescription": null,
        "meetsSLA": null,
        "meetsCustomerPreference": null,
        "customerDegreeOfPreference": null,
        "date": "2022-03-16T00:00:00Z",
        "timeOfDay": {
            "name": null,
            "earliestArrivalTime": "2022-03-16T12:00:00Z",
            "latestArrivalTime": "2022-03-16T16:00:00Z",
            "latestCompletionTime": "0001-01-01T00:00:00"
        },
        "workElementReference": null,
        "reference": null
    }
]
```
