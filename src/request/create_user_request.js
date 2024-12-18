import USER from "../constant/user.js";

export const create_user_request = {
  name: {
    isString: true,
    errorMessage: "name is string required field",
    notEmpty: true,
  },
  last_name: {
    optional: true,
    isString: true,
  },
  email: {
    isEmail: true,
    notEmpty: true,
  },
  phone_number: {
    isMobilePhone: true,
    notEmpty: true,
  },
  profession: {
    isString: true,
    errorMessage: "profession is string required field",
    notEmpty: true,
  },
  superior: {
    optional: true,
    isString: true,
    notEmpty: true,
  },
  team: {
    optional: true,
    isString: true,
    notEmpty: true,
  },
  role: {
    isString: true,
    isIn: { options: [USER.ROLES] },
    notEmpty: true,
  }
};
