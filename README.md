# DeliveryAPI

## Description
An API to manage deliveries given a courier API which a json file with upcoming week time slots avilable.

### Tech Stack Used for Project
&nbsp; TypeScript, NodeJS, Express, MongoDB(mongoose).

### Architectural Software Concepts
1. Use TypeScripts for type definition.
2. Use and MC desgin pattern for maximal scalability.
3. Build as a REST API.

### API EndPoints
|EndPoint|Description|Type|
|----|----|----|
|```/resolve-address```|Uses [Google GeoCoding](https://developers.google.com/maps/documentation/geocoding/overview) to resolve address.<br><br>__Arguments:__<br> &nbsp;&nbsp;&nbsp;&nbsp;```searchTerm```(Single Line Address)<br>__Returns:__<br> &nbsp;&nbsp;&nbsp;&nbsp;```Street```: String <br> &nbsp;&nbsp;&nbsp;&nbsp;```Country```: String <br>&nbsp;&nbsp;&nbsp;&nbsp;```Country Code```: String <br> &nbsp;&nbsp;&nbsp;&nbsp;```City```: String <br> &nbsp;&nbsp;&nbsp;&nbsp;```State```: String <br> &nbsp;&nbsp;&nbsp;&nbsp;```Postal Code```: String|```POST```|
|```/timeslots```|Get all avilable timeslots for the given address.<br><br>__Arguments:__<br> &nbsp;&nbsp;&nbsp;&nbsp;```Address```(Resolved) <br><br>__Returns:__<br>&nbsp;&nbsp;&nbsp;&nbsp;```Array<Timeslots>```|```POST```|
|```/deliveries```|Book a new Delivery.<br><br>__Arguments:__<br>&nbsp;&nbsp;&nbsp;&nbsp;```User```<br>&nbsp;&nbsp;&nbsp;&nbsp;```Timeslot ID```|```POST```|





