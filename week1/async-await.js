/**
 * @overview  async-await
 */

const rp = require('request-promise');

const BASE_URL = 'http://swapi.co/api/';

function callSwapi(subUrl) {
  return rp(`${BASE_URL}${subUrl}`);
}

async function run() {
  const luke = await callSwapi('people/1');
  const lukeObject = JSON.parse(luke);
  const vehiclesArray = lukeObject.vehicles;
  const vehiclesUrls = vehiclesArray.map((vehicle) => {
    return vehicle.slice(21);
  });
  let vehicles = vehiclesUrls.map((url)=> {
    return callSwapi(url);
  });
  const vehiclesData = await Promise.all(vehicles);
  let vehiclesNames = vehiclesData.map((vehicleData) => {
    let vehicleObject = JSON.parse(vehicleData);
    return vehicleObject.name;
  });
  console.log(vehiclesNames);
}

run();

/*async function run() {

  const data = await callApi('api.google.com')
  // Context is automatically loaded here
  console.log(data)
  const innerData = await callApi('api.microsoft.com')
  console.log(innerData)
  const subData = await callApi('api.apple.com')
  console.log(`${data}, ${subData}`)

  // We can await all at once

  const [data, innerData, subData] = await Promise.all([
    callApi('api.google.com'),
    callApi('api.microsoft.com'),
    callApi('api.apple.com')
})

console.log(data)
console.log(innerData)
console.log(`${data}, ${subData}`)
}*/