import { init_team_model } from "../model/team.js";
import { pm_log } from "../utils/server.js";

export const create_team = async (new_team) => {
  try {
    new_team.is_deleted = false

    const team_model = await init_team_model()
    const team = await team_model.insertOne(new_team)

    const result = {
      name: team.name,
      scope: team.scope,
    }

    return result;
  } catch (error) {
    pm_log("Team Service: " + error, true);
    throw new Error(error);
  }
};

export const get_teams = async (team_name = null) => {
  try {

    let team = null
    const team_model = await init_team_model();

    if (team_name){
      team = await team_model.findOne({ name: team_name })
      delete team._id
    } else {
      team = await team_model.find({}, { projection: { name: 1, _id: 0 } }).toArray()
    }

    return team;
  } catch (error) {
    pm_log("Team Service: " + error, true);
    throw new Error(error);
  }
};

export const update_team = async (team_name, new_data) => {
  try {
    const team_model = await init_team_model();

    const is_team_updated = await team_model.updateOne(
      {
        name:team_name,
        is_deleted: false
      }, {
        $set: new_data
      }
    );

    return is_team_updated.modifiedCount ? true : false;
  } catch (error) {
    pm_log("Team Service: " + error, true);
    throw new Error(error);
  }
};

export const delete_team = async (team_name) => {
  try {
    const team_model = await init_team_model();

    const is_team_deleted = await team_model.updateOne(
      {
        name: team_name,
        is_deleted: false,
      },
      {
        $set: {is_deleted: true},
      }
    );

    return is_team_deleted.modifiedCount ? true : false;
  } catch (error) {
    pm_log("Team Service: " + error, true);
    throw new Error(error);
  }
};