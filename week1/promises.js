/**
 * @overview  promises.js
 */


const rp = require('request-promise');


function callSwapi(url) {
  return rp(`${url}`);
}


callSwapi('http://swapi.co/api/people/1')
  .then((result) => {
    if (result !== null && result !== undefined && result !== '') {
     return JSON.parse(result).vehicles;
    }
  }).then((lukesVehicles) => {
    console.log(lukesVehicles);
  return lukesVehicles.map((url) => {
    return callSwapi(url);
  });
}).then((vehiclesPromises) => {
    return Promise.all(vehiclesPromises)
  }
).then((vehiclesArray) => {
  const vehiclesNames = vehiclesArray.map((vehicle) => {
    if (vehicle !== null && vehicle !== undefined && vehicle !== '') {
      const vehicleObject = JSON.parse(vehicle);
      console.log(vehicleObject.name);
      return vehicleObject.name;
    }
  });
  console.log(vehiclesNames);
  return vehiclesNames;
}).catch((err) => {
  console.log("Something went wrong", err.statusCode, err);
});
