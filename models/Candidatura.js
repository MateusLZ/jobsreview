import { Sequelize } from "sequelize";
import connection from "../config/db.js";
import User from "./User.js";
import Vaga from "./Vaga.js";

const Candidatura = connection.define("candidatura", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  idUser: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  idVaga: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Vaga,
      key: "id",
    },
  },
});

Candidatura.belongsTo(Vaga, {
  foreignKey: "idVaga",
});

Candidatura.belongsTo(User, {
  foreignKey: "idUser",
});

export default Candidatura;
