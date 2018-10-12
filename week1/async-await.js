/**
 * @overview  async-await
 */

const rp = require('request-promise');

function callSwapi(url) {
  return rp(`${url}`);
}

async function run() {
  try {
    let lukeObject;
    const luke = await callSwapi('http://swapi.co/api/people/1');
    if (luke !== undefined && luke !== null && luke !== '') {
      lukeObject = JSON.parse(luke);
    }
    const vehiclesUrls = lukeObject.vehicles;
    const vehicles = vehiclesUrls.map((url) => {
      return callSwapi(url);
    });
    const vehiclesData = await Promise.all(vehicles);
    const vehiclesNames = vehiclesData.map((vehicleData) => {
      if (vehicleData !== undefined && vehicleData !== null && vehicleData !== '') {
        const vehicleObject = JSON.parse(vehicleData);
        console.log(vehicleObject.name);
        return vehicleObject.name;
      }
    });
    console.log(vehiclesNames);
  }
  catch(err) {
    console.log("Something went wrong", err);
  }
}

run();
