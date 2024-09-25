const db = [
    {
        uid: "A1",
        email: "karj5903@gmail.com",
        password: "Van2020"
    }
]

export const findUser = (email: string) => {

    return db.find(user => user.email === email);
}


export default db