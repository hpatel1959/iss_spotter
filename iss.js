const request = require('request');

const fetchMyIp = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const ip = JSON.parse(body).ip;
    callback(null, ip);
    
  });
};

const fetchCoordsbyIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    const parsedObj = JSON.parse(body);
  
    if (!parsedObj.success) {
      const msg2 = `Success status was ${parsedObj.success}. Server says ${parsedObj.message} when fetching coordinates for ${parsedObj.ip}.`;
      callback(Error(msg2), null);
      return;
    }

    const coords = {
      "latitude": parsedObj.latitude,
      "longitude": parsedObj.longitude
    };

    callback(null, coords);
    

  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.latitude}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }


    if(response.statusCode !== 200) {
      const msg3 = `Status code is ${response.statusCode} when trying to find ISS fly over times: ${body}`;
      callback(Error(msg3), null);
      return;
    }

    const parsedBody = JSON.parse(body);
    const flyOverTimes = parsedBody.response;
    callback(null, flyOverTimes);
  });
};

const nextISSFlyOverTimes = function(callback) {
  fetchMyIp((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }

    // console.log('Got your ip!');

    fetchCoordsbyIP(ip, (error, data) => {
      if (error) {
        callback(error, null);
        return;
      }

      // console.log(`Succesfully acquired the coordinates for IP: ${ip}`);
      fetchISSFlyOverTimes(data, (error, flyOverTimes) => {
        if (error) {
          callback(error,null);
          return;
        }

        // console.log(`Successfully acquired the fly over times for latitude: ${parsedObj.latitude} and longitude: ${parsedObj.longitude}`);
        callback(null, flyOverTimes);
      })
    })
  });
};

module.exports = {
  fetchMyIp,
  fetchCoordsbyIP,
  fetchISSFlyOverTimes,
  nextISSFlyOverTimes
};