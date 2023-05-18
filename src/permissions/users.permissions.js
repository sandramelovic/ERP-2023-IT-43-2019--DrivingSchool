import Role from "../helpers/role"

exports.canViewUsers = function(user, userId) {
  return (
    user.role === Role.Admin ||
    userId == user.userId
  )
}