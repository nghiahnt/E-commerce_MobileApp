const mongoose = require('mongoose');

const connection = () => {
    mongoose
      .connect(
        "mongodb+srv://trongnghia:root@cluster0.byi93hs.mongodb.net/?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => {
        console.log("Connected to Mongoose");
      })
      .catch((err) => {
        console.log(err);
      });
}

module.exports = connection;