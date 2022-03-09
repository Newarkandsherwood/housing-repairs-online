# Alerting & Montoring

## Monitoring

Each component integrates with [Sentry](https://sentry.io) to provide reports of issues that occur.
Examples of issues are when an external request fails or there is a exception during execution.

### Sentry Setup

#### Account
A Sentry account needs to be created on the [signup page](https://sentry.io/signup/).

The free tier should be sufficient.

#### Project

For each component a project needs to be created.

1. Click 'Create Project'
2. Select the appropriate platform for each component.
    - Front end: Next.js
    - APIs: ASP.Net Core
3. Name the project
4. Click 'Create Project'

![Sentry new project](/img/Sentry-new-project.png)

#### Azure Component Setup

Sentry projects are uniquely identified by Data Source Name (DSN).

For a given project, this can be found by navigating to `Settings` > `Projects` > `Client Keys (DSN)`.
For more info, see [here](https://docs.sentry.io/product/sentry-basics/dsn-explainer/).

The DSN value should be set to `SENTRY_DSN` for each respective component in Azure.

## Alerting

Alerts have been configured for failing Azure for health checks.

### Create an action group
1. Create a new alert action group
    - Click 'Alerts' in the left navigation pane. 
    - Click the 'Create' drop down.
    - Click 'Action group' from the drop down options.
![Create Azure alert action group](/img/Azure-create-alert-action-group.png)
2. Enter name details
    - Enter name for action group
    - Enter display name
![Azure create alert action group naming](/img/Azure-create-alert-action-group-naming.png)
3. Setup notification
    - For 'Notification type' select 'Email/SMS message/Push/Voice'
    - Enter an appropriate name.
    - Toggle the 'Email' checkbox and enter an appropriate email to receive notifications
![Azure create action group notification](/img/Azure-create-action-group-notification.png)
4. Create
    - Click 'Review + create'
    - Optionally, click 'Test action group' and verify an email was received
    - Click 'Create'

![Azure create action group create](/img/Azure-create-action-group-create.png)


### Create an alert rule
An alert rule needs to be created for each component with a health check (APIs).

1. Create a new alert rule
    - Click 'Alerts' in the left navigation pane. 
    - Click the 'Create' drop down.
    - Click 'Alert Rule' from the drop down options.

![Create Azure alert rule](/img/Azure-create-alert-rule.png)

2. Setup Health Check condition
    - Select 'Health check status' for signal.
    - Configure the signal logic
        - less than an average of 100
        - aggregated over an hour
        - evaluated hourly

![Create Azure alert rule signal logic](/img/Azure-create-alert-rule-signal-logic.png)

3. Setup actions to take when rule is broken
    - Click 'Add action groups'
    - Select the previously create action group.

![Azure create alert rule action group](/img/Azure-create-alert-rule-action-group.png)

4. Enter details
    - Set 'Severity' to '1 - Error'
    - Name the alert rule

![Azure create alert rule details](/img/Azure-create-alert-rule-details.png)

5. Create
    - Click 'Review + create'
    - Review the details
    - Click 'Create'

![Azure create alert rule create](/img/Azure-create-alert-rule-create.png)