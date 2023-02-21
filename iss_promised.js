const request = require('request-promise-native');

const requestIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsbyIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const parsedBody = JSON.parse(body);
  const latitude = parsedBody.latitude;
  const longitude = parsedBody.longitude;
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const fetchISSFlyOverTimesV2 = function(body) {
  const parsedBody = JSON.parse(body);
  const normalResponse = parsedBody.response;
  return normalResponse;
};

const printPassTimes = function(normalResponse) {
  for (const pass of normalResponse) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


module.exports = {
  requestIP,
  fetchCoordsbyIP,
  fetchISSFlyOverTimes,
  fetchISSFlyOverTimesV2,
  printPassTimes
};

