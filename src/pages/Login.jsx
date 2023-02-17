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
  password: '',
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
    }
  });

  return { valid: Object.keys(errors).length === 0, errors };
};

const Login = () => {
  const { state, handleChange, handleFocus, handleBlur, handleSubmit } =
    useForm(initial, validate);

  /**
   * Finally submit form values to API
   * @param {object} values
   */
  const submit = (values) => {
    console.log('Submitted values are: ', values);
  };

  useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <div>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img
          src='/_nuxt/img/kiwify-green-logo.2af0e50.png'
          alt='Workflow'
          className='mx-auto h-12 w-auto'
        />
        <h2 className='mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900'>
          Entrar na sua conta
        </h2>
        <p className='mt-2 text-center text-base leading-5 text-gray-600'>
          Ou{' '}
          <Link
            to={'/signup?redirect'}
            className='font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150'
          >
            fazer cadastro
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
              autocomplete='username'
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
            <Label title={'Senha'} htmlFor={'password'} />
            <Input
              type={'password'}
              autocomplete='current-password'
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

          <div className='mt-2 flex items-center justify-end'>
            <div className='text-sm leading-5'>
              <Link
                to={'https://dashboard.kiwify.com.br/ResetPassword'}
                className='font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150'
              >
                Esqueceu a senha?
              </Link>
            </div>
          </div>
          <div className='mt-6'>
            <Button type={'submit'} text={'Entrar'} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
