import * as dotenv from "dotenv";

dotenv.config();

const config = {
  app: {
    port: process.env.PORT || 5000,
  },
  database: {
    url: process.env.DATABASE_URL || "mongodb://localhost/eFarm",
    options: { useNewUrlParser: true },
  },
};

export default config;
