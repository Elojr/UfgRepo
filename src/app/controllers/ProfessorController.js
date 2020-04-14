import Professor from '../models/Professor';

import {
  validateProfessorData,
  validateUserUpdate,
  validateProfessorUpdate,
} from '../helpers/dataValidation';
import Professors from '../models/Professor';
import User from '../models/User';

class ProfessorController {
  async store(req, res) {
    await validateProfessorData(req.body);

    const { name, institute, email, description } = await Professors.create(
      req.body
    );

    return res.json({
      name,
      institute,
      email,
      description,
    });
  }

  async update(req, res) {
    const updateProfessor = await Professors.findOne({
      where: { name: req.body.name },
    });

    if (!updateProfessor) {
      return res.status(400).json({ error: 'Professor inexistente' });
    }

    await validateProfessorUpdate(req.body);

    const { name, institute, email, description } = await Professors.update(
      req.body
    );

    return res.body({
      name,
      institute,
      email,
      description,
    });
  }

  async delete(req, res) {
    const ProfessorTobeDeleted = await Professors.findByPk(req.professorId);
    await ProfessorTobeDeleted.destroy();
  }

  async get(req, res) {
    const Professor = await Professors.findOne({
      where: { name: req.body.name },
    });

    return res.json(Professor);
  }
}

export default new ProfessorController();
