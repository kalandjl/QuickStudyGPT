import userObj from "../lib/auth/types/userObj"


const useAuth = (): undefined | userObj => {

    const accessToken = window.localStorage.getItem("refreshToken")

    if (!accessToken) return undefined

    const res = fetch('http://localhost:4000/auth/getUser', {
        method: "POST", 
        headers: {
            "Content-Type": "application/json" // Set the Content-Type header
        },
        body: JSON.stringify({
            
        })
    }).then(r => {
        
    })
}

export default useAuth