/**
 * @overview  callbacks.js
 */

const request = require('request');

function callSwapi(url, callback) {
  request.get(`${url}`, callback);
}

callSwapi('http://swapi.co/api/people/1', (err, response, body) => {
  let vehiclesURLS;
  if (err) {
    console.log(`Something went wrong`, err);
    return;
  }
  if (body !== null && body !== undefined && body !== "") {
    vehiclesURLS = JSON.parse(body).vehicles;
  }
  vehiclesURLS.map((spec) => {
    callSwapi(spec, (err, response, body) => {
      let vehicleName;
      if (body !== null && body !== undefined && body !== "") {
        vehicleName = JSON.parse(body).name;
      }
      console.log(vehicleName);
    })
  })
});




