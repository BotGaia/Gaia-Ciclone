const axios = require('axios');
const Cyclone = require('../models/CycloneModel');
const readCyclones = require('../utils/readCyclonesUtil');


module.exports = {
  getAllCyclones: () => {
    const params = {
      client_id: process.env.CYCLONE_ID,
      client_secret: process.env.CYCLONE_SECRET,
      filter: 'all',
      format: 'json',
    };

    return new Promise((resolve) => {
      axios.get('https://api.aerisapi.com/tropicalcyclones', { params })
        .then(async (response) => {
          if (response.data.success) {
            if (response.data.error) {
              resolve(response);
            } else if (response.data.response.isArray) {
              await readCyclones.deleteAllCyclones();
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
              resolve(response.data);
            } else {
              await readCyclones.deleteAllCyclones();
              const cyclone = new Cyclone(
                response.data.response.profile.name,
                response.data.response.profile.basinCurrent,
                response.data.response.profile.lifespan.startDateTimeISO,
                response.data.response.profile.lifespan.endDateTimeISO,
                response.data.response.position.details.stormType,
                response.data.response.position.details.windSpeedKPH,
              );
              cyclone.saveCyclone();
            }
          } else {
            resolve(response.data);
          }
        }).catch((err) => {
          resolve(err.response);
        });
    });
  },
};
