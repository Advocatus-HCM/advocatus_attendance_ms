import USER from "../constant/user.js";

export const update_user_request = {
  name: {
    optional: true,
    isString: true,
    errorMessage: "name is string required field",
    notEmpty: true,
  },
  last_name: {
    optional: true,
    isString: true,
  },
  email: {
    optional: true,
    isEmail: true,
    notEmpty: true,
  },
  phone_number: {
    optional: true,
    isMobilePhone: true,
    notEmpty: true,
  },
  profession: {
    optional: true,
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
    optional: true,
    isString: true,
    isIn: { options: [USER.ROLES] },
    notEmpty: true,
  },
};
