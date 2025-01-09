import USER from "../constant/user.js"
import { init_user_model } from "../model/user.js"
import { pm_log } from "../utils/server.js"

export const create_user = async (user) => {
    try {
        user.is_deleted = false
        user.role = "desactivado"
        
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

export const get_user = async (user_id) => {
  try {

    const user_model = await init_user_model();
    const user = await user_model.findOne({
      email: user_id,
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
    const roles = USER.ROLES;

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
      { $group: { _id: "$profession" } }
    ]).toArray();

    return professions;
  } catch (error) {
    pm_log("User Service: " + error, true);
    throw new Error(error);
  }
};