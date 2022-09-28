---
sidebar_position: 1
---
# Front end

<a class="badge badge--secondary" href="https://github.com/City-of-Lincoln-Council/housing-repairs-online-frontend">GitHub Repository</a>

## Frameworks used

The frontend of the Housing Repairs Online app is built using Next.js and
deployed as an Azure static web app and functions.

### Next.js

Is a react framework that provides client-side and server-side rendering.

Source code for the app could be [found here](https://github.com/City-of-Lincoln-Council/housing-repairs-online-frontend).

The frontend is currently deployed to Azure static web using github actions.

Each next.js API endpoint is deployed as an Azure function.

## Environment variables

The following environment variables need to be set in the Azure portal to enable
the frontend app to make calls to be Repairs API

- [`REPAIRS_API_BASE_URL`](../repairs-api/intro)
- `REPAIRS_API_IDENTIFIER`
- [`SENTRY_DSN`](../alerting-and-monitoring/intro#azure-component-setup)

Any environment variable that needs to be used on the client side should be set
at deployment time in the [`Build And Deploy` job](https://github.com/City-of-Lincoln-Council/housing-repairs-online-frontend/blob/main/.github/workflows/azure-static-web-apps-purple-desert-05060ea03.yml#L100).

The following variables are required by the front end and should be setup as GitHub secrets for the repository:

- `SENTRY_DSN`, the Sentry project Data Source Name (DSN)
- `SENTRY_ORG`, the organisation specified in Sentry
- `SENTRY_AUTH_TOKEN`, authentication token used for all communication with Sentry

## Feature Flags

The following feature flag is set in the next root .env file: 
- `RELEASE_VERSION`

This feature flag can be set to 
- 'mvp' or
- 'full'.

Any other value, including the absense of this variable will result in the application falling back on the 'full' version.

The flag denotes which version of the application to build. This flag allows the introduction of version specific behaviour.

For example, in the mvp version of the app, the repair description and image controls are on the same page. In the full version, they are in separate pages.

## Monitoring and alerting

Sentry is used for monitoring and alerting.
