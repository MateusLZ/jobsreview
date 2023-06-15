import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import Recrutador from "../models/Recrutador.js";

const login = express.Router();

login.post("/", async (req, res) => {
  // Recebe as informações de LOGIN
  const { email, password } = req.body;
  // Buscar EMAIL no BD, se existente, e armazenar
  const registeredUser = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  const registeredRecrutador = await Recrutador.findOne({
    where: { email },
  }).catch((err) => {
    console.log("Error: ", err);
  });
  // Caso EMAIL inexistente, informar o usuário
  if (!registeredUser && !registeredRecrutador) {
    return res.status(400).json({ message: "Email ou Senha Inválidos. " });
  }

  // Caso seja um usuário normal
  if (registeredUser) {
    // Verificar a SENHA do usuário
    if (!bcrypt.compareSync(password, registeredUser.password)) {
      return res.status(400).json({ message: "Email ou Senha Inválidos!." });
    }

    // Gerar TOKEN de acesso
    const token = jwt.sign(
      // Payload: o que será armazenado no TOKEN
      {
        id: registeredUser.id,
        name: registeredUser.name,
        tipo_login: registeredUser.tipo_login,
      },
      // Secret or Private Key
      process.env.JWT_SECRET,
      // Options
      {
        expiresIn: "1h",
      }
    );

    // Enviar confirmação de LOGIN e o TOKEN para uso.
    return res.json({
      message: "Bem-Vindo",
      token: token,
    });
  }

  // Caso seja um recrutador
  if (registeredRecrutador) {
    if (!bcrypt.compareSync(password, registeredRecrutador.senha)) {
      return res.status(400).json({
        message: "Email ou Senha Inválidos!.",
      });
    }

    // Gerar TOKEN de acesso
    const token = jwt.sign(
      // Payload: o que será armazenado no TOKEN
      {
        id: registeredRecrutador.id,
        name: registeredRecrutador.nome,
        tipo_login: registeredRecrutador.tipo_login,
      },
      // Secret or Private Key
      process.env.JWT_SECRET,
      // Options
      {
        expiresIn: "1h",
      }
    );

    // Enviar confirmação de LOGIN e o TOKEN para uso.
    return res.json({
      message: "Bem-Vindo",
      token: token,
    });
  }
});

export default login;
