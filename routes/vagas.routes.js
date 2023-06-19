import express from "express";
import Vaga from "../models/Vaga.js";
import Recrutador from "../models/Recrutador.js";
import Candidatura from "../models/Candidatura.js";

const vaga = express.Router();

vaga.get("/", (req, res) => {
  res.send("Rota de Vagas");
});

vaga.post("/register", async (req, res) => {
  const { name, type, description, address, recrutadorId, empresa } = req.body;

  try {
    const newVaga = new Vaga({
      name,
      type,
      description,
      address,
      recrutadorId,
      empresa,
    });
    const savedVaga = await newVaga.save();

    if (savedVaga) {
      const vagaId = savedVaga.id; // Obtém o ID da vaga recém-criada

      res.json({ id: vagaId, message: "New Vaga Registered!" });
    }
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ error: "Sorry! Could not register the Vaga" });
  }
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

vaga.get("/:userId", async (req, res) => {
  console.log(req.params);
  const { userId } = req.params;

  console.log(userId);
  try {
    // Procurar todas as habilidades do usuário com base no ID fornecido
    const recrutadorVagas = await Vaga.findAll({
      where: {
        recrutadorId: userId,
      },
    });

    return res.json({ recrutadorVagas });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Erro ao buscar as habilidades do usuário",
    });
  }
});

vaga.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Procurar a vaga pelo ID fornecido
    const vaga = await Vaga.findOne({ where: { id } });

    if (!vaga) {
      return res.status(404).json({ error: "Vaga not found" });
    }

    // Excluir as candidaturas associadas à vaga
    await Candidatura.destroy({ where: { idVaga: vaga.id } });

    // Excluir a vaga
    await vaga.destroy();

    return res.json({ success: true, message: "Vaga deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to delete the Vaga" });
  }
});

export default vaga;
