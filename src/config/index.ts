import dotenv from "dotenv";

const config = dotenv.config();
export const CONFIG = {
  MONGO_URI: config.parsed.MONGO_URI,
  PORT: parseInt(config.parsed.PORT || "8080"),
  DB_NAME: config.parsed.DB_NAME,
};
