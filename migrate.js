import connection from "./config/db.js";
import User from "./models/User.js";
import Vaga from "./models/Vaga.js";
import Review from "./models/Review.js";

const migrate = async () => {
  try {
    // Define as associações entre os modelos
    User.hasMany(Review);
    Vaga.hasMany(Review);
    Review.belongsTo(User);
    Review.belongsTo(Vaga);

    // Sincroniza os modelos com o banco de dados
    await connection.sync();

    console.log("Tabelas sincronizadas com sucesso.");
  } catch (error) {
    console.log(error);
  }
};

migrate();
