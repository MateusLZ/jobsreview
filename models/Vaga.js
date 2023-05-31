import { Sequelize } from "sequelize";
import connection from "../config/db.js";

const Vaga = connection.define("vaga", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  adress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Vaga;
