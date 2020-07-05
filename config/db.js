const mogoose = require("mongoose");

require("dotenv").config({ path: "variables.env" });

const conectDb = async () => {
  try {
    await mogoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("DB conect");
  } catch (error) {
    console.log(error);
    process.exit(1); //detener la app
  }
};

module.exports = conectDb;
