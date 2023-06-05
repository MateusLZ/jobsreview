import Sequelize from "sequelize";
import connection from "../config/db.js";
import Vaga from "./Vaga.js";
import Skill from "./Skill.js";

const VagaSkill = connection.define("vaga_skill", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  vagaId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Vaga,
      key: "id",
    },
  },
  skillId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Skill,
      key: "id",
    },
  },
});

Vaga.belongsToMany(Skill, {
  through: VagaSkill,
  foreignKey: "vagaId",
});
Skill.belongsToMany(Vaga, {
  through: VagaSkill,
  foreignKey: "skillId",
});

export default VagaSkill;
