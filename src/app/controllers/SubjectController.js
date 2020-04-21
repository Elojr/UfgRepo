import Subject from '../models/Subject';

import { validateSubjectData } from '../helpers/dataValidation';

class SubjectController {
  async store(req, res) {
    try {
      await validateSubjectData(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const subjectFound = await Subject.findOne({
        where: { name: req.body.name },
      });

      if (subjectFound) {
        return res.status(400).json({ error: 'A matéria já foi cadastrada.' });
      }

      const { id, name, institute } = await Subject.create(req.body);

      return res.json({
        id,
        name,
        institute,
      });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao cadastrar a matéria.' });
    }
  }

  async update(req, res) {
    const { subjectId } = req;
    try {
      await validateSubjectData(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const { name } = req.body;

    try {
      const { subjectFound } = await Subject.findByPk(subjectId);

      if (!subjectFound) {
        return res.status(400).json({ error: 'Matéria sem cadastro.' });
      }

      // eslint-disable-next-line eqeqeq
      if (name != subjectFound.name) {
        const newSubjectInvalid = await Subject.findOne({
          where: { name },
        });

        if (newSubjectInvalid) {
          return res.status(400).json({ error: 'Matéria já cadastrada.' });
        }
      }

      const { id, name: newName, institute } = await subjectFound.update(
        req.body
      );

      return res.json({
        id,
        name: newName,
        institute,
      });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao atualizar a matéria.' });
    }
  }

  async delete(req, res) {
    // condição para exclusão é ser administrador
    // if...

    const { id, name } = req.params;

    try {
      const subjectToBeDeleted = await Subject.findByPk(id);
      if (!subjectToBeDeleted) {
        return res.status(400).json({ error: 'Matéria não encontrada.' });
      }

      await subjectToBeDeleted.destroy();

      return res.json({ id, name });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao deletar o usuário.' });
    }
  }
}

export default new SubjectController();
