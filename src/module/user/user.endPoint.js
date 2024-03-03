import { roles } from "../../MiddleWare/auth.middleware.js";

export const endPoint={
    updateSkill:[roles.admin,roles.user],
    addUser:[roles.admin],
    deleteUser:[roles.admin],
    updateUser:[roles.admin]
}