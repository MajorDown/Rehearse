import { Profile } from '../types';

const profileEndDate = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
}

const profileVerifier = (profile: Profile): boolean => {
    const actualDate = new Date();
    const endOfProfile = new Date(profile.endOfProfile);
    return endOfProfile >= actualDate;
}

export { profileEndDate, profileVerifier}