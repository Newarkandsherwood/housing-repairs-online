# Scheduling API

<a class="badge badge--secondary" href="https://github.com/City-of-Lincoln-Council/HousingRepairsSchedulingApi">GitHub Repository</a>

## Frameworks used

Written in .Net

## Environment variables
| Name                                   | Description                                                                                                          |
|----------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| `APP_SERVICE_NAME`                     | Service name (must be unqiue across whole of Azure) e.g. `housing-repairs-scheduling-api-{LOCAL_AUTHORITY_NAME}`     |
| `AUTHENTICATION_IDENTIFIER_PRODUCTION` | A unique identifier used to validate access used to validate access in production.*                                  |
| `AUTHENTICATION_IDENTIFIER_STAGING`    | A unique identifier used to validate access used to validate access in staging.*                                     |
| `DRS_API_ADDRESS_PRODUCTION`           | Live/production DRS API address, e.g. `https://yourserver/OTWebServiceGateway_INSTANCENAME/ws/soap?wsdl`             |
| `DRS_API_ADDRESS_STAGING`              | Test/staging DRS API address, e.g. `https://yourserver/OTWebServiceGateway_INSTANCENAME/ws/soap?wsdl`                |
| `DRS_CONTRACT_PRODUCTION`              | Contract value to use when making requests to DRS in production                                                      |
| `DRS_CONTRACT_STAGING`                 | Contract value to use when making requests to DRS in staging                                                         |
| `DRS_LOGIN_PRODUCTION`                 | DRS login/user name in production                                                                                    |
| `DRS_LOGIN_STAGING`                    | DRS login/user name in staging                                                                                       |
| `DRS_PASSWORD_PRODUCTION`              | DRS password in production                                                                                           |
| `DRS_PASSWORD_STAGING`                 | DRS password in staging                                                                                              |
| `DRS_PRIORITY_PRODUCTION`              | Priority to use when making requests to DRS in production                                                            |
| `DRS_PRIORITY_STAGING`                 | Priority to use when making requests to DRS in staging                                                               |
| `JWT_SECRET_PRODUCTION`                | JWT secret generated for production.*                                                                                |
| `JWT_SECRET_STAGING`                   | JWT secret generated for staging.*                                                                                   |
| `NUGET_AUTH_GITHUB_TOKEN`              | Authentication token for authenticating with GitHub NuGet feed                                                       |
| `NUGET_AUTH_GITHUB_USERNAME`           | Username for authenticating with GitHub NuGet feed                                                                   |
| `RESOURCE_GROUP_LOCATION`              | Azure Resource Group location, e.g. `UK South`                                                                       |
| `RESOURCE_GROUP_NAME`                  | Azure Resource Group name                                                                                            |
| `SENTRY_DSN`                           | [Sentry Data Source Name](https://docs.sentry.io/product/sentry-basics/dsn-explainer/)                               |
| `SERVICE_PLAN_NAME`                    | Service plan name (must be unique across whole of Azure) e.g. `housing-repairs-schduling-api-{LOCAL_AUTHORITY_NAME}` |
| `STATE_CONTAINER_NAME`                 | The name of the container to store Terraform state in                                                                |
| `STATE_KEY_NAME`                       | The file path and name of your Terraform state file                                                                  |
| `STORAGE_ACCOUNT_NAME`                 | Storage account name for Terraform state, e.g. `housing-repairs-online`                                              |

\* See [Authentication](../apis/authentication) for more details.

## Health Checks

See [Health Checks](../apis/health-checks) for details.

The API is determined to be health if:

- It can _see/reach_ the configured DRS host

DRS doesn't have a health check endpoint and so a ping check was determined to be the best option.

Due to Azure disabling regular ping operations, TCP ping has been used instead.
