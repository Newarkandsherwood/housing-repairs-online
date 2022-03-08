---
sidebar_position: 2
---

# Health Checks

Each API exposes a `/health` endpoint that provides a response based on the health of the API.

The basis of health is specific to each API and further information is detailed within API specific documentation.

## Endpoints

#### GET: `/health`

#### Response
`Healthy` | `Unhealthy` | `Degraded`

## Azure Configuration

App services in Azure allow configuring health checks. For more information see [here](https://docs.microsoft.com/en-us/azure/app-service/monitor-instances-health-check).

To configure a health check:

1. Navigate to the App Service.
2. Click on `Health check` in the left navigation pane.
3. Click `Enable`.
4. Enter path of health check endpoint.
5. Click `Save`

![Configure a health check](/img/Configure-health-check.png)

After specifying the health check endpoint, if HTTPS redirect is enabled within the application (as is the default for .Net Web APIs), then `HTTPS Only` setting need to be turned on.

1. Navigate to the App Service.
2. Click on `TLS/SSL settings` in the left navigation pane.
3. Toggle `HTTPS Only` to `On`

![Toggle HTTPS Only to On](/img/Enable-HTTPS-Only.png)