export class User {
    id!: number;
    username!: string;
    password!: string;
    nom!: string;
    prenom!: string;
    token?: string;
    refreshtToken?: string;
    role!:string;
    accessToken!: User;
    static refreshtToken: User;
    }
