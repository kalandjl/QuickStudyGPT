import { findUser } from "./mock.js";
export const verifyUser = async (params) => {
    try {
        const { email, password } = params;
        const user = findUser(email);
        if (!user)
            throw new Error("No such email");
        if (user.password != password)
            throw new Error("Wrong password given");
        return user;
    }
    catch (e) {
        return { code: 400, message: e.message };
    }
};
//# sourceMappingURL=main.js.map