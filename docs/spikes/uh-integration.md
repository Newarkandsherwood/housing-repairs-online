---
sidebar_position: 1
---

# Civica Universal Housing Integration

## Introduction

Civica Universal Housing is a Housing Management System (HMS) which is used at Lincoln to manage social housing residents, properties and tenancies.

The Housing Repairs Online service has a need to lookup properties that are valid for reporting repairs against using the service.

This need will be facilitated by using Civica Universal Housing to provide details of valid properties.

## Background

Civica Universal Housing, UH, is a closed system which doesn’t provide programmatic access (i.e. an API) for querying properties (or any other information).

UH uses a database for storing its data.
We’ve been provided with the database SQL that would be required to query UH for property details (see [Appendix A](#appendix-a)).

## Options

The following are possible approaches to using property information from UH:

### 1. Export valid properties

Valid property information could be exported by querying the UH database and provided in a suitable format that could be used by our service.

_Pros:_
  - Very simple to extract
  - Quick to set up
  - Would be agnostic of UH schema changes

_Cons:_

  - May become outdated as property changes are made to UH
  - Would need a process to maintain exported property data
  - Requires database level access, which may not be possible at all Local Authorities

### 2. Create a database view or stored procedure to provide required data

A database view or stored procedure could be created that would provide property details.

_Pros:_
  - Easy to create
  - Data would always be current/up to date
  - Would be agnostic of UH schema changes

_Cons:_
  - Requires database level access, which may not be possible at all Local Authorities
  - Local Authorities may not allow creation of views
  - Needing to prepare an external system creates an additional adoption dependency

### 3. Use Civica UH database directly

Use database access to retrieve current property details from a UH database.

_Pros:_
  - Property details will always be current
  - No external dependency maintenance required

_Cons:_
  - Need to understand UH schema
  - Time consuming (possibly)
  - Requires database level access, which may not be possible at all Local Authorities

## Summary

Although options 1 and 2 are simple in nature and would be quick to deliver, they have major drawbacks of stale data and external dependencies respectively which make them undesirable.

Option 3 could be slower to implement but removes external dependencies and would also provide property details which would always be current.

Each of the options require database level access, which would need to be provided by the Local Authority requiring the service.

## Conclusion

I recommend using option 3 to create an API over the Universal Housing database such that current data is always available.

---

## Appendix A

```sql
SELECT pr.prop_ref,
       pr.u_nlpguprn,
       Rtrim(pr.post_desig) + ' '
       + Replace(pr.short_address, Rtrim(pr.post_desig), '')
       + pr.post_code  AS address,
       ptype.lu_desc   AS 'prop_type',
       pr.sheltered,
       pr.num_bedrooms AS 'beds',
       pr.u_blk_floors AS 'floors',
       ten.tenure
FROM   property AS pr
       --rent details
       LEFT OUTER JOIN rent AS r
                    ON pr.prop_ref = r.prop_ref
       --tenancy
       LEFT OUTER JOIN tenagree AS ten
                    ON pr.prop_ref = ten.prop_ref
       --property type description
       LEFT OUTER JOIN (SELECT [lu_ref],
                               [lu_desc]
                        FROM   [UHLive].[dbo].[lookup]
                        WHERE  lu_type = 'GPT') AS ptype
                    ON r.prop_type = ptype.lu_ref
WHERE  level_code IN ( '2' )
       AND eot = '1900-01-01 00:00:00'

```
