import jwt from "jsonwebtoken";
export const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
};
export const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
};
export const authenticateToken = (token, next) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        //@ts-ignore
        if (err)
            return res.status(401).send(err);
        //@ts-ignore
        req.user = user;
        next();
    });
};
//# sourceMappingURL=index.js.map