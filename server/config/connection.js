const mongoose = require('mongoose');
require('dotenv').config();
const atlasPassWD = process.env.ATLAS_PASSWD;

mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://eschase4:${atlasPassWD}@cluster0.ptwwxd7.mongodb.net/googlebooks`);

module.exports = mongoose.connection;
