// const fetchMyIp = require('./iss').fetchMyIp;
// const fetchCoordsbyIP = require("./iss").fetchCoordsbyIP;
// const fetchISSFlyOverTimes = require('./iss').fetchISSFlyOverTimes;
const nextISSFlyOverTimes = require('./iss').nextISSFlyOverTimes;

// fetchMyIp((error, ip) => {
//   if (error !== null) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP: ", ip);
// });

// fetchCoordsbyIP('99.241.91.2', (error, data) => {
//   if (error !== null) {
//     console.log('There was an error: ', error);
//     return;
//   }

//   console.log("It worked! Returned coordinates: ", data);
  
// });

// fetchISSFlyOverTimes({latitude: 43.653226, longitude: -79.3831843}, (error, data) => {
//   if (error) {
//     console.log('There was an error: ', error);
//     return;
//   }
nextISSFlyOverTimes((error, flyOverTimes) => {
  if (error) {
    console.log('There was an error: ', error);
    return;
  }

  printPassTimes(flyOverTimes);
});

const printPassTimes = function(flyOverTimes) {
  for (const pass of flyOverTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};
