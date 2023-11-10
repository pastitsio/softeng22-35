const mongoose = require('mongoose');

const connect = async (URI) => {
  try {
    mongoose.set('strictQuery', true);
    mongoose
      .connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    return "Connection to DB successfull...";
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = { connect };