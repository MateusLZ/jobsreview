import { Sequelize } from "sequelize";
import connection from "../config/db.js";
import bcrypt from "bcrypt";

const Recrutador = connection.define(
  "recrutador",
  {
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
      validate: {
        isEmail: true,
      },
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
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    fotoPerfil: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (recrutador) => {
        if (recrutador.senha) {
          const salt = await bcrypt.genSaltSync(10);
          recrutador.senha = bcrypt.hashSync(recrutador.senha, salt);
        }
      },
      beforeUpdate: async (recrutador) => {
        if (recrutador.senha) {
          const salt = await bcrypt.genSaltSync(10);
          recrutador.senha = bcrypt.hashSync(recrutador.senha, salt);
        }
      },
    },
  }
);

export default Recrutador;
