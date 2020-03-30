import jwt from 'jsonwebtoken';

import authConfig from '../../config/authToken';
import User from '../models/User';

class LoginController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Usuário não econtrado.' });
    }

    if (!(await user.validatePassword(password))) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    const { id, name } = user;
    const { secret, expiresIn } = authConfig;

    const token = jwt.sign({ id, name, email }, secret, { expiresIn });

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token,
    });
  }
}

export default new LoginController();
