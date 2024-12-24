export const create_team_request = {
  name: {
    isString: true,
    notEmpty: true,
  },
  leader: {
    isEmail: true,
    notEmpty: true,
  },
  scope: {
    isString: true,
    notEmpty: true,
  },
};
