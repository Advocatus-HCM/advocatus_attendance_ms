export const add_memeber_request = {
  member_email: {
    isEmail: true,
    notEmpty: true,
  },
  team_name: {
    isString: true,
    notEmpty: true,
  },
};
