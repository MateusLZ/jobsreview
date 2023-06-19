import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";

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

const user = express.Router();

user.get("/", async (req, res) => {
  const token = req.headers["token"];
  try {
    const authData = await verifyToken(token);
    res.json({ authData });
  } catch (error) {
    res.sendStatus(403);
  }
});

user.post("/editar", async (req, res) => {
  const { name, email, description, tag, id } = req.body;
  const photoId = req.file ? req.file.filename : null;

  // Verifique se o usuário já existe pelo ID
  const user = await User.findOne({ where: { id } }).catch((err) =>
    console.log("Error: ", err)
  );

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }

  // Verifique se o usuário está tentando alterar seu próprio e-mail
  if (user.email !== email) {
    const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
      (err) => console.log("Error: ", err)
    );

    if (alreadyExistsUser) {
      console.log("Usuário Existente: " + alreadyExistsUser);
      return res
        .status(409)
        .json({ message: "E-mail já utilizado por outro usuário." });
    }
  }

  // Atualize os dados do usuário existente
  user.name = name;
  user.email = email;
  user.description = description;
  user.tag = tag;

  const updatedUser = await user.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Não foi possível atualizar o usuário." });
  });

  if (updatedUser) {
    console.log(updatedUser);
    res.json({ message: "Usuário atualizado com sucesso!" });
  }
});

user.post("/register", async (req, res) => {
  const { name, email, password, tipo_login } = req.body;

  const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
    (err) => console.log("Error: ", err)
  );

  if (alreadyExistsUser) {
    console.log("Usuário Existente: " + alreadyExistsUser);
    return res
      .status(409)
      .json({ message: "E-mail já utilizado por outro usuário." });
  }

  const newUser = new User({ name, email, password, tipo_login });

  const savedUser = await newUser.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Não foi posível cadastrar o usuário." });
  });

  if (savedUser) {
    console.log(savedUser);
    res.json({ message: "Obrigado pelo Cadastro!" });
  }
});

user.get("/findByUser", async (req, res) => {
  const idUser = req.query.id;
  try {
    const user = await User.findOne({
      where: {
        id: idUser,
      },
      attributes: ["name", "description", "email", "tag", "id"],
    });

    if (user) {
      return res.json({ user });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

user.get("/find", async (req, res) => {
  const Users = await User.findAll().catch((err) => {
    console.log(err);
  });

  if (Users) {
    return res.json({ Users });
  } else {
    return null;
  }
});

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Pasta onde os arquivos serão armazenados
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName); // Define o nome do arquivo
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 }, // Limite de tamanho do arquivo (opcional)
});

export default user;
