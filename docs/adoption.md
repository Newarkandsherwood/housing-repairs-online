---
sidebar_position: 7
---

# Adoption

## Code Repositories

Clone/fork the following repositories:

- [housing-repairs-online](https://github.com/City-of-Lincoln-Council/housing-repairs-online)
- [housing-repairs-online-frontend](https://github.com/City-of-Lincoln-Council/housing-repairs-online-frontend)
- [housing-repairs-online-api](https://github.com/City-of-Lincoln-Council/housing-repairs-online-api)
- [HousingRepairsSchedulingApi](https://github.com/City-of-Lincoln-Council/HousingRepairsSchedulingApi)
- [HousingManagementSystemApi](https://github.com/City-of-Lincoln-Council/HousingManagementSystemApi)
- [HACT.Dtos](https://github.com/City-of-Lincoln-Council/HACT.Dtos)
- [HousingRepairsOnline.Authentication](https://github.com/City-of-Lincoln-Council/HousingRepairsOnline.Authentication)

The latter 2 produce Nuget packages, which if made public, could remove the need to clone their repositories.

## Nugets

[HACT.Dtos](https://github.com/City-of-Lincoln-Council/HACT.Dtos) and [HousingRepairsOnline.Authentication](https://github.com/City-of-Lincoln-Council/HousingRepairsOnline.Authentication) produce Nuget packages which are consumed by other components.

Each repository contains setup instructions which can be followed to establish connectivity.

## Infrastructure

Azure is the supported Cloud platform.

Create the following resouces in Azure:

### APIs

- Azure app service plan
  - Consider which service plan would best suit the needs. Premium V2 (P1v2: 1) is recommended
  - Use a region which is geographically close to the users/residents and the 3rd party data
- Azure app service for each API
  - Create a 'staging' deployment slot
  - Each app service (and it's deployment slot) will have a publish profile which needs to be added to the repository secrets[^1]
- Cosmos DB
  - 2 databases - production and staging
  - Each with `repair-requests` collections
- Blob storage account
  - Create 2 containers - production and staging for the storage of user-uploaded images
  - Create a container for Terraform State Storage - 'tfstate'
  - Create a container for insight report address .csv files: 'insight-report-addresses'
- Resource Provider Registrations
  - Some resources require that the subscription is registered to use their respective namespace.
  - Key vault and managed identity are examples of such resources. See [here](application-security/intro.md).
- Key Vault
  - Consider whether to have a key vault per environment e.g Staging API key vault, Production API key vault.
  - Create a key vault for each API at least, best practice is not to have one key vault to hold all secrets.
  - Seperate the key vaults appropriately based on needs, cost and use.
- Managed Identity for Key Vault
  - Create a managed identity for each API (would recommend creating a user assigned identity).
  - Add key vault permissions to the identity so that the attached app service has access the relevant key vault.

### Frontend

- Create Azure Static Web App
  - A deployment token will need to be added to the repository secrets[^1]
- **(Optional)** Add a custom domain to the Azure Static Web App[^2]
  - e.g. `repairs.abc_council.test.uk`

## Deploying to Azure

An Azure service principal is an identity created that can be used for automated tools such as GitHub actions to access Azure resources. This access is restricted by the roles assigned to the service principal, giving you control over which resources can be accessed and at which level. In order to assign access to the service principal, you must have the necessary access to so.

### Create a service principal

1. Ask your subscription administrator to add you to the User Access Administrator role. [See documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#check-azure-subscription-permissions). (_If the subscription administrator is creating the service principal, ensure that you request the environment variables as specified in the Adding GitHub actions job and secrets step_)
2. Create the service principal. [See documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#register-an-application-with-azure-ad-and-create-a-service-principal).
3. Assign a role to the service principal as per [this documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#assign-a-role-to-the-application). If you are not able to do this, contact your subscription administrator as you do not have the permission to do so
4. Create a client secret for your service principal. [See documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#option-2-create-a-new-application-secret). Make sure to keep a note of the secret or copy it to your clipboard

### Terraform state storage

Terraform is an infrastructure as code tool which we will be using to provision the Azure resources to deploy our application. Terraform needs to be able to store its state so it is aware of what resources it has created/destroyed/updated etc. This state will be stored remotely in an Azure storage container. Complete the following steps in the Azure web portal to create the storage container:

1. Create a resource group for your infrastructure or use an existing one where your resources can be deployed. This resource group will be used for all other resources you provision so you should make it generic, e.g. `housing-repairs-online`. Add the resource group name and location as `RESOURCE_GROUP_NAME` and `RESOURCE_GROUP_LOCATION` respectively to github actions secrets.
2. Create a storage account use the resource group you created above. Add the name of the storage account you created to github secrets as `STORAGE_ACCOUNT_NAME`.
3. In that storage account, create a container called `tfstate`. This is where your state files will live. Create a github action secret called `CONTAINER_NAME` with the value `tfstate`
4. Create github actions secret called `STATE_KEY_NAME` with the value `{SERVICE_NAME}.tfstate`

### Adding GitHub actions job and secrets

Once you have added a remote backend to your Terraform and created a service principal, GitHub actions should be configured to deploy resources to Azure using Terraform. We will be using the [setup-terraform](https://github.com/hashicorp/setup-terraform) action to run Terraform in github actions

  1. Add the following secrets as your github repository secrets, these are only available to you if you have access to create a service principal so ensure to request these if the service principal is being created for you, (Note: navigate to your Service principal under Active Directory → App registrations → select your app registration and navigate to overview):

      | Secret name              | Value                                                                                                                                | Mandatory? |
      | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------| ---------- |
      | `AZURE_AD_CLIENT_SECRET`        | This is the client secret value that was generated for the service principal in section 4 of Create a service.                | YES        |
      | `AZURE_AD_CLIENT_ID`            | This is the Application (client) ID                                                                                           | YES        |
      | `AZURE_AD_TENANT_ID`            | This is the Directory (tenant) ID                                                                                             | YES        |
      | `AZURE_SUBSCRIPTION_ID`         | Navigate to subscriptions and select the Subscription ID for your subscription                                                | YES        |
      | `STATIC_SITE_NAME`              | The name of your static site                                                                                                  | YES        |
      | `CUSTOM_DOMAIN_NAME`            | The custom domain name you wish to attach to your static site. See [below](adoption.md#notes-adding-a-custom-domain-optional).| NO         |
      | `REPAIRS_API_BASE_URL`          | Housing repairs online API URL, this can obtained from the App Service the API was deployed to                                | YES        |
      | `REPAIRS_API_IDENTIFIER`        | A unique identifier used to validate access in production                                                                     | YES        |
      | `REPAIRS_API_BASE_URL_STAGING`  | Housing repairs online API Staging URL, this can obtained from the App Service the API was deployed to                        | YES        |
      | `REPAIRS_API_IDENTIFIER_STAGING`| A unique identifier used to validate access in staging                                                                        | YES        | 
        
       

  2. You will then reference these as environment variables in your github actions workflow. There will be an example provided further down which you can replicate. This allows the setup-terraform action to use the service principal credentials to provision your resources.

  3. Add STATE_KEY_NAME as a repository secret. This is the storage account key for your Terraform backend. You can obtain this value if you navigate to Storage accounts, select the storage account for your Terraform backend, select Access Keys, click on show keys and copy the top key value. (Note: These are rotating keys and are subject to change, this tutorial does not investigate how to work around this)

  4. [This](https://github.com/Newarkandsherwood/housing-repairs-online-frontend/blob/main/.github/workflows/azure-static-web-apps-purple-desert-05060ea03.yml) is a link for an example workflow

### Deploy housing-repairs-online-frontend

Now you have added all the resources that you need in Azure in Terraform, you are ready for the CI to apply the Terraform and deploy. The first CI run will provision the Azure static web app resource (however the deployment will fail and this is expected). Log in to the Azure web portal, navigate to the static webb app you provisioned and copy the `Manage deployment token` value. Add this to github actions secret with the name `AZURE_STATIC_WEB_APPS_API_TOKEN`. As you have now added this secret, the deployment should pass successfully on the second run.

Note: _There will be some future work to prevent the manual entry of the AZURE STATIC WEB APPS API TOKEN secret_


#### Notes: Adding a custom domain (Optional)

When creating a static web app, Azure will automatically auto-generate a domain name for the website but if you have a custom domain ready for your site, add the value to the Github secret called `CUSTOM_DOMAIN_NAME` and this will map a your custom domain to the site.

When a value for `CUSTOM_DOMAIN_NAME` is given, terraform will create the `azurerm_static_site_custom_domain` resource using the given value and attach it to the static web app.

If you have not given a custom domain, the custom domain resource will not be added.

Read the [Azure guidance](https://learn.microsoft.com/en-us/azure/static-web-apps/custom-domain) and [Terraform guidance](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/static_site_custom_domain) for more information on how custom domain names are added to static web apps in Azure.

## Deploying the API's

Each of the API's will be deployed to Azure App service. They will all exist under the same App Service Plan, which will be created manually. To create an App Service Plan, search `App service plans` on the azure portal, select `Create`, ensure you select the resource group created above and select an appropriate name for the App Service Plan e.g. `housing-repairs-online-{LOCAL_AUTHORITY_NAME}`

### Deploy Housing Management System API

To deploy the Housing Management System API, you must populate github actions with the following secrets:

| Secret name                            | Description                                                                                                       |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `APP_SERVICE_NAME`                     | App Service name (must be unique across whole of Azure), e.g. `HousingManagementSystemApi-{LOCAL_AUTHORITY_NAME}` |
| `SERVICE_PLAN_NAME`                    | App Service Plan name, e.g. `housing-repairs-online`                                                              |
| `AUTHENTICATION_IDENTIFIER_PRODUCTION` | A unique identifier used to validate access in production                                                         |
| `AUTHENTICATION_IDENTIFIER_STAGING`    | A unique identifier used to validate access in staging                                                            |
| `AZURE_AD_CLIENT_SECRET`               | This is the client secret value that was generated for the service principal in section 4 of Create a service     |
| `AZURE_AD_CLIENT_ID`                   | This is the Application (client) ID                                                                               |
| `AZURE_AD_TENANT_ID`                   | This is the Directory (tenant) ID                                                                                 |
| `AZURE_SUBSCRIPTION_ID`                | Navigate to subscriptions and select the Subscription ID for your subscription                                    |
| `JWT_SECRET_PRODUCTION`                | JWT secret generated for for production                                                                           |
| `JWT_SECRET_STAGING`                   | JWT secret generated for for staging                                                                              |
| `NUGET_AUTH_GITHUB_TOKEN`              | Authentication token for authenticating with GitHub NuGet feed                                                    |
| `NUGET_AUTH_GITHUB_USERNAME`           | Username for authenticating with GitHub NuGet feed                                                                |
| `SENTRY_DSN`                           | [Sentry Data Source Name](https://docs.sentry.io/product/sentry-basics/dsn-explainer/)                            |
| `RESOURCE_GROUP_LOCATION`              | The resource group location housing your Terraform state file, e.g. `UK South`                                    |
| `RESOURCE_GROUP_NAME`                  | The resource group name housing your Terraform state file                                                         |
| `STORAGE_ACCOUNT_NAME`                 | The name of the Azure Storage Account to house your Terraform state file                                          |
| `STATE_CONTAINER_NAME`                 | The name of the Azure Blob Storage container to house your Terraform state file                                   |
| `STATE_KEY_NAME`                       | The file path and name of your Terraform state file
| `COSMOS_DATABASE_ID`                   | DocumentDB (e.g. CosmosDB) database name |
| `COSMOS_TENANT_CONTAINER_ID`           | DocumentDB (e.g. CosmosDB) container name for tenant addresses, e.g. `addresses` |
| `COSMOS_ENDPOINT_URL`                  | DocumentDB (e.g. CosmosDB) account endpoint URL |
| `COSMOS_AUTHORIZATION_KEY`             | DocumentDB (e.g. CosmosDB) account primary key |

Once you have entered all of the environment variables, you should rerun the workflow in the `main` branch. The first run will fail `Deploy Staging` and `Deploy Production` step (which is expected, following steps will resolve). However, the `Provision Infrastructure` step should pass and deploy all the infrastructure.

Once this is done, we will need to set the `AZUREAPPSERVICE_PUBLISHPROFILE_...` secrets, by downloading the publish profiles from the Azure web portal setting the secrets to their contents. To do this, navigate to App Services and from here navigate to the housing repairs online API App Service. Click `Get publish profile` to download the production publish profile. Now click `Deployment slots` (in the navigation pane on the left) and select the staging slot. Now click `Get publish profile` to download the staging publish profile.

Finally, in GitHub actions secrets, set `AZUREAPPSERVICE_PUBLISHPROFILE_PRODUCTION` and `AZUREAPPSERVICE_PUBLISHPROFILE_STAGING` to the contents of the respective publish profiles downloaded previously. Once this is complete, you can rerun the workflow and all of the steps should pass.

### Deploy Scheduling API

To deploy the Scheduling API, you must populate the GitHub repository the following secrets:

| Secret name                            | Description                                                                                                          |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `APP_SERVICE_NAME`                     | Service name (must be unqiue across whole of Azure) e.g. `housing-repairs-scheduling-api-{LOCAL_AUTHORITY_NAME}`     |
| `AUTHENTICATION_IDENTIFIER_PRODUCTION` | A unique identifier used to validate access used to validate access in production                                    |
| `AUTHENTICATION_IDENTIFIER_STAGING`    | A unique identifier used to validate access used to validate access in staging                                       |
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
| `JWT_SECRET_PRODUCTION`                | JWT secret generated for production                                                                                  |
| `JWT_SECRET_STAGING`                   | JWT secret generated for staging                                                                                     |
| `NUGET_AUTH_GITHUB_TOKEN`              | Authentication token for authenticating with GitHub NuGet feed                                                       |
| `NUGET_AUTH_GITHUB_USERNAME`           | Username for authenticating with GitHub NuGet feed                                                                   |
| `RESOURCE_GROUP_LOCATION`              | Azure Resource Group location, e.g. `UK South`                                                                       |
| `RESOURCE_GROUP_NAME`                  | Azure Resource Group name                                                                                            |
| `SENTRY_DSN`                           | [Sentry Data Source Name](https://docs.sentry.io/product/sentry-basics/dsn-explainer/)                               |
| `SERVICE_PLAN_NAME`                    | Service plan name (must be unique across whole of Azure) e.g. `housing-repairs-schduling-api-{LOCAL_AUTHORITY_NAME}` |
| `STATE_CONTAINER_NAME`                 | The name of the container to store Terraform state in                                                                |
| `STATE_KEY_NAME`                       | The file path and name of your Terraform state file                                                                  |
| `STORAGE_ACCOUNT_NAME`                 | Storage account name for Terraform state, e.g. `housing-repairs-online`                                              |

Once you have entered all of the environment variables, you should re-run the workflow in the `main` branch. The first run will fail `Deploy Staging` and `Deploy Production` step (which is expected, following steps will resolve). However, the `Provision Infrastructure` step should pass and deploy all the infrastructure.

Once this is done, we will need to set the `AZUREAPPSERVICE_PUBLISHPROFILE_...` secrets, by downloading the publish profiles from the Azure web portal setting the secrets to their contents. To do this, navigate to App Services and from here navigate to the housing repairs scheduling API App Service. Click `Get publish profile` to download the production publish profile. Now click `Deployment slots` (in the navigation pane on the left) and select the staging slot. Now click `Get publish profile` to download the staging publish profile.

Finally, in GitHub actions secrets, set `AZUREAPPSERVICE_PUBLISHPROFILE_PRODUCTION` and `AZUREAPPSERVICE_PUBLISHPROFILE_STAGING` to the contents of the respective publish profiles downloaded previously. Once this is complete, you can rerun the workflow and all of the steps should pass.

### Deploy housing-repairs-online-api

#### Github Action logs Masking Secrets

The below secrets must be entered to reduce the risk of them leaking in the Github actions logs when debug logging is enabled. In github actions, we use masks to obscure secrets. The values of these secrets can be obtained from their Cloud resources dashboard, once the Terraform deploy is run for the first time.  

> ⚠ WARNING:  **Without the below secrets saved in Github, you will not be able to use Github action's mask command with the secret. Github action's mask command need to be explicitly told each secret it should obscure in logs. Any values in the app settings config not saved as a Github secret will have the risk of being publically exposed whenever the deploy job is run with debug enabled.**

Populate github secrets with the following values so that we can add the use the masking commands on them. **Do this before deploying the app with it's publish profile.**

| Secret name          | Description |
| ----------- | ----------- |
| `COSMOS_CONTAINER_NAME_PRODUCTION`        | DocumentDB (e.g. CosmosDB) container name for _Production_, e.g. `housing-repairs-online-production` |
| `COSMOS_CONTAINER_NAME_STAGING`        | DocumentDB (e.g. CosmosDB) container name for _Staging_, e.g. `housing-repairs-online-staging`  |
| `COSMOS_ACCOUNT_PRIMARY_KEY`        | DocumentDB (e.g. CosmosDB) account primary key |
| `COSMOS_DATABASE_NAME_PRODUCTION`        | DocumentDB (e.g. CosmosDB) database name for _Production_, e.g. `housing-repairs-production` |
| `COSMOS_DATABASE_NAME_STAGING`        | DocumentDB (e.g. CosmosDB) database name for _Staging_, e.g. `housing-repairs-staging`  |
| `COSMOS_ACCOUNT_ENDPOINT`        | DocumentDB (e.g. CosmosDB) account endpoint URL |
| `STORAGE_ACCOUNT_PRIMARY_CONNECTION_STRING`        | Storage account primary connection string |

To deploy the housing repairs api, you must first deploy `HousingRepairsSchedulingApi` and `HousingManagementSystemApi`. Once this has been deployed, populate github actions with the following secrets:

| Secret name                             | Description                                                                                                   |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `ADDRESSES_API_URL_PRODUCTION`          | Retrieve from App Service once HousingManagementSystemApi is deployed                                         |
| `ADDRESSES_API_URL_STAGING`             | Retrieve from App Service _Staging_ slot once HousingManagementSystemApi is deployed                          |
| `SCHEDULING_API_URL_PRODUCTION`         | Retrieve from App Service once HousingRepairsSchedulingApi is deployed                                        |
| `SCHEDULING_API_URL_STAGING`            | Retrieve from App Service _Staging_ slot once HousingRepairsSchedulingApi is deployed                         |
| `AUTHENTICATION_IDENTIFIER_PRODUCTION`  | A unique identifier used to validate access for _Production_                                                  |
| `AUTHENTICATION_IDENTIFIER_STAGING`     | A unique identifier used to validate access for _Staging_                                                     |
| `CONFIRMATION_EMAIL_NOTIFY_TEMPLATE_ID` | Gov notify email template ID, this is available once the template is created                                  |
| `CONFIRMATION_SMS_NOTIFY_TEMPLATE_ID`   | Gov notify sms template ID, this is available once the template is created                                    |
| `DAYS_UNTIL_IMAGE_EXPIRY_PRODUCTION`    | Number in days before image uploaded by customer expires for _Production_, e.g. `14` days                     |
| `DAYS_UNTIL_IMAGE_EXPIRY_STAGING`       | Number in days before image uploaded by customer expires for _Staging_, e.g. `14` days                        |
| `GOV_NOTIFY_KEY_PRODUCTION`             | _Staging_ gov notify key                                                                                      |
| `GOV_NOTIFY_KEY_STAGING`                | _Production_ gov notify key                                                                                   |
| `INTERNAL_EMAIL_PRODUCTION`             | Internal email address for receiving repair request details, for any manual follow-on process in _Production_ |
| `INTERNAL_EMAIL_STAGING`                | Internal email address for receiving repair request details, for any manual follow-on process in _Staging_    |
| `INTERNAL_EMAIL_NOTIFY_TEMPLATE_ID`     | Gov notify internal email template ID, this is available once the template is created                         |
| `JWT_SECRET_PRODUCTION`                 | JWT secret generated for for _Production_                                                                     |
| `JWT_SECRET_STAGING`                    | JWT secret generated for for _Staging_                                                                        |
| `NUGET_AUTH_GITHUB_TOKEN`               | Authentication token for authenticating with GitHub NuGet feed                                                |
| `NUGET_AUTH_GITHUB_USERNAME`            | Username for authenticating with GitHub NuGet feed                                                            |
| `SENTRY_DSN`                            | [Sentry Data Source Name](https://docs.sentry.io/product/sentry-basics/dsn-explainer/)                        |
| `SERVICE_NAME`                          | Service name (must be unique across whole of Azure) e.g. `housing-repairs-online-api-{LOCAL_AUTHORITY_NAME}`  |
| `SOR_CONFIG_PRODUCTION`                 | SOR codes in JSON format for _Production_                                                                     |
| `SOR_CONFIG_STAGING`                    | SOR codes in JSON format for _Staging_                                                                        |
| `STATE_KEY_NAME`                        | The file path and name of your Terraform state file                                                           |
| `STORAGE_CONTAINER_NAME_PRODUCTION`     | Storage container name for _Production_, e.g. `housing-repairs-online`                                        |
| `STORAGE_CONTAINER_NAME_STAGING`        | Storage container name for _Staging_, e.g. `housing-repairs-online-staging`                                   |

Once you have entered all of the environment variables, you should rerun the workflow in the `main` branch. The first run will fail `Deploy Staging` and `Deploy Production` step (which is expected, following steps will resolve). However, the `Provision Infrastructure` step should pass and deploy all the infrastructure.

Once this is done, we will need to set the `AZUREAPPSERVICE_PUBLISHPROFILE_...` secrets, by downloading the publish profiles from the Azure web portal setting the secrets to their contents. To do this, navigate to App Services and from here navigate to the housing repairs online API App Service. Click `Get publish profile` to download the production publish profile. Now click `Deployment slots` (in the navigation pane on the left) and select the staging slot. Now click `Get publish profile` to download the staging publish profile.

Finally, in GitHub actions secrets, set `AZUREAPPSERVICE_PUBLISHPROFILE_PRODUCTION` and `AZUREAPPSERVICE_PUBLISHPROFILE_STAGING` to the contents of the respective publish profiles downloaded previously. Once this is complete, you can rerun the workflow and all of the steps should pass.

## Integration

### Components

Some of the Housing Repairs Online components will need to integrate to one another.
This is by means of setting environment variables which is detailed within the documentation for each component.

### 3rd Party Systems

Connectivity needs to be establish to each 3rd party system requiring integration.

Each component would require access to the system it is integrating with, i.e. Housing Management System API needs Housing Management System (i.e. Universal Housing) connectivity.

If data is stored on premise, a VPN or other datalink should be setup so that cloud deployed infrastructure has visibility of on premise infrastructure.

### Alerting & Monitoring

See [Alerting & Monitoring](./alerting-and-monitoring/intro) for details.

## Configuration

Each component's configuration is outlined in their own specific documentation.

Please refer to this documentation to configure each component.

### Documentation

This documentation uses [Docusaurus](https://docusaurus.io/) and is generated via Github actions.

After the [housing-repairs-online](https://github.com/City-of-Lincoln-Council/housing-repairs-online) repository has been cloned/forked, follow these steps to ensure GitHub regenerates documentation when changes are made:

- Set the branch to use for GitHub pages to `gh-pages` ([see here](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site))
- Configure the repository by adding a Deploy Key and `ACTIONS_DEPLOY_KEY` Secret ([see here](https://github.com/marketplace/actions/github-pages-action#%EF%B8%8F-create-ssh-deploy-key))

[^1]: When creating resource in Azure, if using Github integration, some of these secrets will be automatically added to the repository.
[^2]: If you are not ready to add a custom domain, the site will continue to use the auto generated Azure domain. Add the custom domain when this is ready and it will be mapped to the site.
