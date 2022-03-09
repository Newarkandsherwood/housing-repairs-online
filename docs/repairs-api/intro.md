# Repairs API

<a class="badge badge--secondary" href="https://github.com/City-of-Lincoln-Council/housing-repairs-online-api">GitHub Repository</a>

## Frameworks used

Written in .Net

### Blog Storage

> [Azure Blob storage](https://docs.microsoft.com/en-gb/azure/storage/blobs/storage-blobs-introduction) is Microsoft's object storage solution for the cloud.

Photos uploaded as part of the [`description.base64img` in save repair request body](/docs/repairs-api/endpoints/repair#body) are uploaded to a container that can be configured via [environment variables](#blob-env).

### Cosmos DB

> [Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/introduction) is a fully managed NoSQL database service for modern app development.

Submitted repair requests are saved in a container that is configured via [environment variables](#cosmos-env) and requests are saved in the following structure:
```json
{
    "id": "20B2459F",
    "Postcode": "M3 0W",
    "SOR": "N373049",
    "Address": {
        "Display": "123 Cute Street, LN1 3AT",
        "LocationId": "53660030    "
    },
    "Location": {
        "Value": "kitchen",
        "Display": "Kitchen"
    },
    "Problem": {
        "Value": "cupboards",
        "Display": "Cupboards, including damaged cupboard doors"
    },
    "Issue": {
        "Value": "doorHangingOff",
        "Display": "Hanging door"
    },
    "ContactPersonNumber": "01234567890",
    "Description": {
        "PhotoUrl": "https://housingrepairsonline.blob.core.windows.net/housing-repairs-online/eb5adfb6-ed53-4f3b-90c4-7a54cc36c56a.png",
        "Text": "Excepturi quod aute "
    },
    "ContactDetails": {
        "Type": "email",
        "Value": "luna@email.com"
    },
    "Time": {
        "Value": "27th January 2022 12:00pm to 4:00pm",
        "Display": "27th January 2022 between 12:00pm to 4:00pm"
    },
    "_rid": "rKg5ANy0vjoVAAAAAAAAAA==",
    "_self": "dbs/rKg5AA==/colls/rKg5ANy0vjo=/docs/rKg5ANy0vjoVAAAAAAAAAA==/",
    "_etag": "\"0f00dbde-0000-1100-0000-61e5367b0000\"",
    "_attachments": "attachments/",
    "_ts": 1642411643
}
```

### Gov Notify

> [GOV.UK Notify](https://docs.notifications.service.gov.uk/net.html#net-client-documentation) lets you send emails, text messages and letters to your users.

Once a repair request is saved into Cosmos DB, two notifications are sent - one
to the user and one to the email that's configured via [environment variables](#email-env)

#### User notifications

Email notification template ID is configured via [environment variables](#n-email-env).
<details>
  <summary>Suggested email template</summary>
  <div>
    <strong>From:</strong>	Lincoln Repairs Online <br />
    <strong>To:</strong>	((<code>email</code> from <a href="/docs/repairs-api/endpoints/repair#body" ><code>contactDetails.value</code></a>)) <br />
    <strong>Subject:</strong>	Repair details ((<code>repair_ref</code> generated when saving into Cosmos DB)) <br />
    <hr/>
    <p>
      Your repair has been successfully booked.
    </p>
    <p>
      Your booking details are: <br />
      Booking reference: ((<code>repair_ref</code>))<br />
      Appointment: ((<code>appointment_time</code> from <a href="/docs/repairs-api/endpoints/repair#body" ><code>time.display</code></a>))
    </p>
    <p>
      You will receive a reminder the day before your appointment
    </p>
  </div>
</details>

SMS notification template ID is configured via [environment variables](#n-sms-env).
<details>
  <summary>Suggested SMS template</summary>
  <div>
    <strong>To:</strong>	((phone numer from <a href="/docs/repairs-api/endpoints/repair#body" ><code>contactDetails.value</code></a>)) <br />
    <hr/>
    <p>
      Lincoln Repairs Online: Your repair has been successfully booked. Your
      booking reference is
      ((<code>repair_ref</code>))
      and your selected appointment date is
      ((<code>appointment_time</code>  from
          <a href="/docs/repairs-api/endpoints/repair#body" >
            <code>time.display</code>
          </a>
        )).
    </p>

  </div>
</details>


#### Internal notification email

Email notification template ID is configured via [environment variables](#i-email-env).

<details>
  <summary>Suggested email template</summary>
  <div>
    <strong>From:</strong>	Lincoln Repairs Online <br />
    <strong>To:</strong>	((<code>email</code> from <a href="#email-env" ><code>INTERNAL_EMAIL</code></a>)) <br />
    <strong>Subject:</strong>	Repair details ((<code>repair_ref</code> generated when saving into Cosmos DB)) <br />
    <hr/>
    <p>
      A new online repair has been logged. Please add the repair to universal.<br />
      The repair details are:<br />
      Repair reference: ((<code>repair_ref</code>))<br />
      Property Reference: ((<code>uprn</code> from <a href="/docs/repairs-api/endpoints/repair#body" ><code>address.locationId</code></a>))<br />
      Address: ((<code>uprn</code> from <a href="/docs/repairs-api/endpoints/repair#body" ><code>address.display</code></a>))<br />
      SoR: ((<code>sor</code> generated when saving into Cosmos DB ))<br />
      Description: ((<code>repair_desc</code> from <a href="/docs/repairs-api/endpoints/repair#body" ><code>description.text</code></a>
))<br />
      Contact number: ((<code>contact_no</code> from <a href="/docs/repairs-api/endpoints/repair#body" ><code>contactPersonNumber</code></a>
))<br />
      Photos uploaded: ((<code>image_1</code>))<br />
    </p>
  </div>
</details>


## Environment variables
| Name                                                                      |  Description                                                                          |
|---------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| AUTHENTICATION_IDENTIFIER                                                 | A unique identifier used to validate access.*                                         |
| JWT_SECRET                                                                | A hash secret used for encryption.*                                                   |
| [ADDRESSES_API_URL](/docs/housing-management-system-api)                  | Address API URL                                                                       |
| [SCHEDULING_API_URL](/docs/scheduling-api/intro)                          | Scheduling API URL                                                                    |
| <span id="cosmos-env">COSMOS_ENDPOINT_URL</span>                          | Cosmos endpoint URL                                                                   |
| COSMOS_AUTHORIZATION_KEY                                                  | Cosmos authorization key                                                              |
| COSMOS_DATABASE_ID                                                        | Cosmos database name, e.g.: `housing-repairs-online`                                  |
| COSMOS_CONTAINER_ID                                                       | Cosmos table name, e.g.: `repairs-requests`                                           |
| <span id="blob-env">AZURE_STORAGE_CONNECTION_STRING</span>                | Blob storage connection string                                                        |
| STORAGE_CONTAINER_NAME                                                    | Blob storage container name, e.g.: `housing-repairs-online`                           |
| GOV_NOTIFY_KEY                                                            | Gov notification key                                                                  |
| <span id="n-sms-env">CONFIRMATION_SMS_NOTIFY_TEMPLATE_ID</span>           | Id of the SMS template that will be sent to customers                                 |
| <span id="n-email-env">CONFIRMATION_EMAIL_NOTIFY_TEMPLATE_ID</span>       | Id of the email template that will be sent to customers                               |
| <span id="i-email-env">INTERNAL_EMAIL_NOTIFY_TEMPLATE_ID</span>           | Id of the template that will be sent to staff                                         |
| <span id="email-env">INTERNAL_EMAIL</span>                                | Email to which internal staff emails will be sent to                                  |
| DAYS_UNTIL_IMAGE_EXPIRY                                                   | Number of days attached images can be accessible for                                  |
| [SENTRY_DSN](/docs/alerting-and-monitoring/intro#azure-component-setup) | [Sentry Data Source Name](https://docs.sentry.io/product/sentry-basics/dsn-explainer/)|

\* See [Authentication](/docs/apis/authentication) for more details.