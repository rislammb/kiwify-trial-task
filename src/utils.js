/**
 * Generate a unique id string
 * @returns {string} unique id
 */
export const generateId = () => {
  const v4 = () => {
    return Math.floor((1 + Math.random()) * 0x1000).toString(16);
  };
  return v4() + v4() + '-' + v4() + '-' + v4() + '-' + v4() + v4();
};

export const validateEmail = (mail) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }

  return false;
};

/**
 * Deeply clone a object and return fully new object
 * @param {object} obj
 * @returns {object} new object
 */
export const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

/**
 * Receive a object of input items with value and return state object
 * @param {object} obj
 * @returns {object} object for state
 */
export const mapFormInputsToState = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = {
      name: key,
      value: obj[key],
      error: '',
      touched: false,
      focused: false,
    };

    return acc;
  }, {});
};
