# 3. Separate API Endpoints for Each Repair Type

Date: 2022-10-19

## Status

Accepted

## Context

The Housing Repairs application has several API endpoints for both submitting and retrieving data where the result of the API call depends on the repair type. This can be Tenant, Communal or Leasehold.  

There are 2 ways of defining these endpoints.

1. Have a single endpoint that takes a parameter to denote the repair type. For example, 

```
    GetAddresses(repairType: string)
```
2. Have 3 endpoints, one for each repair type. For example,

```
    GetTenantAddresses()
    GetCommunalAddresses()
    GetLeaseholdAddresses()
```
This has the advantage that the code is clearer to read due to the clear intent of the endpoint and the possibility of passing the wrong repair type as a parameter in API calls is eliminated.

We should have a consistent approach for this throughout the application.


## Decision

We will have a separate endpoint for each repair type as per point 2 above.

## Consequences

- There will be increased engineering effort in implementing extra endpoints.
