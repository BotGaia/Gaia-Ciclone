const axios = require('axios');
const Cyclone = require('../models/CycloneModel');
const readCyclones = require('../utils/readCyclonesUtil');
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
            if (response.data.error) {
              resolve(response);
            } else if (response.data.response.isArray) {
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
              await readCyclones.deleteAllCyclones();
              const cyclone = new Cyclone(
                response.data.response.profile.name,
                treatCycloneDetails.treatBasin(response.data.response.profile.basinOrigin),
                treatCycloneDetails.treatBasin(response.data.response.profile.basinCurrent),
                response.data.response.profile.lifespan.startDateTimeISO,
                response.data.response.profile.lifespan.endDateTimeISO,
                treatCycloneDetails.treatStormType(
                  response.data.response.position.details.stormType,
                ),
                response.data.response.position.details.windSpeedKPH / 3.6,
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

  sendNotifications: async () => {
    const cyclones = await readCyclones.readCyclones();
    const users = await alert.getAllCycloneAlerts();

    return new Promise((resolve) => {
      if (cyclones[0] && users[0]) {
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
      }

      resolve('No notifications to be sent.');
    });
  },
};
