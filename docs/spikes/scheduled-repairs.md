---
sidebar_position: 3
---

# Scheduled Repairs Based on Area

## Introduction

To improve scheduled repair efficiency, Lincoln will be changing their repair scheduling to consider the location of the repair. Housing Repairs Online will need to incorporate this change and offer appointments within the appropriate time period for the property a repair is requested for.


## Background

Lincoln uses Kirona DRS as their scheduling system.

Currently, when customer service agents (CSAs) are scheduling a repair, they are offered appointments based on availability of the respective trade operative. The offered appointments are graded for most optimum based on multiple factors, including proximity of existing booked repairs of the trade operative required. The CSA would allocate the appointment based on the availability of the resident.

For scheduled repairs based on area, the geographic area which Lincoln is responsible for repairs will be divided into quadrants and each quadrant will be assigned a 3 week period during which repairs within the quadrant will be scheduled. Quadrant periods will be rotated every 3 weeks.

The scheduling system, DRS, will be reconfigured to support scheduled repairs based on area. Afterwich it will only provide availability for a property repair within it’s next allocated period.

DRS has a [SOAP API](https://docs.google.com/document/d/17hIzF-7Js8WZDX5gHFiGOQlddC9JW0oSCJEiB_Zn2RQ/edit#heading=h.au87mlcwtmv3) which Housing Repairs Online will be using to interface with it. A checkAvailability request can be made to query availability of appointments for a property of type of repair (SOR). The request needs to include the start and end dates of the period to search for available appointments. The response to this request is an ordered list of all days between the specified start and end dates (see next paragraph) and the available appointment slots for each day.

The response includes days for which no appointments are available and also weekends and national holidays.

DRS is configured to provide a maximum number of days for this response and providing a start and end date which exceeds the configured maximum would only contain days between the start date and the start date + the maximum number of days configured. <br/>
The default DRS configuration is a maximum of 7 days and the maximum recommended value is 14, afterwich DRS system performance would degrade (only affects SOAP API, not web). Lincoln’s DRS system is configured for a maximum of 14 days.

So we are unable to provide a sufficiently large time span of search to cover all quadrants and expect results for the entire time span.

Given each quadrant is worked in for 3 weeks and rotated to the next quadrant and DRS availability check responses only provide availability for a maximum configured time span, a single request for querying availability may return no available appointments.

DRS Web Services Gateway doesn’t provide an API endpoint to query the next available appointment without a start and end date for the search. For our purposes, this would be a great new feature of the API and consulted OneAdvanced (publishers of DRS) about the possibility of adding it to the API. They are considering the request, however it’s unlikely that it would be available within a suitable time frame to be useful for the current project and as such isn’t an option that can be considered.

This spike is to investigate approaches to provide at least 5 days of available appointments for a repair request.


## Options

The following are possible approaches to factoring in scheduled repairs based on area:


### 1. **Web Booking Hub, a DRS add-in**

  DRS has a web based plugin called Web Booking Hub which is an additional paid product. Lincoln doesn’t currently have this product.

  It integrates with DRS web UI and provides a web interface that displays a grid of available repair appointments. It would initially display the next available appointment for a repair request.

  It does not have an API which could be used to query the next available appointment, which means it’s not possible to use within Housing Repairs Online.

### 2. **Housing Repairs Online understands quadrant schedules**

  Housing Repairs Online would understand when each quadrant is scheduled to be worked on and use this information to select a start date for the check availability request. This would ensure that the initial response would have available appointments (if any were available). <br/>
  Housing Repairs Online having the quadrant information duplicates the information that will be configured in DRS. If the DRS scheduling changes, then Housing Repairs Online would also need to be updated to reflect the scheduling changes.
  <br/>
  Additionally, given Housing Repairs Online will be adopted by other Local Authorities and their scheduling may not require specialised scheduling, adding complexity within Housing Repairs Online could make it more difficult to adopt.

### 3. **Housing Repairs Online iterative querying**

  Housing Repairs Online would repeatedly request available appointments, incrementing the search time span, from the scheduling system until it had the desired amount of days (currently 5) worth of appointments.
  <br/>
  This approach would mean, given a maximum scheduling system search window of 14 days and each quadrant worked on for 3 weeks (21 days), that the quadrant to be worked in furthest in the future would need a minimum of 5 requests to be searching in the correct time span and a maximum of 6 to cover the entire duration of days repairing in that quadrant. See [table 1](#table-1).


### Table 1

<table>
  <tr>
    <td colspan="3" >Quadrant 1</td>
    <td colspan="3" >Quadrant 2</td>
    <td colspan="3" >Quadrant 3</td>
    <td colspan="3" >Quadrant 4</td>
  </tr>
  <tr>
    <td>Week 1</td>
    <td>Week 2</td>
    <td>Week 3</td>
    <td>Week 4</td>
    <td>Week 5</td>
    <td>Week 6</td>
    <td>Week 7</td>
    <td>Week 8</td>
    <td>Week 9</td>
    <td>Week 10</td>
    <td>Week 11</td>
    <td>Week 12</td>
  </tr>
  <tr>
   <td colspan="2" >Request 1</td>
   <td colspan="2" >Request 2</td>
   <td colspan="2" >Request 3</td>
   <td colspan="2" >Request 4</td>
   <td colspan="2" >Request 5</td>
   <td colspan="2" >Request 6</td>
  </tr>
</table>


The average time taken for a single request is 1685ms.

Therefore performing all 6 requests would take an average of 10.1s.

[See [Appendix A](#appendix-a) for a breakdown of timings.]

The approach of iteratively querying within an incremented search time window until sufficient days worth of available appointments were found would also solve the scenario where an initial request doesn’t retrieve desired number of days of appointments. This could occur regardless of the scheduling policy due to various factors:


1. limited availability of trade operatives for specific repair
2. high demand for specific repair
3. national holidays (which aren’t known to the scheduling system)


## Summary

Option [1](#1-web-booking-hub-a-drs-add-in) is not viable as:

* We do not want to embed a web UI in our public facing service as it would not fit in with the UX we are trying to provide.
* We are unable to query the add-in for the next available appointment.
* There would be an additional cost for the add-in.

Option [2](#2-housing-repairs-online-understands-quadrant-schedules) has the following drawbacks:

* Duplication of scheduling by area logic.
* Housing Repairs Online system having knowledge of scheduling by area Increases complexity within a system designed to depend on a scheduling system.
* Such specific logic _could_ make adoption more difficult for Local Authorities that do not apply the same scheduling policy.

Option [3](#3-housing-repairs-online-iterative-querying) would have an increased overhead associated with querying appointment availability if the repair request is for an area that isn’t available for a number of weeks.

This overhead _could_ mean a latency in returning the available repair appointments to the user which may be a source of user frustration and/or confusion during the user journey.

However, this option would allow keeping specific scheduling information within the scheduling system (DRS) and would be the equivalent of scenarios where sufficient available appointments are not found in an initial request.

To mitigate the perceived delay in displaying the available repair appointments, rather than starting the query when the user reaches the available appointment stage of the user journey, to instead begin that query once sufficient data for the query has been gathered. The results would then be available quicker than if the query only commenced when the user arrived at the appointment selection stage.

This approach would need to factor in if the user went back and changed something that would affect the available appointment requests.


## Conclusion

The recommendation is to use [option 3](#3-housing-repairs-online-iterative-querying) to iteratively query the scheduling system until sufficient days worth of available appointments are found as this will fit any scheduling system that is configured appropriately for the desired repair scheduling.


## Appendix A

Timings taken using Lincoln Citrix Workspace Teams Desktop.

All values are in milliseconds.


<table>
  <tr>
   <td rowspan="2" ><strong>Batch Number</strong></td>
   <td colspan="6" ><strong>Request Number</strong></td>
   <td rowspan="2" ><strong>Average</strong></td>
   <td rowspan="2" ><strong>Total</strong></td>
  </tr>
  <tr>
  <td><strong>1</strong></td>
   <td><strong>2</strong></td>
   <td><strong>3</strong></td>
   <td><strong>4</strong></td>
   <td><strong>5</strong></td>
   <td><strong>6</strong></td>
  </tr>
  <tr>
   <td><strong>1</strong></td>
   <td><p>1016</p></td>
   <td><p>1062</p></td>
   <td><p>999</p></td>
   <td><p>991</p></td>
   <td><p>980</p></td>
   <td><p>923</p></td>
   <td><p><strong>995</strong></p></td>
   <td><p><strong>5971</strong></p></td>
  </tr>
  <tr>
   <td><strong>1</strong></td>
   <td><p>980</p></td>
   <td><p>945</p></td>
   <td><p>921</p></td>
   <td><p>2048</p></td>
   <td><p>1534</p></td>
   <td><p>2101</p></td>
   <td><p><strong>1421</strong></p></td>
   <td><p><strong>8527</strong></p></td>
  </tr>
  <tr>
   <td><strong>1</strong></td>
   <td><p>1483</p></td>
   <td><p>1490</p></td>
   <td><p>1556</p></td>
   <td><p>1389</p></td>
   <td><p>1983</p></td>
   <td><p>1514</p></td>
   <td><p><strong>1569</strong></p></td>
   <td><p><strong>9413</strong></p></td>
  </tr>
  <tr>
   <td><strong>1</strong></td>
   <td><p>3598</p></td>
   <td><p>1598</p></td>
   <td><p>2707</p></td>
   <td><p>1527</p></td>
   <td><p>1466</p></td>
   <td><p>1453</p></td>
   <td><p><strong>2058</strong></p></td>
   <td><p><strong>12348</strong></p></td>
  </tr>
  <tr>
   <td><strong>1</strong></td>
   <td><p>1550</p></td>
   <td><p>1355</p></td>
   <td><p>1596</p></td>
   <td><p>1336</p></td>
   <td><p>2852</p></td>
   <td><p>1435</p></td>
   <td><p><strong>1687</strong></p></td>
   <td><p><strong>10125</strong></p></td>
  </tr>
  <tr>
   <td><strong>1</strong></td>
   <td><p>1482</p></td>
   <td><p>2058</p></td>
   <td><p>1461</p></td>
   <td><p>1474</p></td>
   <td><p>1444</p></td>
   <td><p>1425</p></td>
   <td><p><strong>1557</strong></p></td>
   <td><p><strong>9344</strong></p></td>
  </tr>
  <tr>
   <td><strong>1</strong></td>
   <td><p>1451</p></td>
   <td><p>2160</p></td>
   <td><p>965</p></td>
   <td><p>1680</p></td>
   <td><p>1956</p></td>
   <td><p>1473</p></td>
   <td><p><strong>1614</strong></p></td>
   <td><p><strong>9686</strong></p></td>
  </tr>
  <tr>
   <td><strong>1</strong></td>
   <td><p>1407</p></td>
   <td><p>1785</p></td>
   <td><p>1304</p></td>
   <td><p>1528</p></td>
   <td><p>1460</p></td>
   <td><p>1988</p></td>
   <td><p><strong>1579</strong></p></td>
   <td><p><strong>9472</strong></p></td>
  </tr>
  <tr>
   <td><strong>1</strong></td>
   <td><p>1654</p></td>
   <td><p>2084</p></td>
   <td><p>1383</p></td>
   <td><p>1415</p></td>
   <td><p>1587</p></td>
   <td><p>1634</p></td>
   <td><p><strong>1626</strong></p></td>
   <td><p><strong>9757</strong></p></td>
  </tr>
  <tr>
   <td><strong>1</strong></td>
   <td><p>2139</p></td>
   <td><p>2172</p></td>
   <td><p>2046</p></td>
   <td><p>942</p></td>
   <td><p>1354</p></td>
   <td><p>1486</p></td>
   <td><p><strong>1690</strong></p></td>
   <td><p><strong>10138</strong></p></td>
  </tr>
  <tr>
   <td><strong>2</strong></td>
   <td><p>1021</p></td>
   <td><p>970</p></td>
   <td><p>995</p></td>
   <td><p>884</p></td>
   <td><p>911</p></td>
   <td><p>932</p></td>
   <td><p><strong>952</strong></p></td>
   <td><p><strong>5714</strong></p></td>
  </tr>
  <tr>
   <td><strong>2</strong></td>
   <td><p>884</p></td>
   <td><p>931</p></td>
   <td><p>957</p></td>
   <td><p>1952</p></td>
   <td><p>928</p></td>
   <td><p>1377</p></td>
   <td><p><strong>1171</strong></p></td>
   <td><p><strong>7029</strong></p></td>
  </tr>
  <tr>
   <td><strong>2</strong></td>
   <td><p>1525</p></td>
   <td><p>1329</p></td>
   <td><p>1804</p></td>
   <td><p>1609</p></td>
   <td><p>1465</p></td>
   <td><p>1479</p></td>
   <td><p><strong>1535</strong></p></td>
   <td><p><strong>9212</strong></p></td>
  </tr>
  <tr>
   <td><strong>2</strong></td>
   <td><p>2118</p></td>
   <td><p>1884</p></td>
   <td><p>1461</p></td>
   <td><p>1806</p></td>
   <td><p>1348</p></td>
   <td><p>1627</p></td>
   <td><p><strong>1707</strong></p></td>
   <td><p><strong>10245</strong></p></td>
  </tr>
  <tr>
   <td><strong>2</strong></td>
   <td><p>1602</p></td>
   <td><p>1381</p></td>
   <td><p>1329</p></td>
   <td><p>1983</p></td>
   <td><p>1500</p></td>
   <td><p>2033</p></td>
   <td><p><strong>1638</strong></p></td>
   <td><p><strong>9828</strong></p></td>
  </tr>
  <tr>
   <td><strong>2</strong></td>
   <td><p>1588</p></td>
   <td><p>1334</p></td>
   <td><p>1471</p></td>
   <td><p>2678</p></td>
   <td><p>1707</p></td>
   <td><p>1523</p></td>
   <td><p><strong>1717</strong></p></td>
   <td><p><strong>10301</strong></p></td>
  </tr>
  <tr>
   <td><strong>2</strong></td>
   <td><p>1847</p></td>
   <td><p>1100</p></td>
   <td><p>1325</p></td>
   <td><p>1542</p></td>
   <td><p>1764</p></td>
   <td><p>1659</p></td>
   <td><p><strong>1539</strong></p></td>
   <td><p><strong>9236</strong></p></td>
  </tr>
  <tr>
   <td><strong>2</strong></td>
   <td><p>1383</p></td>
   <td><p>1500</p></td>
   <td><p>1874</p></td>
   <td><p>1967</p></td>
   <td><p>1165</p></td>
   <td><p>1432</p></td>
   <td><p><strong>1554</strong></p></td>
   <td><p><strong>9322</strong></p></td>
  </tr>
  <tr>
   <td><strong>2</strong></td>
   <td><p>1473</p></td>
   <td><p>2478</p></td>
   <td><p>1933</p></td>
   <td><p>1871</p></td>
   <td><p>2909</p></td>
   <td><p>2111</p></td>
   <td><p><strong>2129</strong></p></td>
   <td><p><strong>12775</strong></p></td>
  </tr>
  <tr>
   <td><strong>2</strong></td>
   <td><p>1927</p></td>
   <td><p>2154</p></td>
   <td><p>1873</p></td>
   <td><p>1581</p></td>
   <td><p>2598</p></td>
   <td><p>2378</p></td>
   <td><p><strong>2085</strong></p></td>
   <td><p><strong>12511</strong></p></td>
  </tr>
  <tr>
   <td><strong>3</strong></td>
   <td><p>956</p></td>
   <td><p>886</p></td>
   <td><p>902</p></td>
   <td><p>915</p></td>
   <td><p>968</p></td>
   <td><p>910</p></td>
   <td><p><strong>923</strong></p></td>
   <td><p><strong>5537</strong></p></td>
  </tr>
  <tr>
   <td><strong>3</strong></td>
   <td><p>891</p></td>
   <td><p>930</p></td>
   <td><p>914</p></td>
   <td><p>2017</p></td>
   <td><p>893</p></td>
   <td><p>1883</p></td>
   <td><p><strong>1254</strong></p></td>
   <td><p><strong>7527</strong></p></td>
  </tr>
  <tr>
   <td><strong>3</strong></td>
   <td><p>1372</p></td>
   <td><p>1569</p></td>
   <td><p>1367</p></td>
   <td><p>1555</p></td>
   <td><p>1343</p></td>
   <td><p>1555</p></td>
   <td><p><strong>1460</strong></p></td>
   <td><p><strong>8761</strong></p></td>
  </tr>
  <tr>
   <td><strong>3</strong></td>
   <td><p>1897</p></td>
   <td><p>1231</p></td>
   <td><p>2106</p></td>
   <td><p>1365</p></td>
   <td><p>1415</p></td>
   <td><p>1368</p></td>
   <td><p><strong>1564</strong></p></td>
   <td><p><strong>9381</strong></p></td>
  </tr>
  <tr>
   <td><strong>3</strong></td>
   <td><p>1486</p></td>
   <td><p>1512</p></td>
   <td><p>1405</p></td>
   <td><p>1901</p></td>
   <td><p>1337</p></td>
   <td><p>1454</p></td>
   <td><p><strong>1516</strong></p></td>
   <td><p><strong>9095</strong></p></td>
  </tr>
  <tr>
   <td><strong>3</strong></td>
   <td><p>1287</p></td>
   <td><p>2015</p></td>
   <td><p>1958</p></td>
   <td><p>3174</p></td>
   <td><p>3274</p></td>
   <td><p>3106</p></td>
   <td><p><strong>2469</strong></p></td>
   <td><p><strong>14814</strong></p></td>
  </tr>
  <tr>
   <td><strong>3</strong></td>
   <td><p>1890</p></td>
   <td><p>1074</p></td>
   <td><p>1676</p></td>
   <td><p>3708</p></td>
   <td><p>3120</p></td>
   <td><p>2716</p></td>
   <td><p><strong>2364</strong></p></td>
   <td><p><strong>14184</strong></p></td>
  </tr>
  <tr>
   <td><strong>3</strong></td>
   <td><p>3191</p></td>
   <td><p>4236</p></td>
   <td><p>3230</p></td>
   <td><p>3922</p></td>
   <td><p>3398</p></td>
   <td><p>2675</p></td>
   <td><p><strong>3442</strong></p></td>
   <td><p><strong>20652</strong></p></td>
  </tr>
  <tr>
   <td><strong>3</strong></td>
   <td><p>2878</p></td>
   <td><p>3058</p></td>
   <td><p>3056</p></td>
   <td><p>4835</p></td>
   <td><p>3012</p></td>
   <td><p>3190</p></td>
   <td><p><strong>3338</strong></p></td>
   <td><p><strong>20030</strong></p></td>
  </tr>
  <tr>
   <td><strong>3</strong></td>
   <td><p>2904</p></td>
   <td><p>3081</p></td>
   <td><p>3029</p></td>
   <td><p>3799</p></td>
   <td><p>2696</p></td>
   <td><p>3157</p></td>
   <td><p><strong>3111</strong></p></td>
   <td><p><strong>18665</strong></p></td>
  </tr>
  <tr>
   <td><strong>4</strong></td>
   <td><p>3007</p></td>
   <td><p>918</p></td>
   <td><p>975</p></td>
   <td><p>977</p></td>
   <td><p>878</p></td>
   <td><p>921</p></td>
   <td><p><strong>1279</strong></p></td>
   <td><p><strong>7675</strong></p></td>
  </tr>
  <tr>
   <td><strong>4</strong></td>
   <td><p>898</p></td>
   <td><p>937</p></td>
   <td><p>914</p></td>
   <td><p>1915</p></td>
   <td><p>916</p></td>
   <td><p>1205</p></td>
   <td><p><strong>1131</strong></p></td>
   <td><p><strong>6784</strong></p></td>
  </tr>
  <tr>
   <td><strong>4</strong></td>
   <td><p>1465</p></td>
   <td><p>1711</p></td>
   <td><p>1930</p></td>
   <td><p>2294</p></td>
   <td><p>2079</p></td>
   <td><p>1337</p></td>
   <td><p><strong>1802</strong></p></td>
   <td><p><strong>10815</strong></p></td>
  </tr>
  <tr>
   <td><strong>4</strong></td>
   <td><p>1382</p></td>
   <td><p>1543</p></td>
   <td><p>1440</p></td>
   <td><p>2187</p></td>
   <td><p>950</p></td>
   <td><p>1546</p></td>
   <td><p><strong>1508</strong></p></td>
   <td><p><strong>9048</strong></p></td>
  </tr>
  <tr>
   <td><strong>4</strong></td>
   <td><p>1271</p></td>
   <td><p>1565</p></td>
   <td><p>1539</p></td>
   <td><p>3525</p></td>
   <td><p>1823</p></td>
   <td><p>1603</p></td>
   <td><p><strong>1887</strong></p></td>
   <td><p><strong>11325</strong></p></td>
  </tr>
  <tr>
   <td><strong>4</strong></td>
   <td><p>1519</p></td>
   <td><p>1993</p></td>
   <td><p>1449</p></td>
   <td><p>1940</p></td>
   <td><p>1453</p></td>
   <td><p>1567</p></td>
   <td><p><strong>1654</strong></p></td>
   <td><p><strong>9921</strong></p></td>
  </tr>
  <tr>
   <td><strong>4</strong></td>
   <td><p>2044</p></td>
   <td><p>1345</p></td>
   <td><p>1551</p></td>
   <td><p>1317</p></td>
   <td><p>1919</p></td>
   <td><p>1234</p></td>
   <td><p><strong>1568</strong></p></td>
   <td><p><strong>9410</strong></p></td>
  </tr>
  <tr>
   <td><strong>4</strong></td>
   <td><p>1439</p></td>
   <td><p>1519</p></td>
   <td><p>1502</p></td>
   <td><p>1469</p></td>
   <td><p>1566</p></td>
   <td><p>1452</p></td>
   <td><p><strong>1491</strong></p></td>
   <td><p><strong>8947</strong></p></td>
  </tr>
  <tr>
   <td><strong>4</strong></td>
   <td><p>2061</p></td>
   <td><p>1927</p></td>
   <td><p>1175</p></td>
   <td><p>1904</p></td>
   <td><p>1471</p></td>
   <td><p>1635</p></td>
   <td><p><strong>1695</strong></p></td>
   <td><p><strong>10173</strong></p></td>
  </tr>
  <tr>
   <td><strong>4</strong></td>
   <td><p>1284</p></td>
   <td><p>1519</p></td>
   <td><p>2385</p></td>
   <td><p>2229</p></td>
   <td><p>2296</p></td>
   <td><p>1495</p></td>
   <td><p><strong>1868</strong></p></td>
   <td><p><strong>11208</strong></p></td>
  </tr>
  <tr>
   <td><strong>5</strong></td>
   <td><p>972</p></td>
   <td><p>942</p></td>
   <td><p>947</p></td>
   <td><p>966</p></td>
   <td><p>976</p></td>
   <td><p>959</p></td>
   <td><p><strong>960</strong></p></td>
   <td><p><strong>5762</strong></p></td>
  </tr>
  <tr>
   <td><strong>5</strong></td>
   <td><p>899</p></td>
   <td><p>932</p></td>
   <td><p>1994</p></td>
   <td><p>976</p></td>
   <td><p>963</p></td>
   <td><p>1428</p></td>
   <td><p><strong>1199</strong></p></td>
   <td><p><strong>7192</strong></p></td>
  </tr>
  <tr>
   <td><strong>5</strong></td>
   <td><p>1884</p></td>
   <td><p>1568</p></td>
   <td><p>1451</p></td>
   <td><p>1654</p></td>
   <td><p>1310</p></td>
   <td><p>2220</p></td>
   <td><p><strong>1681</strong></p></td>
   <td><p><strong>10086</strong></p></td>
  </tr>
  <tr>
   <td><strong>5</strong></td>
   <td><p>977</p></td>
   <td><p>1556</p></td>
   <td><p>1403</p></td>
   <td><p>1552</p></td>
   <td><p>1632</p></td>
   <td><p>2222</p></td>
   <td><p><strong>1557</strong></p></td>
   <td><p><strong>9342</strong></p></td>
  </tr>
  <tr>
   <td><strong>5</strong></td>
   <td><p>1602</p></td>
   <td><p>1745</p></td>
   <td><p>2160</p></td>
   <td><p>1001</p></td>
   <td><p>1513</p></td>
   <td><p>1538</p></td>
   <td><p><strong>1593</strong></p></td>
   <td><p><strong>9559</strong></p></td>
  </tr>
  <tr>
   <td><strong>5</strong></td>
   <td><p>1552</p></td>
   <td><p>1536</p></td>
   <td><p>1481</p></td>
   <td><p>2061</p></td>
   <td><p>1477</p></td>
   <td><p>1318</p></td>
   <td><p><strong>1571</strong></p></td>
   <td><p><strong>9425</strong></p></td>
  </tr>
  <tr>
   <td><strong>5</strong></td>
   <td><p>1959</p></td>
   <td><p>941</p></td>
   <td><p>1362</p></td>
   <td><p>1477</p></td>
   <td><p>1575</p></td>
   <td><p>1732</p></td>
   <td><p><strong>1508</strong></p></td>
   <td><p><strong>9046</strong></p></td>
  </tr>
  <tr>
   <td><strong>5</strong>
   </td>
   <td><p>1706</p></td>
   <td><p>1418</p></td>
   <td><p>1640</p></td>
   <td><p>2186</p></td>
   <td><p>1563</p></td>
   <td><p>2621</p></td>
   <td><p><strong>1856</strong></p></td>
   <td><p><strong>11133</strong></p></td>
  </tr>
  <tr>
   <td><strong>5</strong>
   </td>
   <td><p>1425</p></td>
   <td><p>1569</p></td>
   <td><p>1532</p></td>
   <td><p>1367</p></td>
   <td><p>1588</p></td>
   <td><p>1445</p></td>
   <td><p><strong>1488</strong></p></td>
   <td><p><strong>8926</strong></p></td>
  </tr>
  <tr>
   <td><strong>5</strong>
   </td>
   <td><p>1956</p></td>
   <td><p>1178</p></td>
   <td><p>1910</p></td>
   <td><p>1697</p></td>
   <td><p>1502</p></td>
   <td><p>2004</p></td>
   <td><p><strong>1708</strong></p></td>
   <td><p><strong>10246</strong></p></td>
  </tr>
  <tr>
   <td><strong>Average</strong>
   </td>
   <td><p><strong>1611</strong></p></td>
   <td><p><strong>1563</strong></p></td>
   <td><p><strong>1575</strong></p></td>
   <td><p><strong>1845</strong></p></td>
   <td><p><strong>1644</strong></p></td>
   <td><p><strong>1676</strong></p></td>
   <td><p><strong>1685</strong></p></td>
   <td><p><strong>10112</strong></p></td>
  </tr>
</table>

<table>
  <tr>
   <td colspan="2"> </td>
   <td><strong>Min.</strong> </td>
   <td><strong>Max.</strong> </td>
  </tr>
  <tr>
   <td colspan="2" ><strong>Single Request</strong></td>
   <td><p>878</p></td>
   <td><p>4835</p></td>
  </tr>
  <tr>
   <td colspan="2" ><strong>6 Requests</strong></td>
   <td><p>5537</p></td>
   <td><p>20652</p></td>
  </tr>
</table>


There is a large difference between the minimum and maximum time for a single request and also 6 requests.

Each batch consists of performing 6 requests 10 times in quick succession. The close proximity of requests could be the reason for the large difference between minimum and maximum duration of requests.
