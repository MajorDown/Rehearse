export type Session = string; // format : YYMMDD-HHMMSS
export type Title = string; // titre attribué à l'enregistrement
export type Album = string; // album alloué à l'enregistrement
export type Url = string; // url de l'enregistrement
export type Project = string; // nom de l'artiste / groupe alloué à l'enregistrement
export type Profile = "free" | "pro" | "premium";

export type Record = {
    autor: string;
    session: Session;
    Project: Project;
    album: Album | null;
    title: Title;
    url: Url;
}

export type User = {
    name: string;
    email: string;
    password: string;
    profile: Profile;   
}

export type ConnectedUser = Omit<User, 'password'> & {
    authToken: string;
}

export type UserContext = {
    connectedUser: ConnectedUser | null;
    updateConnectedUser: (user: ConnectedUser | null) => void;
}