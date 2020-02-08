const mongoose = require('mongoose');
const MONGODB_URI = proces.env.MONGODB_URI || 'mongodb://localhost:27017/log-and-roi';

mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
  .then(() => console.log(`Connected to Mongo! Database name: "${MONGODB_URI}"`))
  .catch(error => console.error('Error connecting to mongo', error));