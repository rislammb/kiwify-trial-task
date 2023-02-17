import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Label from '../components/ui/Label';
import useForm from '../hooks/useForm';
import { validateEmail } from '../utils';

/**
 * Set initial item and value for form
 */
const initial = {
  email: '',
  repetirEmail: '',
  password: '',
  agreeWithTerms: false,
};

/**
 * Validate a form values
 * @param {object} values
 * @returns {{valid: boolean, errors: object}} validation info
 */
const validate = (values) => {
  const errors = {};

  Object.keys(values).forEach((key) => {
    if (!values[key]) {
      errors[key] = 'Esse campo é obrigatório';
    }

    if (key === 'email') {
      if (!validateEmail(values[key])) {
        errors[key] = 'O e-mail deve ser válido';
      }

      if (values[key] !== values['repetirEmail']) {
        errors['repetirEmail'] += '/' + 'Os dois e-mails devem ser iguais.';
      }
    } else if (key === 'repetirEmail') {
      if (values.email !== values[key]) {
        errors[key] += '/' + 'Os dois e-mails devem ser iguais.';
      }
    }
  });

  return { valid: Object.keys(errors).length === 0, errors };
};

const Signup = () => {
  const { state, handleChange, handleFocus, handleBlur, handleSubmit } =
    useForm(initial, validate);

  /**
   * Finally submit form values to API
   * @param {object} values
   */
  const submit = (values) => {
    alert('Submitted values are: ', values);
  };

  useEffect(() => {
    document.title = 'Cadastro';
  }, []);

  return (
    <div>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img
          src='/_nuxt/img/kiwify-green-logo.2af0e50.png'
          alt='Kiwify'
          className='mx-auto h-12 w-auto'
        />
        <h2 className='mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900'>
          Criar nova conta
        </h2>
        <p className='mt-2 text-center text-base leading-5 text-gray-600'>
          Ou{' '}
          <Link
            to={'/login'}
            className='font-medium text-indigo-600
            hover:text-indigo-500 focus:outline-none focus:underline transition
            ease-in-out duration-150'
          >
            entrar na sua conta existente
          </Link>
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <form
          onSubmit={(e) => handleSubmit(e, submit)}
          className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'
        >
          <div>
            <Label title={'Email'} htmlFor={'email'} styleClsss={'mb-1'} />
            <Input
              type={'text'}
              id={'email'}
              name={'email'}
              value={state.email.value}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              error={state.email.error}
            />

            {state.email.error && (
              <div>
                <div className={'text-xs text-red-500'}>
                  {state.email.error}
                </div>
              </div>
            )}
          </div>

          <div className='mt-6'>
            <Label
              title={'Repetir e-mail'}
              htmlFor={'repetirEmail'}
              styleClsss={'mb-1'}
            />
            <Input
              type={'email'}
              id={'repetirEmail'}
              value={state.repetirEmail.value}
              name={'repetirEmail'}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              error={state.repetirEmail.error}
            />

            {state.repetirEmail.error && (
              <div>
                {state.repetirEmail.error.split('/')[1] && (
                  <div className='text-xs text-red-500'>
                    {state.repetirEmail.error.split('/')[1]}
                  </div>
                )}
                {state.repetirEmail.error.split('/')[0] !== 'undefined' && (
                  <div className='text-xs text-red-500'>
                    {state.repetirEmail.error.split('/')[0]}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className='mt-6'>
            <Label title={'Senha'} htmlFor={'password'} styleClsss={'mb-1'} />
            <Input
              type={'password'}
              id={'password'}
              value={state.password.value}
              name={'password'}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              error={state.password.error}
              errorText={state.password.error}
            />
          </div>

          <div className='mt-6'>
            <label className='relative flex items-start mt-2'>
              <div className='flex items-center h-5'>
                <input
                  type='checkbox'
                  checked={state.agreeWithTerms.checked}
                  name={'agreeWithTerms'}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={`form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out cursor-pointer ${
                    state.agreeWithTerms.error ? 'border-red-500' : ''
                  }`}
                />
              </div>
              <div className='ml-2 text-sm leading-5'>
                <span className='font-medium text-gray-700'>
                  Eu li e aceito os{' '}
                  <a
                    href='https://kiwify.com.br/termos-de-uso'
                    target='_blank'
                    className='underline'
                  >
                    termos de uso
                  </a>
                  ,{' '}
                  <a
                    href='https://kiwify.com.br/licenca-de-uso-software'
                    target='_blank'
                    className='underline'
                  >
                    termos de licença de uso de software
                  </a>
                  ,{' '}
                  <a
                    href='https://kiwify.com.br/politica-de-conteudo'
                    target='_blank'
                    className='underline'
                  >
                    política de conteúdo
                  </a>{' '}
                  da Kiwify
                </span>
                {state.agreeWithTerms.error && (
                  <div className='text-red-500 border-b-0'>
                    ({state.agreeWithTerms.error})
                  </div>
                )}
              </div>
            </label>
          </div>

          <div className='mt-6'>
            <Button type={'submit'} text={'Criar conta'} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
