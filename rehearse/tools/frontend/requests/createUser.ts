import { User } from "@/types";

/**
 * requète pour créer un utilisateur
 * @param {User} newUser
 * @returns {Promise<Response>}
 */
const createUser = async (newUser: User ): Promise<Response> => {
    const response = await fetch('/api/user/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'       
        },
        body: JSON.stringify(newUser)
    });
    return response.json() as Promise<Response>;
}

export default createUser;