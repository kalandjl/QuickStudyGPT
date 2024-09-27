import jwt from "jsonwebtoken";
export const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};
export const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
};
export const authenticateAccessToken = (token) => {
    let uid;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, res) => {
        if (err)
            return res.status(401).send(err);
        uid = res.uid;
    });
    return uid;
};
export const authenticateRefreshToken = (token) => {
    let uid;
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, res) => {
        if (err)
            return res.status(401).send(err);
        uid = res.uid;
    });
    return uid;
};
//# sourceMappingURL=index.js.map