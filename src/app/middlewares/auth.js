import jwt from 'jsonwebtoken';

import authConfig from '../../config/authToken';

async function checkAuthToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Autenticação requerida.' });
  }

  const { secret } = authConfig;

  try {
    const payload = jwt.verify(token, secret);
    req.userId = payload.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Autenticação inválida.' });
  }
}

export default checkAuthToken;
