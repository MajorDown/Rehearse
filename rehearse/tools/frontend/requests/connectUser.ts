import { UserAuthData } from "@/types";

/**
 * requète pour connecter un utilisateur
 * @param {user: {email: string, password: string}}
 * @returns {Promise<Response>}
 */
const connectUser = async (user: UserAuthData): Promise<Response> => {
    const response = await fetch('/api/user/connect', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'       
        },
        body: JSON.stringify(user)
    });
    return response.json() as Promise<Response>;
}

export default connectUser;