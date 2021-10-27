
const mongoose = require('mongoose');
const db_config = require('../config/db_config.json')

const connectDB = async () => {
    try {
      await mongoose.connect(
        db_config.db_url_dev,
        {
          useNewUrlParser: true, 
          useUnifiedTopology: true
        }
      );
  
      console.log('DB connected successfully!');
    } catch (err) {
      console.error("DB connection error : ",err.message);
      process.exit(1);
    }
  };

  module.exports = connectDB