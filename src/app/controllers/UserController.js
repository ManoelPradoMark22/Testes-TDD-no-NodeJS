import User from '../models/User';

class UserController {
  /* o método store serve para criar um novo usuário */
  async store(req, res) {
    const user = await User.create(req.body);

    return res.json(user);
  }
}

export default new UserController();
