import express from "express";
import Candidatura from "../models/Candidatura.js";
import Vaga from "../models/Vaga.js";
import User from "../models/User.js";

const candidatura = express.Router();

candidatura.get("/aplicacao/:idVaga/users", async (req, res) => {
  try {
    const { idVaga } = req.params;

    const candidaturas = await Candidatura.findAll({
      where: {
        idVaga,
      },
    });

    res.json(candidaturas);
  } catch (error) {
    console.error("Erro ao obter candidaturas da vaga:", error);
    res.status(500).json({ error: "Erro ao obter candidaturas da vaga" });
  }
});

candidatura.get("/:idUser/aplication", async (req, res) => {
  try {
    const { idUser } = req.params;

    const candidaturas = await Candidatura.findAll({
      where: {
        idUser,
      },
    });

    res.json(candidaturas);
  } catch (error) {
    console.error("Erro ao obter candidaturas da vaga:", error);
    res.status(500).json({ error: "Erro ao obter candidaturas da vaga" });
  }
});

candidatura.post("/apply", async (req, res) => {
  const { userId, vagaId } = req.body;

  try {
    const candidatura = await Candidatura.create({
      idUser: userId,
      idVaga: vagaId,
    });

    if (candidatura) {
      res.json({
        success: true,
        message: "Candidatura realizada com sucesso!",
      });
    }
  } catch (error) {
    console.error("Erro ao realizar a candidatura:", error);
    res
      .status(500)
      .json({ success: false, error: "Erro ao realizar a candidatura" });
  }
});

candidatura.get("/:idVaga/:idUser", async (req, res) => {
  try {
    const { idUser, idVaga } = req.params;
    console.log("ID do usuário:", idUser);
    console.log("ID da vaga:", idVaga);
    const candidatura = await Candidatura.findOne({
      where: {
        idUser,
        idVaga,
      },
    });

    if (candidatura) {
      res.json(candidatura);
    } else {
      res.json({ success: false, message: "Candidatura não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao obter candidatura:", error);
    res.status(500).json({ error: "Erro ao obter candidatura" });
  }
});

export default candidatura;
