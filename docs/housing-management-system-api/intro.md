# Housing Management System API

<a class="badge badge--secondary" href="https://github.com/City-of-Lincoln-Council/HousingManagementSystemApi">GitHub Repository</a>

## Frameworks used

Written in .Net

## Environment variables
| Name                                   | Description                                                                                                       |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| `APP_SERVICE_NAME`                     | App Service name (must be unique across whole of Azure), e.g. `HousingManagementSystemApi-{LOCAL_AUTHORITY_NAME}` |
| `SERVICE_PLAN_NAME`                    | App Service Plan name, e.g. `housing-repairs-online`                                                              |
| `AUTHENTICATION_IDENTIFIER_PRODUCTION` | A unique identifier used to validate access in production.*                                                       |
| `AUTHENTICATION_IDENTIFIER_STAGING`    | A unique identifier used to validate access in staging.*                                                          |
| `AZURE_AD_CLIENT_SECRET`               | This is the client secret value that was generated for the service principal in section 4 of Create a service     |
| `AZURE_AD_CLIENT_ID`                   | This is the Application (client) ID                                                                               |
| `AZURE_AD_TENANT_ID`                   | This is the Directory (tenant) ID                                                                                 |
| `AZURE_SUBSCRIPTION_ID`                | Navigate to subscriptions and select the Subscription ID for your subscription                                    |
| `ANCM_ADDITIONAL_ERROR_PAGE_LINK_PRODUCTION`  | Set the value to the correct path for production Module                                          |
| `ANCM_ADDITIONAL_ERROR_PAGE_LINK_STAGING`  | Set the value to the correct path for staging Module                                                |
| `JWT_SECRET_PRODUCTION`                | JWT secret generated for for production.*                                                                         |
| `JWT_SECRET_STAGING`                   | JWT secret generated for for staging.*                                                                            |
| `NUGET_AUTH_GITHUB_TOKEN`              | Authentication token for authenticating with GitHub NuGet feed                                                    |
| `NUGET_AUTH_GITHUB_USERNAME`           | Username for authenticating with GitHub NuGet feed                                                                |
| `SENTRY_DSN`                           | [Sentry Data Source Name](https://docs.sentry.io/product/sentry-basics/dsn-explainer/)                            |
| `RESOURCE_GROUP_LOCATION`              | The resource group location housing your Terraform state file, e.g. `UK South`                                    |
| `RESOURCE_GROUP_NAME`                  | The resource group name housing your Terraform state file                                                         |
| `STORAGE_ACCOUNT_NAME`                 | The name of the Azure Storage Account to house your Terraform state file                                          |
| `STATE_CONTAINER_NAME`                 | The name of the Azure Blob Storage container to house your Terraform state file                                   |
| `STATE_KEY_NAME`                       | The file path and name of your Terraform state file                                                               |
| `COSMOS_DATABASE_ID`                   | DocumentDB (e.g. CosmosDB) database name                                                                          |
| `COSMOS_TENANT_CONTAINER_ID`           | DocumentDB (e.g. CosmosDB) container name for tenant addresses, e.g. `addresses`                                  |
| `COSMOS_COMMUNAL_STAGING_CONTAINER_ID`    | DocumentDB (e.g. CosmosDB) container name for staging communal addresses, e.g. `addresses`                     |
| `COSMOS_COMMUNAL_PRODUCTION_CONTAINER_ID` | DocumentDB (e.g. CosmosDB) container name for production communal addresses, e.g. `addresses`                  |
| `COSMOS_LEASEHOLD_STAGING_CONTAINER_ID`   | DocumentDB (e.g. CosmosDB) container name for staging leasehold addresses, e.g. `addresses`                    |
| `COSMOS_LEASEHOLD_PRODUCTION_CONTAINER_ID`| DocumentDB (e.g. CosmosDB) container name for production leasehold addresses, e.g `addresses`                  |
| `COSMOS_ENDPOINT_URL`                  | DocumentDB (e.g. CosmosDB) account endpoint URL                                                                   |
| `COSMOS_AUTHORIZATION_KEY`             | DocumentDB (e.g. CosmosDB) account primary key                                                                    |
| `CAPITAOPTIONS__APIADDRESS`            | Capita Service URL                                                                                                |
| `CAPITAOPTIONS__USERNAME`              | Capita Service username                                                                                           |
| `CAPITAOPTIONS__PASSWORD`              | Capita Service password for staging                                                                               |
| `CAPITAOPTIONS__STANDARDJOBCODE`       | Capita Service stdjobcode for staging                                                                             |
| `CAPITAOPTIONS__SOURCE`                | Capita Service source for staging                                                                                 |
| `CAPITAOPTIONS__SUBLOCATION`           | Capita Service sublocation for staging                                                                            |

\* See [Authentication](../apis/authentication) for more details.

## Health Checks

See [Health Checks](../apis/health-checks) for details.

The API is determined to be health if:

- it can connect to the Universal Housing SQL Server database
