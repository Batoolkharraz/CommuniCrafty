import { roles } from "../../MiddleWare/auth.middleware.js";

export const endPoint={
    addUser:[roles.admin],
    deleteUser:[roles.admin],
    updateUser:[roles.admin]
}