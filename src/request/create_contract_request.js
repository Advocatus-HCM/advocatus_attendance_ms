import CONTRACT from "../constant/contract.js";
import USER from "../constant/user.js";

export const create_contract_request = {
  user_email: {
    isEmail: true,
    notEmpty: true,
  },
  duration: {
    isDecimal: true,
    optional: true,
  },
  type: {
    isString: true,
    isIn: { options: [CONTRACT.TYPES] },
    notEmpty: true,
  },
  salary: {
    isString: true,
    isDecimal: true,
    notEmpty: true,
  },
  start_date: {
    isDate: true,
    notEmpty: true,
    optional: true,
  },
  end_date: {
    isDate: true,
    notEmpty: true,
    optional: true,
  },
  probation_end_date: {
    isDate: true,
    notEmpty: true,
  },
  role: {
    isString: true,
    isIn: { options: [USER.ROLES] },
    notEmpty: true,
  },
};
