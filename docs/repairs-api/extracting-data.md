---
sidebar_position: 2
---

# Extracting data from Cosmos DB

Analytics data can be extracted from Cosmos DB into Power BI by following
these steps:

1. Open Power BI and search for an Azure Cosmos DB connection:

![Find connection](/img/power-bi-tutorial/connection.png)

2. Fill in the connection details

![Connection details](/img/power-bi-tutorial/cosmos.png)

3. When prompted add your access key

4. Choose to edit query – then click this icon, which will create a new data set.

![Query](/img/power-bi-tutorial/query.png)

5. Add the following columns to this new data set – then close and apply.
```
#datetime(1970, 1, 1, 0, 0, 0) + #duration(0, 0, 0, [Document._ts])
```
```
Time.Hour(DateTime.Time([LoggedDT]))
```
![Query](/img/power-bi-tutorial/columns.png)

---
More information can be found here: https://docs.microsoft.com/en-us/azure/cosmos-db/sql/powerbi-visualize
