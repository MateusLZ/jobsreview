import { Sequelize } from "sequelize";
import connection from "../config/db.js";
import User from "./User.js";
import Vaga from "./Vaga.js";

const Review = connection.define("review", {
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
      model: "users",
      key: "id",
    },
  },
  idRestaurant: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "Vaga",
      key: "id",
    },
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  stars: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Review.belongsTo(Vaga, {
  foreignKey: "idRestaurant",
});

Review.belongsTo(User, {
  foreignKey: "idUser",
});
export default Review;
