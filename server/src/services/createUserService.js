import User from "../models/User";

function createUserService({
        firstName,
        lastName,
       email,
       hash,
       avatarUrl,
    }) {

    return new Promise(async (resolve, reject) => {
        let user = new User({
            firstName,
            lastName,
            fullName: firstName + " " + lastName,
            role: "USER",
            email: email,
            password: hash,
            avatar: avatarUrl
        });

        user = await user.save();
        if (!user) {
            let error = new Error("Registration fail. please try again")
            return reject(error)
        }

        resolve(user)
    })
}

export default createUserService