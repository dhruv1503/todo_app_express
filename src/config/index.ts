import dotenv from "dotenv";

const config = dotenv.config();
export const CONFIG = {
  MONGO_URI: process.env.MONGO_URI || "",
  PORT: parseInt(process.env.PORT || "8080"),
  DB_NAME: process.env.DB_NAME,
};
