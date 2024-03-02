import { roles } from "../../MiddleWare/auth.middleware.js";

export const endPoint={
    updateStatus:[roles.admin],
    addUser:[roles.admin],
    deleteUser:[roles.admin],
    updateUser:[roles.admin]
}