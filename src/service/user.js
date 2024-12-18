import { init_user_model } from "../model/user.js"
import { pm_log } from "../utils/server.js"

let user_model = null

export const create_user = async (user) => {
    try {
        user.is_deleted = false
        
        user_model = await init_user_model()
        await user_model.insertOne(user)

    } catch (error) {
        pm_log('User Service: ' + error, true)
        throw new Error(error)
    }
}

export const get_user = async (user_id) => {
  try {

    user_model = await init_user_model();
    return await user_model.findOne({
      email: user_id,
      is_deleted: false
    });

  } catch (error) {
    pm_log("User Service: " + error, true);
    throw new Error(error);
  }
};

export const delete_user = async (user_id) => {
  try {

    user_model = await init_user_model()
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
    user_model = await init_user_model();
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
