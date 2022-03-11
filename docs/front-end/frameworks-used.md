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

## Monitoring and alerting

Sentry is used for monitoring and alerting.
