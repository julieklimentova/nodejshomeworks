/**
 * @overview  promises.js
 */


const rp = require('request-promise');

const BASE_URL = 'http://swapi.co/api/';

function callSwapi(specificUrl) {
  const SPECIFICURL = specificUrl;
  return rp(`${BASE_URL}${SPECIFICURL}`);
}


callSwapi('people/1')
  .then((result) => {
    let luke = JSON.parse(result);
    let vehicles = luke.vehicles;
    return vehicles.map((url) => {
      return url.slice(21);
    });
  }).then((vehiclesUrls) => {
  return vehiclesUrls.map((subUrl) => {
    return callSwapi(subUrl);
  });
}).then((vehiclesPromises) => {
    return Promise.all(vehiclesPromises)
  }
).then((vehiclesArray) => {
  let vehiclesNames = vehiclesArray.map((vehicle) => {
    let vehicleObject = JSON.parse(vehicle);
    console.log(vehicleObject.name);
    return vehicleObject.name;
  });
  console.log(vehiclesNames);
  return vehiclesNames;
}).catch((err) => {
  console.log(err);
});
