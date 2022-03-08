---
sidebar_position: 1
---

# API Authentication

<a class="badge badge--secondary" href="https://github.com/City-of-Lincoln-Council/HousingRepairsOnline.Authentication">GitHub Repository</a>

## Authentication
Requests to each API requires authentication.

The API implements JSON Web Tokens (JWT) for authentication.

A unique, secret identifier is required to generate a JWT.

### Environment Variables

| Name                      | Description                                  | Example                                                          |
|---------------------------|----------------------------------------------|------------------------------------------------------------------|
| AUTHENTICATION_IDENTIFIER | A unique identifier used to validate access. | SuperSecretIdentifier                                            |
| JWT_SECRET                | A SHA256 hash secret used for encryption.    | c25d5938d2bbe462887909d941638c80757f3eee18dfcd03559ac544d43cf51e |

## Endpoints

Each API has an additional endpoint for authentication:

#### POST: `/authentication`

#### Query Params

| Key        | Example value | Required |
|------------|-------------- | -------- |
| identifier | SuperSecretIdentifier         | ✅       |

#### Response
Encrytped JWT (with a 1 minute expiry):
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDY3MzE2NjksImlzcyI6IkhvdXNpbmcgTWFuYWdlbWVudCBTeXN0ZW0gQXBpIiwiYXVkIjoiSG91c2luZyBSZXBhaXJzIE9ubGluZSJ9.NQA-T_EIMRv8294KLJO0jQ1lT3_RE7sneFhjdvoRXSg
```

Requests to authenticated endpoints should include the JWT response in an `Authorization` header:
```
GET https://api.address/AuthenticatedEndpoint
Authorization: Bearer <JWT TOKEN FROM RESPONSE>
```