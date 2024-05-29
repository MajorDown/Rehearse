import { User } from "@/types";

/**
 * requète pour créer un utilisateur
 * @param {User} newUser
 * @returns {Promise<Response | Error>}
 */
const createUser = async (newUser: User ): Promise<Response | Error> => {
    const response = await fetch('/api/user/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'        
        },
        body: JSON.stringify(newUser)
    });
    return response.json() as Promise<Response | Error>;
}

export default createUser;