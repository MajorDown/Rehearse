import { ConnectedUser } from "@/types";

/**
 * Get the connected user from the local storage
 * @returns {ConnectedUser | null}
 */
const getConnectedUser = (): ConnectedUser | null => {
    if (window) {
        const StringifiedUser = localStorage.getItem('rehearse-connected-user')
        if (StringifiedUser) return JSON.parse(StringifiedUser)
        else return null;
    }
    else return null;
}

export default getConnectedUser;