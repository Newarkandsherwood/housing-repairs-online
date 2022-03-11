---
sidebar_position: 1
slug: '/'
---

# Housing repairs online

Let's discover **Housing repairs online in less than 5 minutes**.

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
