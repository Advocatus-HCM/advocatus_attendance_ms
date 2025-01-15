import USER from "../constant/user.js";
import { init_contract_model } from "../model/contract.js";
import { init_user_model } from "../model/user.js";
import { get_current_date } from "./format.js";

export const get_env_variable = (variable_name) => {
  return process.env[variable_name];
};

export const pm_log = async (item, error = null) => {
  return error ? console.error(item) : console.log(item);
};

export const create_admin_user_with_contract = async () => {
  const user_model = await init_user_model();
  const contract_model = await init_contract_model();

  const user = {
    name: "admin",
    last_name: "admin",
    email: "admin@admin.com",
    phone_number: "+573245677890",
    profession: "Admin",
    superior: "admin@admin.com",
    team: "Admin team",
    role: USER.ROLES.admin,
    is_deleted: false
  };

  const userExists = await user_model.findOne({ email: user.email, is_deleted: false });

  if (!userExists) {
    await user_model.insertOne(user);
  }

  const contract = {
    user_email: "admin@admin.com",
    type: "indefinido",
    salary: "0",
    start_date: get_current_date(),
    probation_end_date: get_current_date(),
    role: "admin",
    is_deleted: false
  };

  const contractExists = await contract_model.findOne({ user_email: contract.user_email, is_deleted: false });

  if (!contractExists) {
    await contract_model.insertOne(contract);
  }

  pm_log("Admin created")
};
