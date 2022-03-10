# Scheduling API

<a class="badge badge--secondary" href="https://github.com/City-of-Lincoln-Council/HousingRepairsSchedulingApi">GitHub Repository</a>

## Frameworks used

Written in .Net

## Environment variables
| Name                                                                    | Description                                                                              |
|-------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| AUTHENTICATION_IDENTIFIER                                               | A unique identifier used to validate access.*                                            |
| JWT_SECRET                                                              | A hash secret used for encryption.*                                                      |
| DrsOptions__ApiAddress                                                  | DRS API Address                                                                          |
| DrsOptions__Login                                                       | DRS login user name                                                                      |
| DrsOptions__Password                                                    | DRS login password                                                                       |
| [SENTRY_DSN](/docs/alerting-and-monitoring/intro#azure-component-setup) | [Sentry Data Source Name](https://docs.sentry.io/product/sentry-basics/dsn-explainer/)   |

\* See [Authentication](/docs/apis/authentication) for more details.

## Health Checks

See [Health Checks](/docs/apis/health-checks) for details.

The API is determined to be health if:

- It can _see/reach_ the configured DRS host

DRS doesn't have a health check endpoint and so a ping check was determined to be the best option.

Due to Azure disabling regular ping operations, TCP ping has been used instead.
