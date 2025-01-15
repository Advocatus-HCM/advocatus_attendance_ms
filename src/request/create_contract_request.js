import CONTRACT from "../constant/contract.js";
import USER from "../constant/user.js";

export const create_contract_request = {
  user_email: {
    isEmail: true,
    notEmpty: true,
  },
  type: {
    isString: true,
    isIn: { options: [Object.values(CONTRACT.TYPES)] },
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
    isIn: { options: [Object.values(USER.ROLES)] },
    notEmpty: true,
  },
};
