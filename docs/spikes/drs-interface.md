---
sidebar_position: 2
---

# DRS Interfaces and Workflow

## Introduction

Dynamic Resource Scheduler, DRS, is software that “seamlessly blends appoint, planned and responsive work across the field based workforce”[^1].

[^1]:
     Quote from [https://www.kirona.com/products/dynamic-resource-scheduler/](https://www.kirona.com/products/dynamic-resource-scheduler/)

The Housing Repairs Online service will need to be able to lookup available appointment slots and schedule a repair for a slot selected by a resident.

## Background

DRS is installed on premise at a Local Authority which has a need for it’s features.
[Kirona](https://www.kirona.com/) are the company who created DRS and are now owned by [One Advanced](https://www.oneadvanced.com/). One Advanced provides support for DRS installation.

DRS has primarily a web interface which is used daily by customer services agents (CSAs) and planners to manually create and schedule appointments.
Dynamic scheduling feature of DRS isn’t used at Lincoln (nor many other Local Authorities) as there isn’t enough confidence in it’s ability.

Lincoln’s Housing Management System (Civica Universal Housing) stores housing information. Creation of a repair appointment in DRS requires entering details within the HMS and then a manual user action of “sending” information to DRS is initiated.
This creates a flat file (example in [Appendix A](#a-universal-housing-flat-file-example)) with the relevant information which is placed in a location monitored by DRS. Upon detecting a new file in the location, DRS imports the information.

## Interfacing

DRS has a Web Services Gateway which is an optional feature exposing a SOAP API for interfacing with it programmatically. The documentation for the gateway can be found [here](https://drive.google.com/file/d/1Yvn1_liXsuYDieP2MLIBBypzle4nI5mm/view?usp=sharing) and [here](https://docs.google.com/document/d/13ZP5AK-MsoDwnAamdSy2AIEriKCeNvc6/edit).

The SOAP API is limited to most frequently/commonly used functionality.

DRS also has a core API which is utilised by its web interface and provides extensive, fine grained control over the system.

Only the SOAP API feature has been enabled on Lincoln’s DRS installation.

SOAP APIs often publish a Web Services Description Language (WSDL) file which describes the functionality offered by the API.

DRS publishes it’s WSDL file using the URL: `[https://&lt;INSTALLATION WEB ADDRESS>/OTWebServiceGateway_&lt;INSTANCENAME>/ws/soap?wsdl](https://yourserver/OTWebServiceGateway_INSTANCENAME/ws/soap?wsdl)`

## Options

[SOAP](https://en.wikipedia.org/wiki/SOAP) was first released in 1998 and became a web standard in 2003. It is considered a very dated technology now and has since been superseded by other formats with REST APIs being the most widely adopted.


### 1. Direct SOAP interface

Although it’s a dated protocol, SOAP is supported by modern software languages, in particular our backend language C# .Net. There are multiple .Net libraries providing SOAP API integration, e.g. [SoapCore](https://github.com/DigDes/SoapCore) and [ServiceStack](https://docs.servicestack.net/soap-support.html), both of which are actively maintained and well documented.

There are at least two options to consume the WSDL file:
  - A. Statically:<br />
    The WSDL file can be consumed to statically generate the code files for the SOAP API.
    This would be a one time process afterwich interaction would be tied to the version from which was generated.

  - B. Dynamically: <br />
    The WSDL file would be parsed each time the service started and would always be reflective of the SOAP API.

### 2. SOAP to REST API

Cloud providers offer a managed approach to import a SOAP API and expose it via a REST API.

Azure’s API Management feature allows consumption of a WSDL file and provides a functioning API. [[Setup instructions](https://docs.microsoft.com/en-us/azure/api-management/restify-soap-api)]

AWS isn’t quite so simple - they provide the means to be able to connect to legacy systems, but don’t natively provide simple importing of WSDL files to generate a REST API [[see here](https://aws.amazon.com/blogs/aws/amazon-api-gateway-build-and-run-scalable-application-backends/), subtitle “Enhancing Legacy Services“]. To use a WSDL file would require using approaches 1a. or 1b. (above) - though they could be any language as the communication would be via REST services [[example](https://adrin-mukherjee.medium.com/exposing-soap-service-as-rest-api-the-serverless-way-c3b565326cbd)].


As Lincoln (and Southwark) use Azure as their cloud provider, it would be functional to use Azure’s API Management feature.

However, this would create cloud vendor lock-in to Azure and would require extra effort when deploying to a Local Authority who isn’t using Azure as their cloud provider.

The recommendation is to use option 1 (a or b).

## Workflow

After a consultation with One Advanced, there is now a clear picture of the requests required to be made for our workflow. As the documentation was lacking on how requests should be ordered and which fields were mandatory/optional, we were provided with minimal versions of the requests which are described below.

Our workflow is as follows:

1. Check appointment availability using address and SoR code.
2. Create order and a booking for selected appointment slot using the address, SoR code, appointment slot and additional user provided information.

### Request and Response General Information

* All fields specifying a date and/or time (‘DateTime’ hereafter) are in ISO 8601 format, e.g. 2021-10-26T23:59:00.000Z
* The tables describing requests and responses below use indentation to indicate nesting.

#### Requests:

* Requests can have nested repeated values, e.g. `primaryOrderNumber`, `orderId` and `bookingId`.
These values should be the same throughout the request.
* All requests have some common xml elements (such as envelope, header and body), which will be omitted from the descriptions below.
* Optional fields will be coloured grey in the descriptions below.

#### Responses:

Responses will be nested within a return element, some of the common child elements are:
  * `status` <br />
  The status of the response, i.e. ‘success’ and ‘error’

  * `errorMsg` <br />
  A message related to the execution of the request.
  This isn’t always a true error and can sometimes be warning/informational text.

  i.e. when using `checkAvailability` with a timespan between `periodBegin` and `periodEnd` of greater than 7 days - the status would be ‘success’ and `errorMsg` would be ‘The number of days returned has been limited to 7 day’

  * `id` <br />
  An identifier for the response. In practice, this has only been observed to be zero (‘0’).

The response descriptions below will omit the common elements for brevity and only highlight the relevant items for the workflow desired. For full example responses see [Appendix B](#b-example-requests-and-response).

### Sessions

#### 1. Open Session (`openSession`)

A session is required to be open to allow subsequent calls to be authorised.

This requires credentials to be provided and will respond with a sessionId. This sessionId will need to be sent in all subsequent requests.
[[Example](#1-opensession)]

#### 2. Close Session (`closeSession`)

Ideally a session should be closed once no longer needed.

However, if a session isn’t closed explicitly, it would be automatically closed by DRS. Unfortunately the duration of a session is presently unknown.

However, [documentation](https://drive.google.com/file/d/1Yvn1_liXsuYDieP2MLIBBypzle4nI5mm/view) states:

> “_A sessionId is returned which is used as authentication on all following calls to the web service for that day_”

This suggests a session is valid for the remainder of the calendar day - not a 24 hour time span from the point of generation. [[Example](#2-closesession)]


A transactional approach should be considered when making batch requests which are bookended with opening and closing a session.


### Checking Appointment Availability

A `checkAvailability` request can be made to retrieve the possible appointment slots available for the criteria specified.

#### Request

(In order of appearance in request template)

| Field | Type | Description | Required |
| ----- | ---- | ----------- | -------- |
| `onlyBestSlots` | Boolean (‘yes’/’no’) | If only the best slots should be retrieved |      |
| `periodBegin` |  DateTime |  Earliest time to search for an available slot. | ✅ |
| `periodEnd` | DateTime | Latest time to search for an available slot. | ✅ |
| `sessionId` | Alphanumeric | Session Id for authorisation (see above) | ✅ |
| `theOrder` | `<Xml node>` |  |  | ✅ |
|     `contract` | Alphanumeric | ID of contract to use for the search. <br/> Lincoln’s contract value is zero (0) | ✅ |
|     `locationId` | Alphanumeric | ID of the location as stored within DRS | ✅ |
|     `primaryOrderNumber` | Alphanumeric | A unique ID of an order number <br/> Typically this is the Id of the order within the Housing Management System. (* see notes below) | ✅ |
|     `priority` | Alphanumeric | A value matching the possible priorities with DRS.(** see notes below) | ✅ |
|     `targetDate` | DateTime | The date by which the job completion is required |
|     `theBookingCodes` | `<Xml node>` |  |  | ✅ |
|         `bookingCodeSORCode` | Alphanumeric | The SOR code to use to check availability | ✅ |
|         `itemNumberWithinBooking` | Numerical | Index of job within the order <br/> Must be greater than or equal to 1 | ✅ |
|         `primaryOrderNumber` | Alphanumeric | A unique ID of an order number <br/> Typically this is the Id of the order within the Housing Management System. (* see notes below)| ✅ |
|         `quantity` | Numerical | Number of jobs with the order <br/> Must be greater than or equal to 1 | ✅ |
|         `standardMinuteValue` | Numerical | The duration of the job |
| `userId` | Alphanumeric and ‘@’ | The user id of the user making the request, typically an email address <br/> This is not validated, so any value can be provided | ✅ |

##### Notes:
- For our purposes itemNumberWithinBooking and quantity should be set to 1 as we are only querying for a single booking (not multiple)
- LocationId could be the property's Unique Property Reference Number (UPRN)
- *If primaryOrderNumber is specified as a value other than a real order number, the request will still provide the same response, i.e. ‘anything’ is a valid value for the field but won’t be an actual order ID.
- It is recommended to use this approach to avoid creation of (many) jobs for the purposes of querying available slots.
- The timespan between periodBegin and periodEnd should be a maximum of 7 days.
- Anything greater will be restricted in the response to 7 days after periodBegin.
- **Priority had been an optional field prior to the reconfiguration of DRS for scheduled repairs by area.

#### Response

| Field | Type | Description |
| ----- | ---- | ----------- |
| `theSlots` | `<Xml node>` | Repeated (one or more) for each day of the request timespan |
| `day` | DateTime | Date of (child) slot(s), with time of midnight |
| `slotsForDay` | `<Xml node>` | Repeated (one or more) for each slot |
| `available` | Boolean (‘YES’/’NO’) | Indicates if the slot is available or not |
| `beginDate` | DateTime | Start date and time of slot |
| `endDate` | DateTime | End date and time of slot |
| `bestSlot` | Boolean (‘true’/’false’) | Indicates if it’s the best slot considering multiple factors, including operative travel time. |

[[Example](#3-checkavailability)]


### Scheduling an Appointment

To schedule an appointment an order (and booking) needs to be created and then the  booking can be scheduled.


#### Creating an order (and booking)


##### Request

The `createOrder` request creates an order and booking.[^2]

[^2]:
     An implicit call is made to createBooking.

A minimal `createOrder` request requires the following fields (in order of appearance in request template):

| Field | Type | Description | Required |
| ----- | ---- | ----------- | -------- |
| `sessionId` | Alphanumeric | Session Id for authorisation (see above) | ✅ |
| `theOrder` | `<Xml node>` |  |  |  |
|      `contactName` | Alphanumeric | Name of contact |  |
|      `contract` | Alphanumeric | ID of contract to use for the search. | Lincoln’s contract value is zero (0) | ✅ |
|      `locationId` | Alphanumeric | ID of the location as stored within DRS | ✅ |
|      `message` | Boolean (true/false) | Flag to indicate if an SMS should be sent |
|      `orderComments` | Alphanumeric | Comments to add to the order. | Required field, but a single space character can be provided (which would be removed/trimmed). Maximum 255 characters | ✅ |
|      `orderId` | Numeric | Zero (0) should be used to create an new order Id
|      `primaryOrderNumber` | Alphanumeric  | The ID of the order within the Housing Management System. | ✅ |
|      `priority` | Alphanumeric  | A value matching the possible priorities with DRS | ✅ |
|      `targetDate` | DateTime  | The date by which the job completion is required | ✅ |
|      `userId` | Alphanumeric and ‘@’ | The user id of the user making the request, typically an  email address <br/> This is not validated, so any value can be provided | ✅ |
|      `phone` | Numeric | Contact phone number for the appointment | |
|       `earliestBookingDate` | DateTime | The earliest date the booking could be made for <br/> If omitted, the date of the request is used. |
|      `theBookingCodes` | `<Xml node>` |   |   |
|         `bookingCodeSORCode` | Alphanumeric | The Schedule of Rates (SoR) code for the booking | ✅ |
|         `itemNumberWithinBooking` | Numerical | Index of job within the order <br/> Must be greater than or equal to 1 | ✅ |
|         `quantity` | Numerical | Number of jobs with the order <br/> Must be greater than or equal to 1 | ✅ |
|         `primaryOrderNumber` | Alphanumeric | A unique ID of an order number <br/> Typically this is the Id of the order within the Housing Management System. | ✅ |

The `earliestBookingDate` field is optional and omitting it would use the date and time of the request. It would be best to set it to the start date and time of the chosen appointment slot, i.e. `beginDate` of `checkAvailability` response.

##### Response

Key elements of the response:

* `bookingId` <br/>
The numeric Id for the booking created and will be required to be used in subsequent request(s)
* `orderId` <br/>
The numeric Id for the order created. This isn’t an optional field in subsequent request(s).

[[Example](#4-createorder)]

#### Scheduling a Booking

A minimal scheduleBooking request requires the following fields (in order of appearance in request template):


##### Request

| Field | Type | Description | Required |
| ----- | ---- | ----------- | -------- |
| `id` | Numeric | An identifier for the request. Default value is zero (‘0’) |   |
| `force` | Boolean (‘false’/’true’) | Indicates if the booking should be forcibly scheduled |   |
| `sessionId` | Alphanumeric | Session Id for authorisation (see above) | ✅ |
| `theBooking` | `<Xml node>` |   |   |
|      `bookingId` | Numeric | The Id of the booking being scheduled |
|      `bookingReason` | Alphanumeric | The booking reason/type <br/> e.g. ‘FIRST’ indicates initial booking and ‘FOLLOW ON’ for a follow on booking <br/> Omitting uses a value of ‘first’, which appears to be distinct from ‘FIRST’ <br/> `<Add comment> `|   |   |
|      `contract` | Alphanumeric | ID of contract to use for the booking. <br/>  Lincoln’s contract value is zero (0).  |   |
|      `duration` | Numeric | Duration of the booking <br/> * The value is ignored(!?) |   |
|      `isEmergency` | Boolean (‘false’/’true’) | Indicates if the booking is an emergency <br/> * The value is ignored(!?) |   |
|      `isNextBooking` | Boolean (‘false’/’true’) | Indicates if this is the next booking |   |
|      `locationID` | Alphanumeric | ID of the location as stored within DRS |   |
|      `orderId` | Alphanumeric | ID of the order |   |
|      `planningWindowStart` | DateTime | Earliest time to schedule the booking for. |   |
|      `planningWindowEnd` | DateTime | Latest time to schedule the booking for. |   |
|      `primaryOrderNumber` | Alphanumeric | A unique ID of an order number <br/> Typically this is the Id of the order within the Housing Management System. <br/>  <br/> Doesn’t need to match the DRS order which the booking is against.  <br/> Can be anything - including a blank space! | ✅ |
|      `theBookingCodes` | `<Xml node>` |   |   |
|         `bookingCodeSORCode` | Alphanumeric | The SOR code to use to check availability |   |
|         `bookingId`  | Numeric | The Id of the booking being scheduled |   |
|         `itemNumberWithinBooking` | Numerical | Index of job within the order <br/> Must be greater than or equal to 1 |   |
|         `orderId` | Alphanumeric | ID of the order |   |
|         `primaryOrderNumber` | Alphanumeric | A unique ID of an order number <br/> Typically this is the Id of the order within the Housing Management System. |   |
|         `quantity` | Numerical | Number of jobs with the order <br/> Must be greater than or equal to 1 |   |
|         `standardMinuteValue` | Numerical | The duration of the job |   |
|      `userId` | Alphanumeric and ‘@’ | The user id of the user making the request, typically an email address <br/> This is not validated, so any value can be provided | Can be omitted - probably shouldn’t be |
| `timeLock` | Boolean (‘false’/’true’) |   |   |
| `userId` | Alphanumeric and ‘@’ | The user id of the user making the request, typically an email address <br/> This is not validated, so any value can be provided | Can be omitted - probably shouldn’t be |

The `planningWindowStart` and `planningWindowEnd` fields are optional and when omitted booking would use the order’s `earliestBookingDate` field value and schedule for the next available slot after that.

These fields should be set to the values of `beginDate` and `endDate` from the chosen slot of the `checkAvailability` response.

Resubmitting a `scheduleBooking` request updates an existing scheduled booking.

##### Response

The response is a simple status value as described in the “Request and Response General Information” section above.

[[Example](#5-schedulebooking)]

### Sequence diagram

The following diagram shows the sequence of requests to be made and some of the fields involved.

![Service diagram](/img/20211020-DRS-Requests-Sequence-Diagram.drawio.png)

## Summary

There are various approaches to interfacing with DRS and the recommendation is to create a coded API that would use SOAP to send and receive requests and responses.

The workflow outlined above describes the ordered requests to be made and the values to pass and consume in requests and responses respectively.

---

## Appendix

### A. Universal Housing Flat File Example

There are 4 lines of comma separated values: HEADER, ORDER-CREATE, SCHEDULED-ITEMS and TRAILER.

#### Example 1

```
'HEADER','387176','01/04/2021','07:56'

'ORDER-CREATE','0000','L835574','38950180','100 Days','01-Apr-2021 07:56','19-Aug-2021 07:56','0','Fit lock to postbox. S.Williamson has ordered','XAJ','19-Aug-2021 07:56','','00387176','0',' ','MS H XXXXXXX','0749123456',' ','. NB - ','1'

'SCHEDULED-ITEMS','0000','L835574','Joiner','0','N390917','   1.00','  12.57','1','00399189'

'TRAILER','387176','4'
```

#### Example 2

```
'HEADER','387177','01/04/2021','08:42'

'ORDER-CREATE','0000','L835575','52200990','3 Days','01-Apr-2021 08:42','06-Apr-2021 08:42','0','EMAIL REPAIR - AVAILABLE ANY PM when bath empties, cracked external pipe leaks bath water everywhere 07712345 mw','MXW','06-Apr-2021 08:42','','00387177','0',' ','MIS XXXXXX','07780123455',' ','. NB - ','1'

'SCHEDULED-ITEMS','0000','L835575','Plumber','0','N601125','   1.00','  18.47','1','00399190'

'TRAILER','387177','4'
```

#### Example 3

```
'HEADER','387178','01/04/2021','08:45'

'ORDER-CREATE','0000','L835576','33691260','100 Days','01-Apr-2021 08:45','19-Aug-2021 08:45','0','RENEW BATH, FIT METHVEN, TILE AND FIT BATH PANEL - 100 DAY - AS PER AMY','GBR','19-Aug-2021 08:45','','00387178','0',' ','MIS XXXXX','0780712345',' ','. NB - ','1'

'SCHEDULED-ITEMS','0000','L835576','Plumber','0','N630945','   1.00','  44.94','1','00399191'

'TRAILER','387178','4'
```

### B. Example Requests and Response

#### 1. openSession

##### Request:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:aut="http://autogenerated.OTWebServiceApi.xmbrace.com/">
   <soapenv:Header />
   <soapenv:Body>
      <aut:openSession>
         <openSession>
            <!-- <id>0</id> -->
            <login><-- INSERT USER NAME --></login>
            <password><-- INSERT PASSWORD --></password>
         </openSession>
      </aut:openSession>
   </soapenv:Body>
</soapenv:Envelope>
```

##### Response:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
   <soap:Body>
      <ns1:openSessionResponse xmlns:ns1="http://autogenerated.OTWebServiceApi.xmbrace.com/">
         <return xmlns:ns2="http://autogenerated.OTWebServiceApi.xmbrace.com/">
            <id>0</id>
            <status>success</status>
            <sessionId>8a4b805d7ca651e4017ca7abffb800bd</sessionId>
         </return>
      </ns1:openSessionResponse>
   </soap:Body>
</soap:Envelope>
```

#### 2. closeSession

##### Request:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:aut="http://autogenerated.OTWebServiceApi.xmbrace.com/">
   <soapenv:Header />
   <soapenv:Body>
      <aut:closeSession>
         <closeSession>
            <!-- <id>0</id> -->
            <sessionId>8a4b805d7ca651e4017ca7abffb800bd</sessionId>
         </closeSession>
      </aut:closeSession>
   </soapenv:Body>
</soapenv:Envelope>
```

##### Response:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
   <soap:Body>
      <ns1:closeSessionResponse xmlns:ns1="http://autogenerated.OTWebServiceApi.xmbrace.com/">
         <return xmlns:ns2="http://autogenerated.OTWebServiceApi.xmbrace.com/">
            <id>0</id>
            <status>success</status>
         </return>
      </ns1:closeSessionResponse>
   </soap:Body>
</soap:Envelope>

```
#### 3. checkAvailability

##### Request:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
   <env:Header />
   <env:Body>
      <m:checkAvailability xmlns:m="http://autogenerated.OTWebServiceApi.xmbrace.com/">
         <checkAvailability>
            <!-- <onlyBestSlots>no</onlyBestSlots> -->
            <periodBegin>2021-10-26T00:00:00.000Z</periodBegin>
            <periodEnd>2021-10-31T23:59:00.000Z</periodEnd>
            <sessionId>8a4b805d7ca651e4017ca68c381b0021</sessionId>
            <theOrder>
               <contract>0</contract>
               <locationID>3670010</locationID>
               <primaryOrderNumber>anything</primaryOrderNumber>
               <!-- <priority>Priority 20 Days</priority> -->
               <!-- <targetDate>2021-10-26T23:59:00.000Z</targetDate> -->
               <theBookingCodes>
                  <bookingCodeSORCode>N373049</bookingCodeSORCode>
                  <itemNumberWithinBooking>1</itemNumberWithinBooking>
                  <primaryOrderNumber>anything</primaryOrderNumber>
                  <quantity>1</quantity>
                  <!-- <standardMinuteValue>45</standardMinuteValue> -->
               </theBookingCodes>
               <userId>.</userId>
            </theOrder>
         </checkAvailability>
      </m:checkAvailability>
   </env:Body>
</env:Envelope>
```

##### Response:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
   <soap:Body>
      <ns1:checkAvailabilityResponse xmlns:ns1="http://autogenerated.OTWebServiceApi.xmbrace.com/">
         <return xmlns:ns2="http://autogenerated.OTWebServiceApi.xmbrace.com/">
            <id>0</id>
            <status>success</status>
            <theSlots>
               <day>2021-10-26T00:00:00+01:00</day>
               <nonWorkingDay>false</nonWorkingDay>
               <slotsForDay>
                  <available>YES</available>
                  <beginDate>2021-10-26T08:00:00+01:00</beginDate>
                  <bestSlot>false</bestSlot>
                  <endDate>2021-10-26T12:00:00+01:00</endDate>
               </slotsForDay>
               <slotsForDay>
                  <available>YES</available>
                  <beginDate>2021-10-26T12:00:00+01:00</beginDate>
                  <bestSlot>false</bestSlot>
                  <endDate>2021-10-26T16:00:00+01:00</endDate>
               </slotsForDay>
               <slotsForDay>
                  <available>YES</available>
                  <beginDate>2021-10-26T09:30:00+01:00</beginDate>
                  <bestSlot>true</bestSlot>
                  <endDate>2021-10-26T14:30:00+01:00</endDate>
               </slotsForDay>
               <slotsForDay>
                  <available>YES</available>
                  <beginDate>2021-10-26T08:00:00+01:00</beginDate>
                  <bestSlot>true</bestSlot>
                  <endDate>2021-10-26T16:00:00+01:00</endDate>
               </slotsForDay>
               <weeklyDayOff>false</weeklyDayOff>
            </theSlots>
            <theSlots>
               <day>2021-10-27T00:00:00+01:00</day>
               <nonWorkingDay>false</nonWorkingDay>
               <slotsForDay>
                  <available>YES</available>
                  <beginDate>2021-10-27T08:00:00+01:00</beginDate>
                  <bestSlot>false</bestSlot>
                  <endDate>2021-10-27T12:00:00+01:00</endDate>
               </slotsForDay>
               <slotsForDay>
                  <available>YES</available>
                  <beginDate>2021-10-27T12:00:00+01:00</beginDate>
                  <bestSlot>false</bestSlot>
                  <endDate>2021-10-27T16:00:00+01:00</endDate>
               </slotsForDay>
               <slotsForDay>
                  <available>YES</available>
                  <beginDate>2021-10-27T09:30:00+01:00</beginDate>
                  <bestSlot>true</bestSlot>
                  <endDate>2021-10-27T14:30:00+01:00</endDate>
               </slotsForDay>
               <slotsForDay>
                  <available>YES</available>
                  <beginDate>2021-10-27T08:00:00+01:00</beginDate>
                  <bestSlot>true</bestSlot>
                  <endDate>2021-10-27T16:00:00+01:00</endDate>
               </slotsForDay>
               <weeklyDayOff>false</weeklyDayOff>
            </theSlots>
            <theSlots>
               <day>2021-10-28T00:00:00+01:00</day>
               <nonWorkingDay>false</nonWorkingDay>
               <slotsForDay>
                  <available>YES</available>
                  <beginDate>2021-10-28T08:00:00+01:00</beginDate>
                  <bestSlot>false</bestSlot>
                  <endDate>2021-10-28T12:00:00+01:00</endDate>
               </slotsForDay>
               <slotsForDay>
                  <available>YES</available>
                  <beginDate>2021-10-28T12:00:00+01:00</beginDate>
                  <bestSlot>false</bestSlot>
                  <endDate>2021-10-28T16:00:00+01:00</endDate>
               </slotsForDay>
               <slotsForDay>
                  <available>YES</available>
                  <beginDate>2021-10-28T09:30:00+01:00</beginDate>
                  <bestSlot>false</bestSlot>
                  <endDate>2021-10-28T14:30:00+01:00</endDate>
               </slotsForDay>
               <slotsForDay>
                  <available>YES</available>
                  <beginDate>2021-10-28T08:00:00+01:00</beginDate>
                  <bestSlot>true</bestSlot>
                  <endDate>2021-10-28T16:00:00+01:00</endDate>
               </slotsForDay>
               <weeklyDayOff>false</weeklyDayOff>
            </theSlots>
            <theSlots>
               <day>2021-10-29T00:00:00+01:00</day>
               <nonWorkingDay>false</nonWorkingDay>
               <slotsForDay>
                  <available>YES</available>
                  <beginDate>2021-10-29T08:00:00+01:00</beginDate>
                  <bestSlot>false</bestSlot>
                  <endDate>2021-10-29T12:00:00+01:00</endDate>
               </slotsForDay>
               <slotsForDay>
                  <available>YES</available>
                  <beginDate>2021-10-29T12:00:00+01:00</beginDate>
                  <bestSlot>false</bestSlot>
                  <endDate>2021-10-29T16:00:00+01:00</endDate>
               </slotsForDay>
               <slotsForDay>
                  <available>YES</available>
                  <beginDate>2021-10-29T09:30:00+01:00</beginDate>
                  <bestSlot>false</bestSlot>
                  <endDate>2021-10-29T14:30:00+01:00</endDate>
               </slotsForDay>
               <slotsForDay>
                  <available>YES</available>
                  <beginDate>2021-10-29T08:00:00+01:00</beginDate>
                  <bestSlot>true</bestSlot>
                  <endDate>2021-10-29T16:00:00+01:00</endDate>
               </slotsForDay>
               <weeklyDayOff>false</weeklyDayOff>
            </theSlots>
            <theSlots>
               <day>2021-10-30T00:00:00+01:00</day>
               <nonWorkingDay>false</nonWorkingDay>
               <weeklyDayOff>false</weeklyDayOff>
            </theSlots>
            <theSlots>
               <day>2021-10-31T00:00:00+01:00</day>
               <nonWorkingDay>false</nonWorkingDay>
               <weeklyDayOff>false</weeklyDayOff>
            </theSlots>
         </return>
      </ns1:checkAvailabilityResponse>
   </soap:Body>
</soap:Envelope>
```

#### 4. createOrder

##### Request:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">
   <env:Header />
   <env:Body>
      <aut:createOrder xmlns:aut="http://autogenerated.OTWebServiceApi.xmbrace.com/">
         <createOrder>
            <sessionId>8a4b805d7ca651e4017ca68c381b0021</sessionId>
            <theOrder>
               <!--<contactName>John Smith</contactName>-->
               <contract>0</contract>
               <locationID>3670010</locationID>
               <!-- <message>false</message> -->
               <orderComments />
               <!-- <orderId>?</orderId> -->
               <primaryOrderNumber>12345659</primaryOrderNumber>
               <priority>Priority 20 Days</priority>
               <targetDate>2021-10-31T23:59:59</targetDate>
               <userId>HousingRepairsOnline</userId>
               <!--<phone>0123456789</phone>-->
               <!-- <earliestBookingDate>2021-10-27T00:00:00</earliestBookingDate> -->
               <theBookingCodes>
                  <bookingCodeSORCode>N373049</bookingCodeSORCode>
                  <itemNumberWithinBooking>1</itemNumberWithinBooking>
                  <primaryOrderNumber>12345659</primaryOrderNumber>
                  <quantity>1</quantity>
               </theBookingCodes>
            </theOrder>
         </createOrder>
      </aut:createOrder>
   </env:Body>
</env:Envelope>
```

##### Response:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
   <soap:Body>
      <ns1:createOrderResponse xmlns:ns1="http://autogenerated.OTWebServiceApi.xmbrace.com/">
         <return xmlns:ns2="http://autogenerated.OTWebServiceApi.xmbrace.com/">
            <id>0</id>
            <status>success</status>
            <theOrder>
               <contract>0</contract>
               <locationID>3670010</locationID>
               <message>false</message>
               <orderComments />
               <orderId>290640</orderId>
               <primaryOrderNumber>12345659</primaryOrderNumber>
               <priority>Priority 20 Days</priority>
               <status>undefined</status>
               <targetDate>2021-10-31T23:59:59Z</targetDate>
               <theBookings>
                  <bookingCategory>TASK</bookingCategory>
                  <bookingCompletionStatus />
                  <bookingId>149996</bookingId>
                  <bookingLifeCycleStatus>PLANNED</bookingLifeCycleStatus>
                  <bookingReason>FIRST</bookingReason>
                  <contract>0</contract>
                  <duration>60</duration>
                  <isEmergency>false</isEmergency>
                  <isNextBooking>false</isNextBooking>
                  <locationID>3670010</locationID>
                  <operatorComments />
                  <orderId>290640</orderId>
                  <plannerComments />
                  <planningWindowEnd>2021-10-31T23:59:59Z</planningWindowEnd>
                  <planningWindowStart>2021-10-22T12:20:59.555+01:00</planningWindowStart>
                  <primaryOrderNumber>12345659</primaryOrderNumber>
                  <secondaryOrderNumber />
                  <template>Joiner</template>
                  <tertiaryOrderNumber />
                  <theBookingCodes>
                     <bookingCodeSORCode>N373049</bookingCodeSORCode>
                     <bookingId>149996</bookingId>
                     <comments />
                     <itemNumberWithinBooking>1</itemNumberWithinBooking>
                     <itemValue>0.0</itemValue>
                     <orderId>290640</orderId>
                     <originalQuantity>0.0</originalQuantity>
                     <primaryOrderNumber>12345659</primaryOrderNumber>
                     <quantity>1.0</quantity>
                     <quantityUsed>0.0</quantityUsed>
                     <standardMinuteValue>60</standardMinuteValue>
                     <timeRemaining>0.0</timeRemaining>
                     <trade>Joiner</trade>
                  </theBookingCodes>
                  <theBusinessData>
                     <name>USER_QUEUE</name>
                     <targetObject>job</targetObject>
                     <value>HousingRepairsOnline</value>
                  </theBusinessData>
                  <theBusinessData>
                     <name>APPOINTMENT_REASON</name>
                     <targetObject>job</targetObject>
                     <value>FIRST</value>
                  </theBusinessData>
                  <theBusinessData>
                     <name>APPOINTMENT_SEQUENCE</name>
                     <targetObject>job</targetObject>
                     <value>FIRST</value>
                  </theBusinessData>
                  <theBusinessData>
                     <name>EMERGENCY</name>
                     <targetObject>job</targetObject>
                     <value>NO</value>
                  </theBusinessData>
                  <theBusinessData>
                     <name>TASK_CATEGORY</name>
                     <targetObject>job</targetObject>
                     <value>TASK</value>
                  </theBusinessData>
                  <theBusinessData>
                     <name>ORIGINAL_USER</name>
                     <targetObject>job</targetObject>
                     <value>HousingRepairsOnline</value>
                  </theBusinessData>
                  <theBusinessData>
                     <name>SERVICE_REQUIREMENT</name>
                     <targetObject>job</targetObject>
                     <value>FALSE</value>
                  </theBusinessData>
                  <theBusinessData>
                     <name>BOOKING_TYPE</name>
                     <targetObject>job</targetObject>
                     <value>Housing Repair</value>
                  </theBusinessData>
                  <theBusinessData>
                     <name>SUSPEND_RESCHEDULE</name>
                     <targetObject>job</targetObject>
                     <value>YES</value>
                  </theBusinessData>
                  <theBusinessData>
                     <name>PROJECT_PLANNER_JOB</name>
                     <targetObject>job</targetObject>
                     <value>NO</value>
                  </theBusinessData>
                  <theBusinessData>
                     <name>JEOPARDY</name>
                     <targetObject>job</targetObject>
                     <value>9999</value>
                  </theBusinessData>
                  <theBusinessData>
                     <name>TASK_LIFE_CYCLE_STAT</name>
                     <targetObject>job</targetObject>
                     <value>planned</value>
                  </theBusinessData>
                  <theBusinessData>
                     <name>SUSPEND_COMMENT</name>
                     <targetObject>job</targetObject>
                  </theBusinessData>
                  <tokenId>QYOdKt9gv3U0CPdGPXC49xrXxtgyM9g4l0agQusv</tokenId>
                  <userId>HousingRepairsOnline</userId>
               </theBookings>
               <theLocation>
                  <address1>1 ARTHUR TAYLOR STREET</address1>
                  <address3>LINCOLN</address3>
                  <address4>LINCOLNSHIRE</address4>
                  <agency>HRSL</agency>
                  <country>United Kingdom</country>
                  <excludedFromMsging>false</excludedFromMsging>
                  <latitude>53.23130809</latitude>
                  <locationId>3670010</locationId>
                  <longitude>-0.554546457</longitude>
                  <postCode>LN1 1TL</postCode>
                  <workflowType>0000</workflowType>
               </theLocation>
               <userId>HousingRepairsOnline</userId>
            </theOrder>
         </return>
      </ns1:createOrderResponse>
   </soap:Body>
</soap:Envelope>

```
#### 5. scheduleBooking

##### Request:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- this is working request, tested in our OnBoarding environment -->
<!-- if you get an "Error in Booking.schedule. Error in modifyJob Planning failed", check the Job has a valid Job Template -->
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:aut="http://autogenerated.OTWebServiceApi.xmbrace.com/">
   <soapenv:Header />
   <soapenv:Body>
      <aut:scheduleBooking>
         <!--Optional:-->
         <scheduleBooking>
            <!-- <id>0</id> -->
            <!-- <force>false</force> -->
            <sessionId>8a4b805d7ca651e4017ca68c381b0021</sessionId>
            <theBooking>
               <!-- Use the bookingId returned by the createOrder request -->
               <bookingId>149996</bookingId>
               <bookingReason>FIRST</bookingReason>
               <contract>0</contract>
               <!-- <duration>10</duration> -->
               <!-- <isEmergency>no</isEmergency> -->
               <!-- <isNextBooking>false</isNextBooking> -->
               <!-- <locationID>3670010</locationID> -->
               <!-- <orderId>290622</orderId> -->
               <planningWindowStart>2021-10-26T08:00:00+01:00</planningWindowStart>
               <planningWindowEnd>2021-10-26T12:00:00+01:00</planningWindowEnd>
               <!-- Use the original order number -->
               <primaryOrderNumber> </primaryOrderNumber>
               <!--1 or more repetitions:-->
               <!--<theBookingCodes> -->
               <!-- <bookingCodeSORCode>N373049</bookingCodeSORCode> -->
               <!-- <bookingId>149983</bookingId> -->
               <!-- <itemNumberWithinBooking>1</itemNumberWithinBooking>-->
               <!-- <orderId>290622</orderId> -->
               <!-- <primaryOrderNumber>12345649</primaryOrderNumber> -->
               <!-- <quantity>1</quantity>-->
               <!-- <standardMinuteValue>10</standardMinuteValue> -->
               <!-- </theBookingCodes> -->
               <!-- <userId>HousingRepairsOnline</userId> -->
            </theBooking>
            <!-- <timeLock>false</timeLock> -->
            <!-- <userId>HousingRepairsOnline</userId>-->
         </scheduleBooking>
      </aut:scheduleBooking>
   </soapenv:Body>
</soapenv:Envelope>
```

##### Response:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
   <soap:Body>
      <ns1:scheduleBookingResponse xmlns:ns1="http://autogenerated.OTWebServiceApi.xmbrace.com/">
         <return xmlns:ns2="http://autogenerated.OTWebServiceApi.xmbrace.com/">
            <id>0</id>
            <status>success</status>
         </return>
      </ns1:scheduleBookingResponse>
   </soap:Body>
</soap:Envelope>
```
