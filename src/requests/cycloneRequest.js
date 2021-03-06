const axios = require('axios');
const Cyclone = require('../models/CycloneModel');
const cycloneReading = require('../utils/readCyclonesUtil');
const treatCycloneDetails = require('../utils/treatCycloneDetailsUtil');
const alert = require('../utils/treatCycloneAlertUtil');


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
            await cycloneReading.deleteAllCyclones();
            if (Array.isArray(response.data.response)) {
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
                resolve(cyclone.saveCyclone());
              });
            }
          }
        }).catch((err) => {
          resolve(err.response);
        });
    });
  },

  sendNotifications: async () => {
    const cyclones = await cycloneReading.readCyclones();
    const users = await alert.getAllCycloneAlerts();

    return new Promise((resolve) => {
      if (cyclones.length > 0 && users.length > 0) {
        const URL = global.URL_GATEWAY;
        const params = {
          users,
          cyclones,
        };

        axios.post(URL, params).then((response) => {
          resolve(response);
        }).catch((err) => {
          resolve(err);
        });
      } else {
        resolve('No notifications to be sent.');
      }
    });
  },
};
