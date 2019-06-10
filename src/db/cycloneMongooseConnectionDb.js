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
      mongoose.connect('mongodb://mongociclone:27018/gaiaciclone', options).then().catch();
    } else if (process.env.ENVIRONMENT === 'homolog') {
      mongoose.connect(`mongodb://${process.env.USER_DB}:${process.env.PASS_DB}@35.194.47.205/${process.env.DB}`,
        { useNewUrlParser: true });
    } else if (process.env.ENVIRONMENT === 'production') {
      mongoose.connect(`mongodb://${process.env.USER_DB}:${process.env.PASS_DB}@35.226.43.230/${process.env.DB}`,
        { useNewUrlParser: true });
    }
  },
};
