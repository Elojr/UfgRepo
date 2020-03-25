import multer from 'multer';
import { randomBytes } from 'crypto';

import { resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'public', 'avatars'),
    filename: (req, file, cb) => {
      randomBytes(16, (err, res) => {
        if (err) return cb(err);

        const filename = `${res.toString('hex')}-${file.originalname}`;
        return cb(null, filename);
      });
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
  fileFilter: (req, file, cb) => {
    const mimeTypes = ['image/png', 'image/jpeg', 'image/gif'];

    if (mimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('O formato do arquivo não é aceito.'));
    }
  },
};
