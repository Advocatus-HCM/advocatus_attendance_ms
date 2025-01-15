import USER from "../constant/user.js"
import { init_contract_model } from "../model/contract.js"
import { init_user_model } from "../model/user.js"
import * as util_service from "../utils/format.js"
import * as team_service from "./team.js"
import { pm_log } from "../utils/server.js"

export const create_user = async (user) => {
    try {
        user.is_deleted = false
        user.active = false
        user.role = USER.ROLES.unactive

        if (user.superior) await validate_superior(user.superior)
        if (user.team) await team_service.get_team(user.team)
        
        const user_model = await init_user_model()
        await user_model.insertOne(user)

        const result = {
          email: user.email,
          role: user.role
        };

        return result
    } catch (error) {
        pm_log('User Service: ' + error, true)
        throw new Error(error)
    }
}

export const get_user = async (user_id, role = null) => {
  try {
    const roles = role ? [role] : Object.values(USER.ROLES);

    const user_model = await init_user_model();
    const user = await user_model.findOne({
      email: user_id,
      role: {$in: roles},
      is_deleted: false
    });

    if (!user) throw new Error("User not found");

    return user

  } catch (error) {
    pm_log("User Service: " + error, true);
    throw new Error(error);
  }
};

export const get_users = async () => {
  try {
    const user_model = await init_user_model();
    const users = await user_model.find(
      {
        is_deleted: false,
      },
      {
        projection: {_id: 0}
      }
    ).toArray();

    if (users.length == 0) throw new Error("Users not found");

    return users;
  } catch (error) {
    pm_log("User Service: " + error, true);
    throw new Error(error);
  }
};

export const delete_user = async (user_id) => {
  try {

    const user_model = await init_user_model();
    const contract_model = await init_contract_model();
    let current_date = util_service.get_current_date();
    const contract = await contract_model.findOne({
      user_email: user_id,
      is_deleted: false
    })

    if (contract && util_service.is_date_greater(contract.start_date, current_date)) {
      current_date = contract.start_date
    }
    
    await contract_model.updateOne(
      {
      user_email: user_id,
      is_deleted: false
      },
      {
        $set: {
          end_date: current_date
        }
      }
    )

    const is_user_deleted = await user_model.updateOne(
      { 
        email: user_id, is_deleted: false 
      },
      {
        $set: {is_deleted: true}
      }
    )

    return is_user_deleted.modifiedCount ? true : false;

  } catch (error) {
    pm_log("User Service: " + error, true);
    throw new Error(error);
  }
};

export const update_user = async (user_id, updated_user) => {
  try {
    const user_model = await init_user_model();

    if (updated_user.superior) await validate_superior(updated_user.superior)
    if (updated_user.team) await team_service.get_team(updated_user.team)

    const is_user_updated = await user_model.updateOne(
      {
        email: user_id,
        is_deleted: false,
      },
      {
        $set: updated_user,
      }
    );

    return is_user_updated.modifiedCount ? true : false;
  } catch (error) {
    pm_log("User Service: " + error, true);
    throw new Error(error);
  }
};

export const get_roles = async () => {
  try {
    const roles = Object.values(USER.ROLES);

    return roles;
  } catch (error) {
    pm_log("User Service: " + error, true);
    throw new Error(error);
  }
};

export const get_professions = async () => {
  try {
    const user_model = await init_user_model();
    const professions = await user_model.aggregate([
      { $match: { is_deleted: false } },
      { $group: { _id: "$profession" } },
      { $project: { _id: 0, profession: "$_id" } }  // Proyecta solo el campo "profession"
    ]).map(doc => doc.profession).toArray();


    return professions;
  } catch (error) {
    pm_log("User Service: " + error, true);
    throw new Error(error);
  }
};

const validate_superior = async (superior_email) => {
    const user_model = await init_user_model();
    const superior = await user_model.findOne({
      email: superior_email, 
      role: USER.ROLES.manager,
      is_deleted: false
    })

    if (!superior) {
      throw new Error("Manager does not exists")
    }

    return true
}