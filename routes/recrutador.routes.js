import express from "express";
import Recrutador from "../models/Recrutador.js";
import jwt from "jsonwebtoken";

const verifyToken = (token, res) => {
  jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({ authData });
    }
  });
};

const recrutador = express.Router();

recrutador.get("/", (req, res) => {
  const token = req.headers["token"];
  const authData = verifyToken(token, res);
});

recrutador.post("/editar", async (req, res) => {
  const { id, name, email, description } = req.body;

  const alreadyExistsUser = await Recrutador.findOne({
    where: { email },
  }).catch((err) => console.log("Error: ", err));

  if (alreadyExistsUser) {
    console.log("Usuário Existente: " + alreadyExistsUser);
    return res
      .status(409)
      .json({ message: "E-mail já utilizado por outro usuário." });
  }

  // Verifique se o usuário já existe pelo ID
  const recrutador = await Recrutador.findOne({ where: { id } }).catch((err) =>
    console.log("Error: ", err)
  );

  if (!recrutador) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }

  // Atualize os dados do usuário existente
  recrutador.name = name;
  recrutador.email = email;
  recrutador.descricao = description;

  const updatedRecrutador = await recrutador.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Não foi possível atualizar o usuário." });
  });

  if (updatedRecrutador) {
    console.log(updatedRecrutador);
    res.json({ message: "Usuário atualizado com sucesso!" });
  }
});

recrutador.post("/register", async (req, res) => {
  const { nome, email, senha, tipo_login } = req.body;

  const alreadyExistsRecrutador = await Recrutador.findOne({
    where: { email },
  }).catch((err) => console.log("Error: ", err));

  if (alreadyExistsRecrutador) {
    console.log("Usuário Existente: " + alreadyExistsRecrutador);
    return res
      .status(409)
      .json({ message: "E-mail já utilizado por outro usuário." });
  }

  const newRecrutador = new Recrutador({ nome, email, senha, tipo_login });

  const savedRecrutador = await newRecrutador.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Não foi posível cadastrar o usuário." });
  });

  if (savedRecrutador) {
    console.log(savedRecrutador);
    res.json({ message: "Obrigado pelo Cadastro!" });
  }
});

recrutador.get("/findByUser", async (req, res) => {
  const idUser = req.query.id;
  try {
    const recrutador = await Recrutador.findOne({
      where: {
        id: idUser,
      },
      attributes: ["nome", "email", "id"],
    });

    if (recrutador) {
      return res.json({ recrutador });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default recrutador;
