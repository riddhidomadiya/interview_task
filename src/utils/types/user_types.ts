export type SignupTypes = {
    name: string;
    email: string;
    password: string;
}

export type LoginTypes = {
    email: string;
    password: string;
}

export type UserTypes = {
    id: number;
    name: string;
    email: string;
    created_at: Date
}

export type IsUserExistTypes = {
    userId: string;
};

