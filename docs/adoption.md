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

### Create a terraform backend

1. Create a resource group for your infrastructure or use an existing one where your resources can be deployed
2. Create a storage account, and attach it to the resource group you created above
3. In that storage account, create a container called tfstate. This is where your state file will live
4. Create a terraform directory followed by a main.tf file. Add the following terraform (Note, the terraform version may vary):

```
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=2.46.0"
    }
  }
  backend "azurerm" {}
}
provider "azurerm" {
  features {}
}

data "terraform_remote_state" "state" {
  backend = "azurerm"
  config = {
    resource_group_name  = var.resource_group_name
    storage_account_name = var.storage_account_name
    container_name       = var.container_name
    key                  = var.key
  }
}
```

4. Create a variables.tf file and add the following code:

```
variable "storage_account_name" {
  type = string
}
variable "container_name" {
  type = string
}
variable "resource_group_name" {
  type = string
}
variable "resource_group_location" {
  type = string
}
variable "key" {
  type = string
}
```

_Note: You should know the value of all these variables, apart from key which will be explained further along the tutorial._

### Adding GitHub actions job and secrets

Once you have added a remote backend to your terraform and created a service principal, GitHub actions should be configured to deploy resources to azure using terraform. We will be using the [setup-terraform](https://github.com/hashicorp/setup-terraform) action to run terraform in github actions

1. Add the following secrets as your github repository secrets (Note: navigate to your Service principal under Active Directory → App registrations → select your app registration and navigate to overview):

   `AZURE_AD_CLIENT_SECRET = value is in your clipboard from Step 2.4`
   `AZURE_AD_CLIENT_ID = This is the Application (client) ID`
   `AZURE_AD_TENANT_ID = This is the Directory (tenant) ID`
   `AZURE_SUBSCRIPTION_ID = Navigate to subscriptions and select the Subscription ID for your subscription `

2. You will then reference this as environment variables in your github actions workflow. There will be an example provided further down which you can replicate. This allows the setup-terraform action to use the service principal credentials to provision your resources.

3. Add STORAGE_ACCOUNT_KEY as a repository secret. This is the storage account key for your terraform backend. You can obtain this value if you navigate to Storage accounts, select the storage account for your terraform backend, select Access Keys, click on show keys and copy the top key value. (Note: These are rotating keys and are subject to change, this tutorial does not investigate how to work around this)

4. Below is an example of how your workflow should look:

```
name: "Terraform"

on:
  push:
    branches:
      - main
  pull_request:

jobs:
  terraform:
    name: "Terraform"
    env:
      ARM_CLIENT_ID: ${{ secrets.AZURE_AD_CLIENT_ID }}
      ARM_CLIENT_SECRET: ${{ secrets.AZURE_AD_CLIENT_SECRET }}
      ARM_SUBSCRIPTION_ID: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
      ARM_TENANT_ID: ${{ secrets.AZURE_AD_TENANT_ID }}
    runs-on: ubuntu-latest
    environment: production

    defaults:
      run:
        shell: bash
        working-directory: './terraform'

    steps:
      - uses: actions/checkout@v2
      - uses: hashicorp/setup-terraform@v1
        with:
          terraform_wrapper: false

      - name: Terraform fmt
        run: terraform fmt -check
        continue-on-error: true

      - name: Terraform Init
        run: terraform init -backend-config="storage_account_name=your_storage_account_name" -backend-config="resource_group_name=your_resource_group_name" -backend-config="container_name=tfstate" -backend-config="key=${{secrets.STORAGE_ACCOUNT_KEY}}"

      - name: Terraform Validate
        run: terraform validate -no-color

      - name: Terraform Plan
        run: terraform plan -var="storage_account_name=your_storage_account_name" -var="resource_group_name=your_resource_group_name" -var="container_name=tfstate" -var="key=${{secrets.STORAGE_ACCOUNT_KEY}}" -var="resource_group_location=your_resource_group_location"
        continue-on-error: true

      - name: Terraform Apply
        run: terraform apply -auto-approve -var="storage_account_name=your_storage_account_name" -var="resource_group_name=your_resource_group_name" -var="container_name=tfstate" -var="key=${{secrets.STORAGE_ACCOUNT_KEY}}" -var="resource_group_location=your_resource_group_location"


```

_Note: the terraform commands with their respective flags should be in a single line_

### Deploy housing-repairs-online-frontend

Once you have completed the above steps, add the following terraform code to main.tf to provision a static web app as this is where the frontend is deployed.

```
resource "azurerm_static_site" "hro_frontend_test" {
  name                = "name-of-your-static-site"
  resource_group_name = var.resource_group_name
  location            = var.location
}

```

Add the following code in your yaml file to deploy your code to the static web app:

```
  build_and_deploy_job:
    needs: [terraform]
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    defaults:
      run:
        shell: bash
    steps:
      - uses: actions/checkout@v2
        with:
          submodules: true
      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{secrets.AZURE_STATIC_WEB_APPS_API_TOKEN}}
          repo_token: ${{ secrets.GITHUB_TOKEN }} # Used for Github integrations (i.e. PR comments)
          action: "upload"
          ###### Repository/Build Configurations - These values can be configured to match your app requirements. ######
          # For more information regarding Static Web App workflow configurations, please visit: https://aka.ms/swaworkflowconfig
          app_location: "/" # App source code path
          api_location: "api" # Api source code path - optional
          app_artifact_location: 'public' # Built app content directory - optional
          output_location: "out" # Built app content directory - optional
          ###### End of Repository/Build Configurations ######
          NEXT_PUBLIC_APP_ENV: ${{ (github.event_name == 'pull_request' && 'staging') || ('production') }}


  close_pull_request_job:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close Pull Request Job
    steps:
      - name: Close Pull Request
        id: closepullrequest
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{secrets.AZURE_STATIC_WEB_APPS_API_TOKEN}}
          action: 'close'
```

Now you have added all the resources that you need in azure in terraform, you are ready for the CI to apply the terraform and deploy. The first CI run will provision the azure static web app resource (however the deployment will fail and this is expected). Log in to the azure web portal, navigate to the static webb app you provisioned and copy the `Manage deployment token` value. Add this to github actions secret with the name `AZURE_STATIC_WEB_APPS_API_TOKEN`. As you have now added this secret, the deployment should pass successfully on the second run.

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

[^1]: When creating resource in Azure, if using Github integration, some of these secrets will be automatically added to the repository.
