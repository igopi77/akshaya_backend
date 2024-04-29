const mongoose = require("mongoose");

//mongoose.set('strictQuery', false);

const dbConnection = async () => {
    mongoose.connect(process.env.MONGOO).then(() => {
  console.log(`successfully connected`);
}).catch((e) => {
  console.log(`not connected`);
}); 
};

module.exports = dbConnection;
