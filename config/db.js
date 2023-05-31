import { Sequelize } from "sequelize";
import dotenv from "dotenv";

//Carregar as configurações

dotenv.config({ path: "./config/config.env" });

const connection = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export default connection;
