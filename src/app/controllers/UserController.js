import User from '../models/User';

import { userDataValidation } from '../helpers/dataValidation';

class UserController {
  async store(req, res) {
    try {
      await userDataValidation(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const user = await User.findOne({ where: { email: req.body.email } });

    if (user) {
      return res.status(400).json({ error: 'O usuário já existe.' });
    }

    try {
      const {
        id,
        name,
        email,
        description,
        birthday,
        course,
      } = await User.create(req.body);

      return res.json({
        id,
        name,
        email,
        description,
        birthday,
        course,
      });
    } catch (err) {
      if (err.name === 'SequelizeForeignKeyConstraintError') {
        return res
          .status(500)
          .json({ error: 'O avatar informado não existe.' });
      }

      return res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
  }
}

export default new UserController();
