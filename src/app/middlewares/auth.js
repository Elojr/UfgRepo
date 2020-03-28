import jwt from 'jsonwebtoken';

import authConfig from '../../config/authToken';

async function checkAuthToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: 'Autenticação requerida.' });
  }

  const token = authorization.split(' ')[1];
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
