/**
 * @overview  callbacks.js
 */

const request = require('request');

const BASE_URL = 'http://swapi.co/api/';

function callSwapi(specificUrl, callback) {
  const SPECIFICURL = specificUrl;
  const err = "Something bad happened.";
  request.get(`${BASE_URL}${SPECIFICURL}`, callback);
}

callSwapi('people/1', (err, response, body) => {
  let vehiclesURLS;
  if (body !== null && body !== undefined && body !== "") {
    vehiclesURLS = JSON.parse(body).vehicles;
  }
  const vehiclesSpecific = vehiclesURLS.map((el) => {
    return el.slice(21);
  });

  vehiclesSpecific.map((spec) => {
    callSwapi(spec, (err, response, body) => {
      let vehicleResult = JSON.parse(body);
      let vehicleName = vehicleResult.name;
      console.log(vehicleName);
    })
  })
});




