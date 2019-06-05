const axios = require('axios');
const Cyclone = require('../models/CycloneModel');

module.exports = {
  getAllCyclones: () => {
    const params = {
      client_id: process.env.CYCLONE_ID,
      client_secret: process.env.CYCLONE_SECRET,
    };

    return new Promise((resolve) => {
      axios.get('https://api.aerisapi.com/tropicalcyclones/?&filter=all&format=json', { params })
        .then((response) => {
          if (response.data.success) {
            if (response.data.error) {
              resolve(response);
            } else {
              response.data.response.forEach((cycloneElement) => {
                const cyclone = new Cyclone(
                  cycloneElement.profile.name,
                  cycloneElement.profile.basinCurrent,
                  cycloneElement.profile.lifespan.startDateTimeISO,
                  cycloneElement.profile.lifespan.endDateTimeISO,
                  cycloneElement.position.details.stormType,
                  cycloneElement.position.details.windSpeedKPH,
                );
                cyclone.saveCyclone();
              });
              resolve(response.data.response);
            }
          } else {
            resolve(response);
          }
        }).catch((err) => {
          resolve(err.response);
        });
    });
  },
};
