import { Sequelize } from "sequelize";
import connection from "../config/db.js";

const Recrutador = connection.define("recrutador", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  tipo_login: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  fotoPerfil: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default Recrutador;
