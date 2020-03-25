import multer from 'multer';
import MulterConfig from '../../config/multer';

const upload = multer(MulterConfig).single('avatar');

export default function uploadAvatar(req, res, next) {
  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ error: 'Erro ao fazer upload de arquivo.' });
    }
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    return next();
  });
}
