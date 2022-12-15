---
sidebar_position: 6
---

# Tenant Or Leasehold Property Repair Cancel

## GET: `/TenantOrLeaseholdPropertyRepairCancel`

### Request:

#### Authorization

Bearer Token `<token>`

#### Query Params

| Key            | Example value  | Required |
|----------------|----------------| -------- |
| postcode       | "M3 0W"        | ✅       |
| repairId       | "9C36D811"     | ✅       |

### Response:

HTTP 200 - success

HTTP 404 - not Found

HTTP 500 - error
