const allRoles = {
  user: ['personal'],
  admin: ['getUsers', 'manageUsers', 'personal'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
