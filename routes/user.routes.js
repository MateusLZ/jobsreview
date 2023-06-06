import express from "express";
import User from "../models/User.js";
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

const user = express.Router();

user.get("/", (req, res) => {
  const token = req.headers["token"];
  const authData = verifyToken(token, res);
});

user.post("/register", async (req, res) => {
  const { name, email, password, admin } = req.body;

  const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
    (err) => console.log("Error: ", err)
  );

  if (alreadyExistsUser) {
    console.log("Usuário Existente: " + alreadyExistsUser);
    return res
      .status(409)
      .json({ message: "E-mail já utilizado por outro usuário." });
  }

  const newUser = new User({ name, email, password, admin });

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
      attributes: ["name", "description"],
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

export default user;
