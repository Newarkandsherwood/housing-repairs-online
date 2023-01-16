# Scheduling API

<a class="badge badge--secondary" href="https://github.com/City-of-Lincoln-Council/HousingRepairsSchedulingApi">GitHub Repository</a>

## Frameworks used

Written in .Net

## Environment variables
| Name                                   | Description                                                                                                          |
|----------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| `AUTHENTICATION_IDENTIFIER` | A unique identifier used to validate access used to validate access. *                                                          |
| `JWT_SECRET`                | JWT secret. *                                                                                                                   |
| `DrsOptions__ApiAddress`    | Live/production DRS API address, e.g. `https://yourserver/OTWebServiceGateway_INSTANCENAME/ws/soap?wsdl`                        |
| `DrsOptions__Contract`      | Contract value to use when making requests to DRS in production                                                                 |
| `DrsOptions__Login`         | DRS login/user name in production                                                                                               |
| `DrsOptions__Password`      | DRS password in production                                                                                                      |
| `SENTRY_DSN`                | [Sentry Data Source Name](https://docs.sentry.io/product/sentry-basics/dsn-explainer/)                                          |

\* See [Authentication](../apis/authentication) for more details.

## Health Checks

See [Health Checks](../apis/health-checks) for details.

The API is determined to be health if:

- It can _see/reach_ the configured DRS host

DRS doesn't have a health check endpoint and so a ping check was determined to be the best option.

Due to Azure disabling regular ping operations, TCP ping has been used instead.
