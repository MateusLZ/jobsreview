import express from "express";
import UserSkill from "../models/UserSkill.js";
import Skill from "../models/Skill.js";

const userskill = express.Router();

userskill.get("/", (req, res) => {
  res.send("Rota de Habilidades");
});

userskill.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Procurar todas as habilidades do usuário com base no ID fornecido
    const userSkills = await UserSkill.findAll({
      where: {
        userId: userId,
      },
      include: [Skill],
    });

    return res.json({ userSkills });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Erro ao buscar as habilidades do usuário",
    });
  }
});

userskill.get("/find", async (req, res) => {
  const UserSkills = await UserSkill.findAll().catch((err) => {
    console.log(err);
  });

  if (UserSkills) {
    return res.json({ UserSkills });
  } else {
    return null;
  }
});

userskill.post("/", async (req, res) => {
  const { userId, skillId, stars } = req.body;

  if (!userId || !skillId || stars === undefined) {
    return res.status(400).json({
      success: false,
      error: "UserId, skillId, and stars are required",
    });
  }

  try {
    // Verificar se já existe um registro com os mesmos valores de userId e skillId
    const existingUserSkill = await UserSkill.findOne({
      where: {
        userId: userId,
        skillId: skillId,
      },
    });

    if (existingUserSkill) {
      // Se o registro já existe, atualizar o valor de stars
      existingUserSkill.stars = stars;
      await existingUserSkill.save();

      return res.json({ success: true, userSkill: existingUserSkill });
    } else {
      // Se o registro não existe, criar um novo registro na tabela UserSkill
      const newUserSkill = await UserSkill.create({
        userId: userId,
        skillId: skillId,
        stars: stars,
      });

      return res.json({ success: true, userSkill: newUserSkill });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Erro ao criar/atualizar o registro na tabela UserSkill",
    });
  }
});

export default userskill;
