import { authenticateAccessToken } from "../auth/index.js";
require("dotenv").config();
// Before user can access db calls, their jwt token must be authorized
export const authenticateTokenMW = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null)
        return res.sendStatus(401);
    authenticateAccessToken(token);
};
//# sourceMappingURL=token.js.map