import Avatar from '../models/Avatar';

class AvatarController {
  async store(req, res) {
    const { filename, originalname, size } = req.file;

    try {
      const file = await Avatar.create({
        filename,
        originalname,
        size,
      });

      return res.json(file);
    } catch (err) {
      console.log('Error while saving file:', err);
      return res.status(500).json({ error: 'Erro ao salvar arquivo ' });
    }
  }
}

export default new AvatarController();
