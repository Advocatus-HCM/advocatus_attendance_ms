import { init_team_model } from "../model/team.js";
import { init_user_model } from "../model/user.js";
import { pm_log } from "../utils/server.js";
import * as user_service from "./user.js"

export const create_team = async (new_team) => {
  try {
    const team_model = await init_team_model()
    new_team.is_deleted = false
    
    await user_service.get_user(new_team.leader)
    const team = await team_model.insertOne(new_team)
    await update_leader(new_team.leader, new_team.name)

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
    const team_model = await init_team_model();

    const teams = await team_model
      .find({}, { projection: { name: 1, _id: 0 } })
      .toArray();

    return teams;
  } catch (error) {
    pm_log("Team Service: " + error, true);
    throw new Error(error);
  }
};

export const get_team = async (team_name) => {
  const team_model = await init_team_model();
  const team = await team_model.findOne({
    name: team_name,
    is_deleted: false,
  });

  if (!team) throw new Error("Team not found");

  delete team._id

  return team;
};

export const update_team = async (team_name, new_data) => {
  try {
    const team_model = await init_team_model()
    const current_team = await get_team(team_name)

    if (new_data.leader && (current_team.leader != new_data.leader)){
      await update_leader(
        new_data.leader,
        new_data.name ? new_data.name : current_team.name
      );
      delete new_data.leader
    }

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

    if (is_team_deleted.modifiedCount) {
      remove_all_members(team_name)
    }

    return is_team_deleted.modifiedCount ? true : false;
  } catch (error) {
    pm_log("Team Service: " + error, true);
    throw new Error(error);
  }
};

export const add_member = async (member_email, team_name) => {
  try {
    const user_model = await init_user_model();
    const user = await user_service.get_user(member_email)
    const user_team = user.team ? await get_team(user.team) : null
    await get_team(team_name)

    if(user.email == user_team?.leader) throw new Error("User is leader of other team")

    const is_member_added = await user_model.updateOne(
      {
        email: member_email,
        is_deleted: false,
      },
      {
        $set: { team: team_name },
      }
    );

    return is_member_added.modifiedCount ? true : false;
  } catch (error) {
    pm_log("Team Service: " + error, true);
    throw new Error(error);
  }
};

export const remove_member = async (member_email, team_name) => {
  try {
    const user_model = await init_user_model()
    const member = await user_service.get_user(member_email)
    const current_team = member.team ? await get_team(member.team) : null

    if (member.email == current_team.leader) throw new Error("Can not remove leader")
    if (member.team != team_name) throw new Error("User is not in the team")

    await user_model.updateOne(
      {
        email: member_email,
        is_deleted: false,
      },
      {
        $set: { team: null },
      }
    )

    return true
  } catch (error) {
    pm_log("Team Service: " + error, true);
    throw new Error(error);
  }
};

export const update_leader = async (new_leader, team_name) => {
  const team_model = await init_team_model();
  const user_model = await init_user_model();
  await user_service.get_user(new_leader)
  await get_team(team_name)

  await team_model.updateOne(
    {
      name: team_name,
      is_deleted: false,
    },
    {
      $set: { leader: new_leader }
    }
  )
  await user_model.updateOne(
    {
      email: new_leader,
      is_deleted: false,
    },
    {
      $set: { team: team_name },
    }
  );
}

export const remove_all_members = async (team_name) => {
  const user_model = await init_user_model();
  
  await user_model.updateMany(
    {
      team: team_name,
      is_deleted: false,
    },
    {
      $set: { team: null },
    }
  );
}

export const add_members = async (team_name, members) => {
  const user_model = await init_user_model();
  await get_team(team_name)

  const are_users_updated = await user_model.updateMany(
    {
      email: {$in: members},
      is_deleted: false,
    },
    {
      $set: { team: team_name },
    }
  );

  return are_users_updated.modifiedCount ? true : false;
}

export const get_members = async (team_name) => {
  const user_model = await init_user_model();
  await get_team(team_name);

  const members = await user_model
    .find(
      {
        team: team_name,
        is_deleted: false,
      },
      {
        projection: { _id: 0 }
      }
    ).toArray();

  if(members.length == 0) throw new Error("No members found")

  return members;
};