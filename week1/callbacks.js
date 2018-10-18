/**
 * @overview  callbacks.js
 */

const request = require('request');

function callSwapi(url, callback) {
  request.get(`${url}`, callback);
}

callSwapi('http://swapi.co/api/people/1', (err, response, body) => {
  if (err) {
    console.log(`Something went wrong`, err);
    return;
  }
  let luke = body;
  let vehiclesURLS = !luke ? null : JSON.parse(body).vehicles;
  vehiclesURLS.map((spec) => {
    callSwapi(spec, (err, response, body) => {
       let vehicleName = !body ? null : JSON.parse(body).name;
      console.log(vehicleName);
    });
  })
});




