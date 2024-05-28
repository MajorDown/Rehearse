import { User } from "@/types";

const createUser = async (newUser: User ): Promise<Response | null> => {
    const response = await fetch('/api/inscription', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'        
        },
        body: JSON.stringify(newUser)
    });
    return response.json();
}

export default createUser;