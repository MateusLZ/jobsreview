import express from "express";
import user from "./user.routes.js";
import login from "./login.routes.js";
import UserController from "../controllers/Usercontroller.js";
import GetVagas from "../controllers/VagasController.js";

const router = express.Router();

router.get("/vagas", GetVagas.index);

router.use("/user", user);
router.use("/login", login);

router.get("/user", UserController.index);
router.post("/user", UserController.store);

export default router;
