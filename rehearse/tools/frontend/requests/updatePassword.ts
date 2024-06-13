import { UserAuthDataForNewPassword } from "@/types";

/**
 * requète pour connecter un utilisateur
 * @param {user: {email: string, password: string}}
 * @returns {Promise<Response>}
 */
const updatePassword = async (user: UserAuthDataForNewPassword): Promise<Response> => {
    const response = await fetch('/api/password/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.authToken}`   
        },
        body: JSON.stringify(user)
    });
    return response.json() as Promise<Response>;
}

export default updatePassword;
