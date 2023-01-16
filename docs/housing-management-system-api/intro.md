# Housing Management System API

<a class="badge badge--secondary" href="https://github.com/City-of-Lincoln-Council/HousingManagementSystemApi">GitHub Repository</a>

## Frameworks used

Written in .Net

## Environment variables
| Name                                   | Description                                                                                                       |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| `AUTHENTICATION_IDENTIFIER`            | A unique identifier used to validate access. *                                                                    |        
| `ANCM_ADDITIONAL_ERROR_PAGE_LINK`      | Set the value to the correct path                                                                                 |
| `JWT_SECRET`                           | JWT secret as generated.*                                                                                         |
| `SENTRY_DSN`                           | [Sentry Data Source Name](https://docs.sentry.io/product/sentry-basics/dsn-explainer/)                            |
| `COSMOS_DATABASE_ID`                   | DocumentDB (e.g. CosmosDB) database name                                                                          |
| `COSMOS_TENANT_CONTAINER_ID`           | DocumentDB (e.g. CosmosDB) container name for tenant addresses, e.g. `addresses`                                  |
| `COSMOS_COMMUNAL_CONTAINER_ID`         | DocumentDB (e.g. CosmosDB) container name for communal addresses, e.g. `addresses`                                |
| `COSMOS_LEASEHOLD_CONTAINER_ID`        | DocumentDB (e.g. CosmosDB) container name for leasehold addresses, e.g. `addresses`                               |
| `COSMOS_ENDPOINT_URL`                  | DocumentDB (e.g. CosmosDB) account endpoint URL                                                                   |
| `COSMOS_AUTHORIZATION_KEY`             | DocumentDB (e.g. CosmosDB) account primary key                                                                    |
| `CAPITAOPTIONS__APIADDRESS`            | Capita Service URL                                                                                                |
| `CAPITAOPTIONS__USERNAME`              | Capita Service username                                                                                           |
| `CAPITAOPTIONS__PASSWORD`              | Capita Service password                                                                                           |
| `CAPITAOPTIONS__STANDARDJOBCODE`       | Capita Service stdjobcode                                                                                         |
| `CAPITAOPTIONS__SOURCE`                | Capita Service source                                                                                             |
| `CAPITAOPTIONS__SUBLOCATION`           | Capita Service sublocation                                                                                        |

\* See [Authentication](../apis/authentication) for more details.

## Health Checks

See [Health Checks](../apis/health-checks) for details.

The API is determined to be health if:

- it can connect to the Universal Housing SQL Server database
