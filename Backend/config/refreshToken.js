import  Jwt  from "jsonwebtoken";
import {jwt_secret} from "../config/config.js"

export const genereteRefreshToken = (id) => {
    return Jwt.sign({id},jwt_secret, {expiresIn: "3d"})
}

