
export const createUser = async (email: string, password: string) => {

    await fetch(`http://localhost:4000/db/create/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Set the Content-Type header
        },
        body: JSON.stringify({
            data: {
                email: email,
                password: password,
                sets: `{"default": []}`,
                uid: crypto.randomUUID()
            }
        })
    })

    const token = await fetch(`http://localhost:4000/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Set the Content-Type header
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })

    return token
}

export const logInUser = async (email: string, password: string) => {

    const token = await fetch(`http://localhost:4000/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Set the Content-Type header
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })

    return token.json()
}

export const signOut = async (window: Window) => {

    window.localStorage.removeItem("accessToken")
    window.localStorage.removeItem("refreshToken")
}