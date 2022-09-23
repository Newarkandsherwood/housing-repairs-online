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

### Add to Azure Portal

The following environment variables need to be **set in the Azure portal** to enable
the frontend app to make calls to be Repairs API:
  
| Name                     | Description                                                                                                    |
|--------------------------|----------------------------------------------------------------------------------------------------------------|
| `REPAIRS_API_BASE_URL`   | URL of the Repairs API, [see docs](../repairs-api/intro).                                                      |
| `REPAIRS_API_IDENTIFIER` | Unique authentication identifier for the accessing the API, [see docs](../repairs-api/intro).                  |
| `SENTRY_DSN`             | The Sentry project Data Source Name (DSN), [see docs](../alerting-and-monitoring/intro#azure-component-setup). |

### Add to GitHub Repository Secrets

The following variables are required by the front end and should be setup as **GitHub secrets for the repository**:

| Name                     | Description                                                                                                            |
|---------------------------------------------------|-----------------------------------------------------------------------------------------------|
| `SENTRY_DSN`                                      | The Sentry project Data Source Name (DSN).                                                    |
| `SENTRY_ORG`                                      | The organisation specified in Sentry.                                                         |
| `SENTRY_AUTH_TOKEN`                               | Authentication token used for all communication with Sentry.                                  |
| `CUSTOMER_SERVICES_TELEPHONE_NUMBER`              | The customer service number to contact ***during opening hours***.                            |
| `OUT_OF_HOURS_CUSTOMER_SERVICES_TELEPHONE_NUMBER` | The customer service number to contact ***outside of opening hours***.                        |
| `COUNCIL_WEBSITE_HOMEPAGE_URL`                    | The local authority's website URL written **without** a `/` at the end e.g `www.example.com`. |
| `CUSTOMER_SERVICES_OPENING_HOURS_DESCRIPTION`     | The customer service opening hours, can set as a JSON or text. See below.                     |

Any environment variable that needs to be used on the client side should be set
at deployment time in the [`Build And Deploy` job](https://github.com/City-of-Lincoln-Council/housing-repairs-online-frontend/blob/main/.github/workflows/azure-static-web-apps-purple-desert-05060ea03.yml#L100).

### Adding local authority customer services opening hours

Opening hours can be added by setting the `CUSTOMER_SERVICES_OPENING_HOURS_DESCRIPTION` environment variable to either a JSON object or as text.
Depending on what is given, it will display the opening hours information either as a list or as text in a simple paragraph in the front end.

#### Usage

##### As a JSON object

- If `CUSTOMER_SERVICES_OPENING_HOURS_DESCRIPTION` is a JSON object
  
  Example:

    ```json
      {"Monday":"9am - 5pm", "Tuesday":"9am - 5pm", "Wednesday": "9am - 5pm", "Thursday": "9am - 5pm", "Friday": "9am - 5pm"}
    ```

  the code will generate the following HTML in the frontend:

    ```html
      <ul>
        <li>Monday: 9am - 5pm</li>
        <li>Tuesday: 9am - 5pm</li>
        <li>Wednesday: 9am - 5pm</li>
        <li>Thursday: 9am - 5pm</li>
        <li>Friday: 9am - 5pm</li>
      </ul>
  ```
  
  which will display the information as a list in the frontend.

##### As a line of text (i.e not in JSON)

- If `CUSTOMER_SERVICES_OPENING_HOURS_DESCRIPTION` is simple text (i.e anything not in the JSON format)

  Example:

    ```text
      9am and 5pm, Monday to Friday
    ```

  the code will generate the following HTML in the frontend:

    ```html
      <p>9am and 5pm, Monday to Friday</p>
  ```

  which will display the information as a line of text in the frontend.

## Monitoring and alerting

Sentry is used for monitoring and alerting.
