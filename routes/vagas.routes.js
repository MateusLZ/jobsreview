import express from "express";
import Vaga from "../models/Vaga.js";
import User from "../models/User.js";

const vaga = express.Router();

vaga.get("/", (req, res) => {
  res.send("Rota de Vagas");
});

vaga.post("/register", async (req, res) => {
  const { name, type, description, address } = req.body;

  const alreadyExistsVaga = await Vaga.findOne({
    where: { name },
  }).catch((err) => {
    console.log("Error: ", err);
  });

  if (alreadyExistsVaga) {
    return res.status(409).json({ message: "Vaga already registered!" });
  }

  const newVaga = new Vaga({ name, type, description, address });
  const savedVaga = await newVaga.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Sorry! Could not register the Vaga" });
  });

  if (savedVaga) res.json({ message: "New Vaga Registered!" });
});

vaga.get("/find", async (req, res) => {
  const Vagas = await Vaga.findAll().catch((err) => {
    console.log(err);
  });

  if (Vagas) {
    return res.json({ Vagas });
  } else {
    return null;
  }
});

vaga.get("/findByVaga", async (req, res) => {
  const idVaga = req.query.id;
  const vagas = await Vaga.findOne({
    where: {
      id: idVaga,
    },
  }).catch((err) => {
    console.log(err);
  });

  if (vagas) {
    return res.json({ vagas });
  } else {
    return null;
  }
});

export default vaga;
