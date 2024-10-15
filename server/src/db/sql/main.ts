import { findUser } from "./mock.ts"

export const verifyUser = async (params: {email: string, password: string}) => {

    try {

        const {email, password} = params

        const user = findUser(email)
    
        if (!user) throw new Error("No such email")
        if (user.password != password) throw new Error("Wrong password given")
    
        return user
    } catch (e: any) {

        return {code: 400, message: e.message}
    }
}