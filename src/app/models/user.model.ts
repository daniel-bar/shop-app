import { IDBCollectionInterface, DBCollection } from './db-collection.model';

export interface IUserInterface extends IDBCollectionInterface {
    readonly fullname: string;
    readonly email: string;
    readonly token?: string;
}

export class User extends DBCollection {
    private _fullname: string;
    private _email: string;
    private _token?: string;

    constructor(userData: IUserInterface) {
        super({
            id: userData.id,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
        });

        this._fullname = userData.fullname;
        this._email = userData.email;

        if (userData.token) {
            this._token = userData.token;
        }
    }

    /**
    * Getter for fullname
    * @returns fullname string
    */
    public getFullname(): string {
        return this._fullname;
    }

    /**
    * Getter for email
    * @returns email string
    */
    public getEmail(): string {
        return this._email;
    }

    /**
    * Getter for token
    * @returns token string
    */
    public getToken(): string | null {
        return this._token ?? null;
    }

    /**
    * Setter for fullname
    * @returns void
    */
    public setFullname(fullname: string): void {
        this._fullname = fullname;
    }

    /**
    * Setter for email
    * @returns void
    */
    public setEmail(email: string): void {
        this._email = email;
    }

    /**
    * Setter for token
    * @returns void
    */
    public setToken(token: string): void {
        this._token = token;
    }
}