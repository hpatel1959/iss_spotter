const requestIP = require('./iss_promised').requestIP;
const fetchCoordsbyIP = require('./iss_promised').fetchCoordsbyIP;
const fetchISSFlyOverTimes = require('./iss_promised').fetchISSFlyOverTimes;
const fetchISSFlyOverTimesV2 = require('./iss_promised').fetchISSFlyOverTimesV2;
const printPassTimes = require('./iss_promised').printPassTimes

requestIP()
.then(fetchCoordsbyIP)
.then(fetchISSFlyOverTimes)
.then(fetchISSFlyOverTimesV2)
.then(printPassTimes)
.then((body) => console.log(body));
