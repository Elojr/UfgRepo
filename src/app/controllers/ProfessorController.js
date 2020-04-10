import Professor from '../models/Professor';

import {
  validateProfessorData,
  validateUserUpdate,
} from '../helpers/dataValidation';

class ProfessorController {
  async store(req, res) {
    await validateProfessorData(req.body);

    // devo fazer a validação se já existe o professor? pq lembro que a gente deixaria a pessoa cadastrar
    // e teria um get para auto complete

    const { id } = await Professor.create(res.body);
  }
  async update(req, res) {
    const { professorId } = req;
  }
  async delete(req, res) {}
  async get(req, res) {}
}

export default new ProfessorController();
