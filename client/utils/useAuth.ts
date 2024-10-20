import { useEffect, useState } from "react";
import userObj from "../lib/auth/types/userObj"



const useAuth = (accessToken: string | null): [userObj | undefined, boolean] => {

    const [user, setUser] = useState<userObj | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!accessToken) return setLoading(false)

        setLoading(true)

        fetch('http://localhost:4000/auth/get-user', {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        })
        .then(r => r.json())
        .then(data => setUser(data))
        .catch(e => {
            console.error(e);
            setUser(undefined);  // Handle error by resetting the user
        }).finally(() => {
            setLoading(false) // Stop loading once the fetch completes
        })
    }, [accessToken]); // Re-run the effect when accessToken changes

    return [user, loading];
}

export default useAuth