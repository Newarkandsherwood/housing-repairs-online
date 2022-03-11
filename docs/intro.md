---
sidebar_position: 1
slug: '/'
---

# Housing Repairs Online

Let's discover **Housing Repairs Online in less than 5 minutes**.

## What is Housing Repairs Online?

The Housing Repairs Online project allows a UK Local Authority to provide an online channel for requesting a repair for a property which the Local Authority is responsible for.

The project is a collaborative local authority project, funded by the DLUHC Local Digital Fund.

## Integration
The solution allows integration with two key systems:
 - Housing Management System (HMS)

   The Housing Management System (HMS) is used to look up addresses which the Local Authority is responsible to repair.
 - Scheduling

   The scheduling system is used to query available appointments and book repair jobs.

## Service Diagram

![Service diagram](/img/housing-repairs-online.drawio.png)

## Front End

- [Built using Next.js](./front-end/frameworks-used)
- Connects to Repairs API

## Repairs API

- Built using .Net
- Sends emails and SMS via Gov Notify
- Saves records into Cosmos DB
- Saves images into Azure Blob Storage
- Connects to Housing Management API
- Connects to Scheduling API

## Housing Management API

- Built using .Net
- Connects to Universal Housing

## Scheduling API

- Built using .Net
- Connects to DRS
