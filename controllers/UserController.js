import User from "../models/User.js";
import jwt from "jsonwebtoken";

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        reject(err);
      } else {
        resolve(authData);
      }
    });
  });
};

const UserController = {
  async index(req, res) {
    const token = req.headers["token"];

    try {
      const authData = await verifyToken(token);

      // Se chegou até aqui, o token foi verificado com sucesso
      const userId = authData.id;

      const user = await User.findByPk(userId, {
        attributes: ["id", "name", "email"], // Defina aqui os campos que deseja retornar
      });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      return res.json(user);
    } catch (err) {
      return res.sendStatus(403);
    }
  },

  async store(req, res) {
    const { name, email } = req.body;

    const user = await User.create({ name, email });

    return res.json(user);
  },
};

export default UserController;
