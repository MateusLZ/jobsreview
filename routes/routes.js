import express from "express";
import user from "./user.routes.js";
import login from "./login.routes.js";
import vaga from "./vagas.routes.js";
import skill from "./skill.routes.js";
import userskill from "./userskill.routes.js";
import recrutador from "./recrutador.routes.js";
import vagaskill from "./vagaskill.routes.js";
import candidatura from "./candidatura.routes.js";

const router = express.Router();

router.use("/candidatura", candidatura);
router.use("/vagaskill", vagaskill);
router.use("/userskill", userskill);
router.use("/recrutador", recrutador);
router.use("/skill", skill);
router.use("/user", user);
router.use("/login", login);
router.use("/vaga", vaga);

export default router;
