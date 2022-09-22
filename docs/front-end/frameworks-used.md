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
  
### Adding specific local authority/council details

The following variables are **required** by the front end to display specific local authority details such as customer service contact numbers and should be **set up as GitHub secrets for the repository**:

- `CUSTOMER_SERVICES_TELEPHONE_NUMBER` -> The customer service number to contact ***during opening hours***
- `OUT_OF_HOURS_CUSTOMER_SERVICES_TELEPHONE_NUMBER` -> The customer service number to contact ***outside of opening hours***
- `COUNCIL_WEBSITE_HOMEPAGE_URL` -> The local authority's website URL written **without** a `/` at the end e.g `www.example.com`
  
#### Adding opening hours

Opening hours can be added as one of two configurable environment variables - `CUSTOMER_SERVICES_OPENING_TIMES_FULL_DESCRIPTION` and `CUSTOMER_SERVICES_OPENING_TIMES_SIMPLIFIED`.
>NOTE: Only one value needs to be set. If both are given, the code will always use the full description value.

##### Usage

- `CUSTOMER_SERVICES_OPENING_TIMES_FULL_DESCRIPTION`, complete description of the customer service opening times written in JSON format, this will be displayed as a list in the frontend.
  
  Example:

    ```json
      {"Monday":"9am - 5pm", "Tuesday":"9am - 5pm", "Wednesday": "9am - 5pm", "Thursday": "9am - 5pm", "Friday": "9am - 5pm"}
    ```

  will generate the following HTML in the frontend:

    ```html
      <ul>
        <li>Monday: 9am - 5pm</li>
        <li>Tuesday: 9am - 5pm</li>
        <li>Wednesday: 9am - 5pm</li>
        <li>Thursday: 9am - 5pm</li>
        <li>Friday: 9am - 5pm</li>
      </ul>
  ```

- `CUSTOMER_SERVICES_OPENING_TIMES_SIMPLIFIED`, simple description of the customer service opening times written as text.

  Example:

    ```text
      9am and 5pm, Monday to Friday
    ```

  will generate the following HTML in the frontend:

    ```html
      <p>9am and 5pm, Monday to Friday</p>
  ```

## Monitoring and alerting

Sentry is used for monitoring and alerting.
