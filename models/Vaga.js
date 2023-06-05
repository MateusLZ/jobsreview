import Sequelize from "sequelize";
import connection from "../config/db.js";
import Recrutador from "./Recrutador.js";

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
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  recrutadorId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "recrutador",
      key: "id",
    },
  },
});

Vaga.belongsTo(Recrutador, { foreignKey: "recrutadorId" });

export default Vaga;
