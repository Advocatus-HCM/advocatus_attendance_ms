import CONTRACT from "../constant/contract.js";
import { init_contract_model } from "../model/contract.js";
import { init_user_model } from "../model/user.js";
import * as util_service from "../utils/format.js";
import { pm_log } from "../utils/server.js";

export const create_contract = async (contract) => {
  try {
    contract.is_deleted = false;

    if (!(util_service.validate_dates(contract.start_date, contract.end_date))) throw new Error("Invalid dates")
    if (!(util_service.validate_dates(contract.start_date, contract.probation_end_date))) throw new Error("Invalid dates")

    contract.contract_duration = util_service.difference_between_dates(contract.start_date, contract.end_date)
    contract.probation_duration = util_service.difference_between_dates(contract.start_date, contract.probation_end_date)
    const user_model = await init_user_model();
    const is_user_updated = await user_model.updateOne(
      {
        email: contract.user_email,
        role: "desactivado",
        is_deleted: false,
      },
      {
        $set: {
            role: contract.role
        },
      }
    );

    if (is_user_updated.modifiedCount) {
        const contract_model = await init_contract_model();
        await contract_model.insertOne(contract);
    } else {
        throw new Error("User does not exists or has another contract")
    }

    return true;
  } catch (error) {
    pm_log("Contract Service: " + error, true);
    throw new Error(error);
  }
};

export const get_contract = async (contract_id) => {
  try {
    const contract_model = await init_contract_model();
    const contract = await contract_model.findOne({
      user_email: contract_id,
      is_deleted: false,
    });

    if (contract) delete contract._id

    return contract;
  } catch (error) {
    pm_log("Contract Service: " + error, true);
    throw new Error(error);
  }
};

export const get_contracts = async () => {
  try {
    const contract_model = await init_contract_model();
    const contracts = await contract_model.find({
        is_deleted: false
    }).toArray();

    return contracts;
  } catch (error) {
    pm_log("Contract Service: " + error, true);
    throw new Error(error);
  }
};

export const get_types = async () => {
  try {
    const types = CONTRACT.TYPES

    return types;
  } catch (error) {
    pm_log("Contract Service: " + error, true);
    throw new Error(error);
  }
};

export const update_contract = async (new_data, contract_id) => {
  try {
    const contract_model = await init_contract_model();
    const user_model = await init_user_model();
    const contract = await contract_model.findOne({
      user_email: contract_id,
      is_deleted: false,
    });

    if (!contract) throw new Error("Contract not found")

    if(new_data.user_email) {
        const is_user_updated = await user_model.updateOne(
            {
                email: new_data.user_email,
                role: "desactivado",
                is_deleted: false,
            },
            {
                $set: {
                    role: new_data.role ? new_data.role : contract.role,
                },
            }
        );
        
        if (!is_user_updated.modifiedCount) throw new Error("New user does not exists or has another contract")
        
        await user_model.updateOne(
            {
            email: contract_id,
            is_deleted: false,
            },
            {
            $set: {
                role: "desactivado",
            },
            }
        );
    }

    if (new_data.role) {
      user_model.updateOne(
        {
          email: contract_id,
          is_deleted: false,
        },
        {
          $set: {
              role: new_data.role,
          },
        }
      )
    }

    if (new_data.end_date || new_data.start_date || new_data.probation_end_date) {
      const start_date = new_data.start_date ? new_data.start_date : contract.start_date;
      const end_date = new_data.end_date ? new_data.end_date : contract.end_date;
      const probation_end_date = new_data.probation_end_date ? new_data.probation_end_date : contract.probation_end_date;

      util_service.validate_dates(start_date, end_date)
      util_service.validate_dates(start_date, probation_end_date)
      
      new_data.contract_duration = util_service.difference_between_dates(start_date, end_date);
      new_data.probation_duration = util_service.difference_between_dates(start_date, probation_end_date);
    }


    const new_contract = await contract_model.updateOne(
      {
        user_email: contract_id,
        is_deleted: false,
      },
      {
        $set: new_data,
      }
    );


    return new_contract.modifiedCount ? true : false;
  } catch (error) {
    pm_log("Contract Service: " + error, true);
    throw new Error(error);
  }
};

export const delete_contract = async (contract_id) => {
  try {
    const contract_model = await init_contract_model();
    const is_deleted_contract = await contract_model.updateOne(
      {
        user_email: contract_id,
        is_deleted: false,
      },
      {
        $set: {
            is_deleted: true
        },
      }
    );

    if (is_deleted_contract.modifiedCount) {
        const user_model = await init_user_model();
        await user_model.updateOne(
          {
            email: contract_id,
            is_deleted: false,
          },
          {
            $set: {
              role: "desactivado",
            },
          }
        );
    }

    return is_deleted_contract.modifiedCount ? true : false;
  } catch (error) {
    pm_log("Contract Service: " + error, true);
    throw new Error(error);
  }
};
