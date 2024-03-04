import { roles } from "../../MiddleWare/auth.middleware.js";

export const endPoint={
    add:[roles.admin,roles.user],
    update:[roles.admin,roles.user],
    get:[roles.admin,roles.user],
    delete:[roles.admin,roles.user],
}