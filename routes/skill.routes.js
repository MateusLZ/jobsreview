import express from "express";
import Skill from "../models/Skill.js";

const skill = express.Router();

skill.get("/", (req, res) => {
  res.send("Rota de Habilidades");
});

skill.get("/find", async (req, res) => {
  const Skills = await Skill.findAll().catch((err) => {
    console.log(err);
  });

  if (Skills) {
    return res.json({ Skills });
  } else {
    return null;
  }
});

skill.post("/compare", async (req, res) => {
  const { nome } = req.body;

  try {
    // Consultar a tabela de habilidades para encontrar a habilidade correspondente
    const skill = await Skill.findOne({ where: { name: nome } });

    if (skill) {
      // Retornar o ID da habilidade encontrada
      return res.json({ id: skill.id });
    } else {
      // Se a habilidade não for encontrada, retornar uma resposta adequada
      return res.status(404).json({ error: "Habilidade não encontrada" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default skill;
