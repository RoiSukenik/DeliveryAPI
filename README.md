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
|```/resolve-address```|Uses [Google GeoCoding](https://developers.google.com/maps/documentation/geocoding/overview) to resolve adress using to following model:  <br> &nbsp;&nbsp;&nbsp;&nbsp; __Street__: String <br> &nbsp;&nbsp;&nbsp;&nbsp; __Country__: String <br>&nbsp;&nbsp;&nbsp;&nbsp;__Country Code__: string <br> &nbsp;&nbsp;&nbsp;&nbsp;__City__: String <br> &nbsp;&nbsp;&nbsp;&nbsp;__State__: String <br> &nbsp;&nbsp;&nbsp;&nbsp;__Postal Code__: String|```POST```|





