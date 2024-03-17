import { roles } from "../../MiddleWare/auth.middleware.js";

export const endPoint={
    TopHeadlines:[roles.admin],
    Technology:[roles.user],
}