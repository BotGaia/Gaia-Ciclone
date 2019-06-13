const axios = require('axios');
const Cyclone = require('../models/CycloneModel');
const readCyclones = require('../utils/readCyclonesUtil');
const treatCycloneDetails = require('../utils/treatCycloneDetailsUtil');


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
            }
            await readCyclones.deleteAllCyclones();
            response.data.response.forEach((cycloneElement) => {
              const cyclone = new Cyclone(
                cycloneElement.profile.name,
                treatCycloneDetails.treatBasin(cycloneElement.profile.basinOrigin),
                treatCycloneDetails.treatBasin(cycloneElement.profile.basinCurrent),
                cycloneElement.profile.lifespan.startDateTimeISO,
                cycloneElement.profile.lifespan.endDateTimeISO,
                treatCycloneDetails.treatStormType(cycloneElement.position.details.stormType),
                cycloneElement.position.details.windSpeedKPH / 3.6,
              );
              cyclone.saveCyclone();
            });
            resolve(response.data);
          } else {
            resolve(response.data);
          }
        }).catch((err) => {
          resolve(err.response);
        });
    });
  },
};
