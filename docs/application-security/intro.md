# Application Security

## Storing and Retrieving Application Secrets

### Environment: Azure

When using Azure and Github actions, care should be taken to not run github actions in debug mode as the `azure/webapps-deploy@v2` function required to deploy the app to azure will print out all the values saved in the App service configuration settings as the result of an internal method called `getAppSettings`.

There is a risk if any of the App service configuration values are sensitive because they would be printed into the github actions log if the workflow is run in debug mode.

#### Mitigations
The only 100% effective way of mitigating the leaking of sensitive values is to use GitHub's log masking functionality. This can be used in conjunction with Azure key Vault.

### GitHub Masking
GitHub masking is a way  of defining masks that are applied to all Github Logs, including the logs output by 3rd party components.

References:
- https://www.tutorialworks.com/github-actions-mask-url/
- https://pakstech.com/blog/github-actions-workflow-commands/
- https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#masking-a-value-in-log

Add masks in the following way in the GitHub pipeline workflow config. They must be added as part of the job that you wish masking to be applied to. It does not work if you put the step in its own job since the changes only apply to the job that the step is included with. 

Example code block:
```yaml
steps:
      - name: Add mask to obscure secrets in debug logs
        run: |
          echo "::add-mask::${{ secrets.COSMOS_CONTAINER_NAME_STAGING }}"
```
An add-mask command is needed for each secret that you wish to obscure in the logs.

### Secrets Store Setup (Azure Key Vault) for App Service

1. Register the Microsoft.ManagedIdentity and Microsoft.KeyVault resource providers to your subscription
    The Azure Subsctription must be registered to use the following namespaces:

    - 'Microsoft.ManagedIdentity'

    - 'Microsoft.KeyVault'

    If these are not registered, when trying to create the terraform resources for the key vault and managed identity that would have permissions to access it, the terraform code will fail:

    For example,

    ```text
    keyvault.VaultsClient#CreateOrUpdate: Failure sending request: StatusCode=409 -- Original Error: Code="MissingSubscriptionRegistration" Message="The subscription is not registered to use namespace 'Microsoft.KeyVault'.
    ```

    The terraform attribute `skip_provider_registration = true` **does not skip** the need to register `Microsoft.ManagedIdentity` and `Microsoft.KeyVault`. These will still need to be registered regardless and will fail the build if they aren't.

    **NOTE: To manage resource provider registrations, the service principal that is used to provision the infrastructure must have the correct permissions to do so.**

2. Create the key vault, access policy and a user managed identity for each App service.
    The key vault cannot be accessed by app service without using an identity that has the permissions to access the key vault. Set the desired permissions within the key access policy, add it to the user managed identity and add the identity to the relevant app service.

    Best practice is to have a key vault per application, per environment to reduce the incident area if there was breach. See [here](https://docs.microsoft.com/en-gb/azure/key-vault/general/best-practices).
