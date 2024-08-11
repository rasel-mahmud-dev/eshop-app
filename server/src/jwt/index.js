import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig";


const jwtService = {

    createToken(data) {
        return jwt.sign(
            data,
            envConfig.SECRET_KEY,
            {expiresIn: "7d"}
        );
    },

    parseToken(token) {
        return new Promise((resolve, reject) => {
            (async function () {
                try {
                    if (token) {
                        let d = await jwt.verify(token, envConfig.SECRET_KEY);
                        resolve(d);
                    } else {
                        reject(new Error("Token not found"));
                    }
                } catch (ex) {
                    reject(ex);
                }
            })()
        });
    }

}

export default jwtService