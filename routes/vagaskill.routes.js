import express from "express";
import VagaSkill from "../models/VagaSkill.js";
import Skill from "../models/Skill.js";

const vagaskill = express.Router();

vagaskill.get("/", (req, res) => {
  res.send("Rota de Habilidades");
});

vagaskill.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Procurar todas as habilidades do usuário com base no ID fornecido
    const vagaskills = await VagaSkill.findAll({
      where: {
        userId: userId,
      },
      include: [Skill],
    });

    return res.json({ vagaskills });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Erro ao buscar as habilidades do usuário",
    });
  }
});

vagaskill.get("/:vagaId/habilidades", async (req, res) => {
  const { vagaId } = req.params;

  try {
    // Procurar todas as habilidades da vaga com base no ID fornecido
    const vagaSkills = await VagaSkill.findAll({
      where: {
        vagaId: vagaId,
      },
      include: [Skill],
    });

    return res.json({ vagaSkills });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Erro ao buscar as habilidades da vaga",
    });
  }
});

vagaskill.post("/", async (req, res) => {
  const { idVaga, skillId, stars } = req.body;

  if (!idVaga || !skillId || stars === undefined) {
    return res.status(400).json({
      success: false,
      error: "UserId, skillId, and stars are required",
    });
  }

  try {
    // Verificar se já existe um registro com os mesmos valores de userId e skillId
    const existingUserSkill = await VagaSkill.findOne({
      where: {
        vagaId: idVaga,
        skillId: skillId,
      },
    });

    if (existingUserSkill) {
      // Se o registro já existe, atualizar o valor de stars
      existingUserSkill.stars = stars;
      await existingUserSkill.save();

      return res.json({ success: true, vagaSkill: existingUserSkill });
    } else {
      // Se o registro não existe, criar um novo registro na tabela UserSkill
      const newVagaSkill = await VagaSkill.create({
        vagaId: idVaga,
        skillId: skillId,
        stars: stars,
      });

      return res.json({ success: true, vagaSkill: newVagaSkill });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Erro ao criar/atualizar o registro na tabela UserSkill",
    });
  }
});

vagaskill.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Procurar o registro pelo ID fornecido
    const vagaSkill = await VagaSkill.findByPk(id);

    if (!vagaSkill) {
      return res.status(404).json({
        success: false,
        error: "Registro não encontrado",
      });
    }

    // Excluir o registro
    await vagaSkill.destroy();

    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Erro ao excluir o registro da tabela UserSkill",
    });
  }
});

export default vagaskill;
