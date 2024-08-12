import getToken from "../utils/getToken";


export function auth(req, res, next) {
    let token = getToken(req);

    if (!token) {
        req.user = null;
        return next("Please login first")
    }
    // parseToken(token)
    //     .then((u) => {
    //         req.user = {
    //             _id: u._id,
    //             email: u.email,
    //             role: u.role,
    //         };
    //         next();
    //     })
    //     .catch((err) => {
    //         req.user = null;
    //         next("Authorization, Please login first");
    //     });
}


export function portfolioVisitorId(req, res, next) {
    let id = req.cookies["rsl_portfolio_cookie"]
    if(!id) return next("Unauthorized")
    req.user = {
        userId: id
    }
    next()
}
