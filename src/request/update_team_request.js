export const update_team_request = {
  name: {
    optional: true,
    isString: true,
    notEmpty: true,
  },
  leader: {
    optional: true,
    isEmail: true,
    notEmpty: true,
  },
  scope: {
    optional: true,
    isString: true,
    notEmpty: true,
  },
};
