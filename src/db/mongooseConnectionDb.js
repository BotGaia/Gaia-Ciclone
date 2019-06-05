const mongoose = require('mongoose');

module.exports = {
  connect: () => {
    mongoose.Promise = global.Promise;
    const options = {
      keepAlive: true,
      socketTimeoutMS: 540000,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      autoIndex: false,
      reconnectInterval: 500,
      poolSize: 10,
      bufferMaxEntries: 0,
      useNewUrlParser: true,
    };

    if (process.env.ENVIRONMENT === 'dev') {
      mongoose.connect('mongodb://mongo:27017/gaiaciclone', options);
    } else if (process.env.ENVIRONMENT === 'homolog') {
      // mongoose.connect(`mongodb://${process.env.USER_DB}:${process.env.PASS_DB}@35.225.250.253/${process.env.DB}`,
      // { useNewUrlParser: true });
    } else if (process.env.ENVIRONMENT === 'production') {
      // mongoose.connect(`mongodb://${process.env.USER_DB}:${process.env.PASS_DB}@35.222.146.138/${process.env.DB}`,
      // { useNewUrlParser: true });
    }
  },
};