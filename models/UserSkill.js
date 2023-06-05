import Sequelize from "sequelize";
import connection from "../config/db.js";
import User from "./User.js";
import Skill from "./Skill.js";

const UserSkill = connection.define("User_Skill", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "User",
      key: "id",
    },
  },
  skillId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "Skill",
      key: "id",
    },
  },
});

User.belongsToMany(Skill, {
  through: UserSkill,
  foreignKey: "userId",
});
Skill.belongsToMany(User, {
  through: UserSkill,
  foreignKey: "skillId",
});

export default UserSkill;
