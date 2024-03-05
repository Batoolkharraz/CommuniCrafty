import { roles } from "../../MiddleWare/auth.middleware.js";

export const endPointproject={
    add:[roles.admin,roles.user],
  
}