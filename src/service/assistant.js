import { init_user_model } from "../model/user.js";
import { pm_log } from "../utils/server.js";

export const add_assistant = async (assistant_id, user_id) => {
    try {
        if (assistant_id == user_id) {
          return false;
        }
        
        const user_model = await init_user_model();
        const exists_user = await user_model.findOne({
            email: user_id,
            is_deleted: false
        })

        
        if (!exists_user){
            return false
        }

        const is_assistant_added = await user_model.updateOne(
          {
            email: assistant_id,
            role: "asistente",
            is_deleted: false,
          },
          {
            $set: { assist_to: user_id },
          }
        );

        return is_assistant_added.modifiedCount ? true : false;
    } catch (error) {
        pm_log("Assistant Service: " + error, true);
        throw new Error(error);
    }
}

export const get_assistants = async (user_id) => {
  try {
    const user_model = await init_user_model();
    const assistants = await user_model.find({
      role: "asistente",
      assist_to: user_id,
      is_deleted: false,
    }).toArray();

    if (!assistants.length) {
      return false;
    }

    const result = {
        quantity: assistants.length,
        assistants: assistants
    }

    return result;
  } catch (error) {
    pm_log("Assistant Service: " + error, true);
    throw new Error(error);
  }
};

export const remove_assistant = async (assistant_id, user_id) => {
  try {
    if (assistant_id == user_id) {
      return false;
    }

    const user_model = await init_user_model();
    const exists_user = await user_model.findOne({
      email: user_id,
      is_deleted: false,
    });

    if (!exists_user) {
      return false;
    }

    const is_assistant_removed = await user_model.updateOne(
      {
        email: assistant_id,
        role: "asistente",
        is_deleted: false,
      },
      {
        $unset: { assist_to: null },
      }
    );

    return is_assistant_removed.modifiedCount ? true : false;
  } catch (error) {
    pm_log("Assistant Service: " + error, true);
    throw new Error(error);
  }
};