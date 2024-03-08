import { roles } from "../../MiddleWare/auth.middleware.js";

export const endPointproject={
    add:[roles.admin,roles.user],
    delete:[roles.admin,roles.user],
  update:[roles.admin,roles.user],
 get:[roles.admin,roles.user],
  search:[roles.admin,roles.user],
 create:[roles.admin,roles.user],
}