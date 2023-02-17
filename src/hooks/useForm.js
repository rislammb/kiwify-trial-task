import { useState } from 'react';
import { deepClone, mapFormInputsToState } from '../utils';

/**
 * @callback validateCallback
 * @param {object} values
 * @returns {{valid: boolean, errors: object}} validation info
 */

/**
 * Receive initial input values for a form and return state and other functionalities
 * @param {object} initial
 * @param {validateCallback} validate
 * @returns {object} state and other functionalities for form
 */
const useForm = (initial, validate) => {
  const [state, setState] = useState(mapFormInputsToState(initial));

  /**
   * Receive a state object and return object with value
   * @param {object} state
   * @returns {object} values
   */
  const mapFormStateToValues = (state) => {
    return Object.keys(state).reduce((acc, key) => {
      acc[key] =
        typeof state[key].value === 'string'
          ? state[key].value.trim()
          : state[key].value;

      return acc;
    }, {});
  };

  /**
   * Change handler for input field
   * @param {object} e
   */
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const oldState = deepClone(state);

    oldState[name].error = '';
    if (type === 'checkbox') {
      oldState[name].value = checked;
    } else {
      oldState[name].value = value;
    }

    const { errors } = validate(mapFormStateToValues(oldState));
    if (errors[name] && oldState[name].touched) {
      oldState[name].error = errors[name];
    }

    setState(oldState);
  };

  /**
   * Focus handler for input field
   * @param {object} e
   */
  const handleFocus = (e) => {
    const { name } = e.target;
    const oldState = deepClone(state);

    oldState[name].touched = true;
    oldState[name].focused = true;

    setState(oldState);
  };

  /**
   * Blur handler for input field
   * @param {object} e
   */
  const handleBlur = (e) => {
    const { name } = e.target;
    const oldState = deepClone(state);

    oldState[name].focused = false;
    const { errors } = validate(mapFormStateToValues(oldState));
    if (errors[name] && oldState[name].touched) {
      oldState[name].error = errors[name];
    }

    setState(oldState);
  };

  /**
   * @callback submitCallback
   * @param {object} values
   */

  /**
   * Submit handler for a form
   * @param {object} e
   * @param {submitCallback} cb
   */
  const handleSubmit = (e, cb) => {
    e.preventDefault();
    const oldState = deepClone(state);

    const values = mapFormStateToValues(oldState);
    const { valid, errors } = validate(values);

    if (valid) {
      cb(values);
    } else {
      Object.keys(errors).forEach((key) => {
        oldState[key].error = errors[key];
      });

      setState(oldState);
    }
  };

  return { state, handleChange, handleFocus, handleBlur, handleSubmit };
};

export default useForm;
