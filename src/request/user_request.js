export const user_request = {
  name: {
    isString: true,
    errorMessage: 'name is string required field'
  },
  last_name: {
    optional: true,
    isString: true
  },
  role: {
    isString: true
  },
  profession: {
    isString: true
  }
};
