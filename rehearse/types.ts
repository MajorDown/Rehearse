export type Session = string;
export type Title = string;
export type Album = string;
export type Url = string;
export type Artist = string;

export type User = {
    name: string;
    email: string;
    password: string;
}

export type ConnectedUser = Omit<User, 'password'> & {
    authToken: string;
}

export type UserContext = {
    user: ConnectedUser | null;
    updateUser: (user: ConnectedUser | null) => void;
}