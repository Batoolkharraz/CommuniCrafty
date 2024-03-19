import { roles } from "../../MiddleWare/auth.middleware.js";

export const endPointproject = {
  add: [roles.user],
  delete: [roles.user],
  update: [roles.user, roles.admin],
  get: [roles.admin,roles.user],
  search: [roles.admin, roles.user],
  create: [roles.admin, roles.user],
  deleteuser:[roles.admin,roles.user]
}