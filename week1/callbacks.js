/**
 * @overview  callbacks.js
 */

const request = require('request-promise');

const BASE_URL = 'http://swapi.co/api/';

function callSwapi(specificUrl, callback) {
  const SPECIFICURL = specificUrl;
  request.get(`${BASE_URL}${SPECIFICURL}`, callback);
}

callSwapi('people/1', (err, response, body) => {
  const result = JSON.parse(body);
  const vehiclesURLS = result.vehicles;
  const vehiclesSpecific = vehiclesURLS.map((el) => {
    return el.slice(21);
  });

 vehiclesSpecific.map((spec) => {
    return (
      callSwapi(spec, (err, response, body) => {
        let vehicleResult = JSON.parse(body);
        let vehicleName = vehicleResult.name;
        console.log(vehicleName);
        return vehicleName;
      })
    )
  });
});




