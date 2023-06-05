// import connection from "./config/db.js";
// import User from "./models/User.js";
// import Vaga from "./models/Vaga.js";
// import Review from "./models/Review.js";

// const migrate = async () => {
//   try {
//     // Define as associações entre os modelos
//     User.hasMany(Review);
//     Vaga.hasMany(Review);
//     Review.belongsTo(User);
//     Review.belongsTo(Vaga);

//     // Sincroniza os modelos com o banco de dados
//     await connection.sync();

//     console.log("Tabelas sincronizadas com sucesso.");
//   } catch (error) {
//     console.log(error);
//   }
// };

// migrate();

import connection from "./config/db.js";
import User from "./models/User.js";
import Vaga from "./models/Vaga.js";
import Candidatura from "./models/Candidatura.js";
import Skill from "./models/Skill.js";
import UserSkill from "./models/UserSkill.js";
import VagaSkill from "./models/VagaSkill.js";
import Recrutador from "./models/Recrutador.js";

const migrate = async () => {
  try {
    // Define as associações entre os modelos

    User.belongsToMany(Skill, { through: UserSkill });
    Skill.belongsToMany(User, { through: UserSkill });

    Vaga.belongsToMany(Skill, { through: VagaSkill });
    Skill.belongsToMany(Vaga, { through: VagaSkill });

    User.belongsToMany(Vaga, { through: Candidatura });
    Vaga.belongsToMany(User, { through: Candidatura });

    Vaga.belongsTo(Recrutador, { foreignKey: "recrutadorId" });
    Recrutador.hasMany(Vaga, { foreignKey: "recrutadorId" });

    // Sincroniza os modelos com o banco de dados
    await connection.sync();

    console.log("Tabelas sincronizadas com sucesso.");
  } catch (error) {
    console.log(error);
  }
};

migrate();
