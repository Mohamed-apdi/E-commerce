import  Jwt  from "jsonwebtoken";
import {jwt_secret} from "../config/config.js"

export const genereteToken = (id) => {
    return Jwt.sign({id},jwt_secret, {expiresIn: "1d"})
}

