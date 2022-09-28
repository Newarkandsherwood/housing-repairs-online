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

Any environment variable that needs to be used on the client side should be set
at deployment time in the [`Build And Deploy` job](https://github.com/City-of-Lincoln-Council/housing-repairs-online-frontend/blob/main/.github/workflows/azure-static-web-apps-purple-desert-05060ea03.yml#L100).

The following variables are required by the front end and should be setup as **GitHub secrets for the repository**:

| Name                                              | Description                                                                                                                  |
|---------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `SENTRY_DSN`                                      | The Sentry project Data Source Name (DSN).                                                                                   |
| `SENTRY_ORG`                                      | The organisation specified in Sentry.                                                                                        |
| `SENTRY_AUTH_TOKEN`                               | Authentication token used for all communication with Sentry.                                                                 |
| `CUSTOMER_SERVICES_TELEPHONE_NUMBER`              | The customer service number to contact ***during opening hours***.                                                           |
| `OUT_OF_HOURS_CUSTOMER_SERVICES_TELEPHONE_NUMBER` | The customer service number to contact ***outside of opening hours***.                                                       |
| `COUNCIL_WEBSITE_HOMEPAGE_URL`                    | The local authority's website URL written **without** a `/` at the end e.g `www.example.com`. [See here](#adding-local-authority-web-links-ie-accessibility-statement-privacy-notice-contact-us). |
| `PRIVACY_NOTICE_WEB_PAGE_PATH`                    | Resource path to the local authority's privacy notice **without** a `/` at the start. e.g `privacynotice`. [See here](#adding-local-authority-web-links-ie-accessibility-statement-privacy-notice-contact-us). |
| `ACCESSIBILITY_STATEMENT_WEB_PAGE_PATH`           | Resource path to the local authority's accessibility statement **without** a `/` at the start. e.g `accessibility-statement` . [See here](#adding-local-authority-web-links-ie-accessibility-statement-privacy-notice-contact-us). |
| `CONTACT_US_PAGE_PATH`                            | Resource path to the local authority's contact details **without** a `/` at the start. e.g `contact`. [See here](#adding-local-authority-web-links-ie-accessibility-statement-privacy-notice-contact-us). |
| `CUSTOMER_SERVICES_OPENING_HOURS_DESCRIPTION`     | The customer service opening hours, can set as a JSON or text. [See here](#adding-local-authority-customer-services-opening-hours). |

### Adding local authority web links (i.e. Accessibility Statement, Privacy Notice, Contact Us)

The generated links for these pages depends on the value given for `COUNCIL_WEBSITE_HOMEPAGE_URL`.

Each link will be constructed as follows:

- Accessibility Statement: `COUNCIL_WEBSITE_HOMEPAGE_URL`/`ACCESSIBILITY_STATEMENT_WEB_PAGE_PATH`
- Privacy Notice: `COUNCIL_WEBSITE_HOMEPAGE_URL`/`PRIVACY_NOTICE_WEB_PAGE_PATH`
- Contact Us: `COUNCIL_WEBSITE_HOMEPAGE_URL`/`CONTACT_US_PAGE_PATH`

For example, if given:

- `COUNCIL_WEBSITE_HOMEPAGE_URL` = `www.test-local-gov.uk`
- `CONTACT_US_PAGE_PATH` = `contact-details/contact-us`

  The link generated will be: `www.test-local-gov.uk/contact-details/contact-us`

> Note: When giving a web resource path, you do not need to add the starting `/` . Similarly for the website homepage URL, you do not need to add the ending `/`. The code will add this when it joins the two values together, as seen in the example above.

### Adding local authority customer services opening hours

Opening hours can be added by setting the `CUSTOMER_SERVICES_OPENING_HOURS_DESCRIPTION` environment variable to either a JSON object or as text.
Depending on what is given, it will display the opening hours information either as a list or as text in a simple paragraph in the front end.

#### Usage

##### As a JSON object

- If `CUSTOMER_SERVICES_OPENING_HOURS_DESCRIPTION` is a JSON object
  
  Example:

    ```json
      {"Monday":"9am to 5pm", "Tuesday":"9am to 5pm", "Wednesday": "9am to 5pm", "Thursday": "9am to 5pm", "Friday": "9am to 5pm"}
    ```

  the code will generate the following HTML in the frontend:

    ```html
      <ul>
        <li>Monday: 9am to 5pm</li>
        <li>Tuesday: 9am to 5pm</li>
        <li>Wednesday: 9am to 5pm</li>
        <li>Thursday: 9am to 5pm</li>
        <li>Friday: 9am to 5pm</li>
      </ul>
  ```
  
  which will display the information as a list in the frontend.

##### As a line of text (i.e not in JSON)

- If `CUSTOMER_SERVICES_OPENING_HOURS_DESCRIPTION` is simple text (i.e anything not in the JSON format)

  Example:

    ```text
      9am to 5pm, Monday to Friday
    ```

  the code will generate the following HTML in the frontend:

    ```html
      <p>9am to 5pm, Monday to Friday</p>
  ```

  which will display the information as a line of text in the frontend.

## Monitoring and alerting

Sentry is used for monitoring and alerting.
