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
  - Create 2 containers - production and staging

### Frontend

- Create Azure Static Web App
  - A deployment token will need to be added to the repository secrets[^1]

## Deploying to Azure

An Azure service principal is an identity created that can be used for automated tools such as GitHub actions to access Azure resources. This access is restricted by the roles assigned to the service principal, giving you control over which resources can be accessed and at which level. In order to assign access to the service principal, you must have the necessary access to so.

### Create a service principal

1. Ask your subscription administrator to add you to the User Access Administrator role. [See documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#check-azure-subscription-permissions). (_If the subscription administrator is creating the service principal, ensure that you request the environment variables as specified in the Adding GitHub actions job and secrets step_)
2. Create the service principal. [See documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#register-an-application-with-azure-ad-and-create-a-service-principal).
3. Assign a role to the service principal as per [this documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#assign-a-role-to-the-application). If you are not able to do this, contact your subscription administrator as you do not have the permission to do so
4. Create a client secret for your service principal. [See documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#option-2-create-a-new-application-secret). Make sure to keep a note of the secret or copy it to your clipboard

### Create a Terraform backend

Complete the following steps in the Azure web portal:

1. Create a resource group for your infrastructure or use an existing one where your resources can be deployed. Add the resource group name and location as `RESOURCE_GROUP_NAME` and `RESOURCE_GROUP_LOCATION` respectively to github actions secrets.
2. Create a storage account, and attach it to the resource group you created above. Add the name of the storage account you created to github secrets as `STORAGE_ACCOUNT_NAME`. From the storage account page, navigate to `Access keys` and copy the first key. Add it to github actions secrets under the name `STORAGE_ACCOUNT_KEY`
3. In that storage account, create a container called tfstate. This is where your state file will live. Create a github action secret called `CONTAINER_NAME` with the value tfstate

### Adding GitHub actions job and secrets

Once you have added a remote backend to your Terraform and created a service principal, GitHub actions should be configured to deploy resources to Azure using Terraform. We will be using the [setup-terraform](https://github.com/hashicorp/setup-terraform) action to run Terraform in github actions

1. Add the following secrets as your github repository secrets, these are only available to you if you have access to create a service principal so ensure to request these if the service principal is being created for you, (Note: navigate to your Service principal under Active Directory → App registrations → select your app registration and navigate to overview):

| Secret name              | Value|
| ------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `AZURE_AD_CLIENT_SECRET` | This is the client secret value that was generated for the service principal in section 4 of Create a service |
| `AZURE_AD_CLIENT_ID`     | This is the Application (client) ID                                                                           |
| `AZURE_AD_TENANT_ID`     | This is the Directory (tenant) ID                                                                             |
| `AZURE_SUBSCRIPTION_ID`  | Navigate to subscriptions and select the Subscription ID for your subscription                                ||
| `STATIC_SITE_NAME`  | The name of your static site

2. You will then reference these as environment variables in your github actions workflow. There will be an example provided further down which you can replicate. This allows the setup-terraform action to use the service principal credentials to provision your resources.

3. Add STORAGE_ACCOUNT_KEY as a repository secret. This is the storage account key for your Terraform backend. You can obtain this value if you navigate to Storage accounts, select the storage account for your Terraform backend, select Access Keys, click on show keys and copy the top key value. (Note: These are rotating keys and are subject to change, this tutorial does not investigate how to work around this)

4. [This](https://github.com/Newarkandsherwood/housing-repairs-online-frontend/blob/main/.github/workflows/azure-static-web-apps-purple-desert-05060ea03.yml) is a link for an example workflow

### Deploy housing-repairs-online-frontend


Now you have added all the resources that you need in Azure in Terraform, you are ready for the CI to apply the Terraform and deploy. The first CI run will provision the Azure static web app resource (however the deployment will fail and this is expected). Log in to the Azure web portal, navigate to the static webb app you provisioned and copy the `Manage deployment token` value. Add this to github actions secret with the name `AZURE_STATIC_WEB_APPS_API_TOKEN`. As you have now added this secret, the deployment should pass successfully on the second run.

_There will be some future work to prevent the manual entry of the AZURE STATIC WEB APPS API TOKEN secret_

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
