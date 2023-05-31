import Vaga from "../models/Vaga.js";

const GetVagas = {
  async index(req, res) {
    const users = await Vaga.findAll();

    return res.json(users);
  },

  async store(req, res) {
    const { name, email } = req.body;

    const user = await Vaga.create({ name, email });

    return res.json(user);
  },
};

export default GetVagas;
