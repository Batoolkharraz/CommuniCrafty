import { roles } from "../../MiddleWare/auth.middleware.js";

export const endPointproject={
    add:[roles.user],
    delete:[roles.user],
  update:[roles.user],
 get:[roles.user],
  search:[roles.admin,roles.user],
 create:[roles.admin,roles.user],
}