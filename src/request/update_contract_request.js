import CONTRACT from "../constant/contract.js";
import USER from "../constant/user.js";

export const update_contract_request = {
  user_email: {
    isEmail: true,
    notEmpty: true,
    optional: true,
  },
  duration: {
    isDecimal: true,
    optional: true,
  },
  type: {
    isString: true,
    isIn: { options: [CONTRACT.TYPES] },
    notEmpty: true,
    optional: true,
  },
  salary: {
    isString: true,
    isDecimal: true,
    notEmpty: true,
    optional: true,
  },
  start_date: {
    isDate: true,
    notEmpty: true,
    optional: true,
    optional: true,
  },
  end_date: {
    isDate: true,
    notEmpty: true,
    optional: true,
    optional: true,
  },
  probation_end_date: {
    isDate: true,
    notEmpty: true,
    optional: true,
  },
  role: {
    isString: true,
    isIn: { options: [USER.ROLES] },
    notEmpty: true,
    optional: true,
  },
};
