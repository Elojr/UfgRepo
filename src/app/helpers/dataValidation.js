import * as Yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export async function validateUserData(data) {
  const schema = Yup.object().shape({
    name: Yup.string()
      .max(50, 'O nome não deve ter mais do que 50 caracteres.')
      .required('O campo nome é obrigatório.'),
    email: Yup.string()
      .email('O e-mail deve ser válido.')
      .required('O campo e-mail é obrigatório'),
    password: Yup.string()
      .required('O campo senha é obrigatório.')
      .min(8, 'A senha deve ter no mínimo 8 caracteres'),
    passwordConfirm: Yup.string()
      .min(8)
      .required('A confirmação de senha é obrigatória.')
      .oneOf(
        [Yup.ref('password')],
        'A confirmação de senha deve ser igual à senha.'
      ),
    description: Yup.string().max(
      300,
      'A descrição deve ter no máximo 300 caracteres'
    ),
    course: Yup.string()
      .required('O curso é obrigatório')
      .max(25, 'O curso não deve ter mais do que 25 caracteres.'),
    birthday: Yup.date().required('A data de nascimento é obrigatória'),
    avatar_id: Yup.number('Campo foto de perfil inválido').integer(
      'Campo foto de perfil inválido'
    ),
  });

  return schema.validate(data);
}

export async function validateUserUpdate(data) {
  const schema = Yup.object().shape({
    name: Yup.string().max(
      50,
      'O nome não deve ter mais do que 50 caracteres.'
    ),
    email: Yup.string().email('O e-mail deve ser válido.'),
    password: Yup.string().min(
      8,
      'Sua nova senha deve ter no mínimo 8 caracteres'
    ),
    description: Yup.string().max(
      300,
      'A descrição deve ter no máximo 300 caracteres'
    ),
    course: Yup.string().max(
      25,
      'O curso não deve ter mais do que 25 caracteres.'
    ),
    birthday: Yup.date(),
    passwordConfirm: Yup.string()
      .min(8)
      .oneOf(
        [Yup.ref('password')],
        'A confirmação de senha deve ser igual à senha.'
      )
      .when('password', (password, schemaField) => {
        return password
          ? schemaField.required('A confirmação de senha é obrigatória.')
          : schemaField;
      }),
    oldPassword: Yup.string().when(
      ['password', 'email'],
      (password, email, schemaField) => {
        if (password || email) {
          return schemaField.required('A senha atual é obrigatória.');
        }
        return schemaField;
      }
    ),
    avatar_id: Yup.number('Campo foto de perfil inválido.').integer(
      'Campo foto de perfil inválido.'
    ),
  });
  return schema.validate(data);
}
