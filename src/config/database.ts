import mongoose from "mongoose";

import config from "../config";

const connection = mongoose.connect(config.database.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const con = mongoose.connection;
con.on("open", () => {
  console.log("Connected with database...");
});

export default connection;
