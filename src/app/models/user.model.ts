import { IDBCollectionInterface, DBCollection } from './db-collection.model';

export interface IUserInterface extends IDBCollectionInterface {
    readonly fullname: string;
    readonly email: string;
    readonly inBagProducts: string[];
    readonly token?: string;
}

export class User extends DBCollection {
    private _fullname: string;
    private _email: string;
    private _inBagProducts: string[];
    private _token?: string;

    constructor(userData: IUserInterface) {
        super({
            id: userData.id,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
        });

        this._fullname = userData.fullname;
        this._email = userData.email;
        this._inBagProducts = userData.inBagProducts;

        if (userData.token) {
            this._token = userData.token;
        }
    }

    /**
    * Getter for fullname
    * @returns fullname string
    */
    public getFullname() {
        return this._fullname;
    }

    /**
    * Getter for email
    * @returns email string
    */
    public getEmail() {
        return this._email;
    }

    /**
    * Getter for in bag products
    * @returns products string
    */
    public getInBagProducts() {
        return this._inBagProducts;
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
    public setFullname(fullname: string) {
        this._fullname = fullname;
    }

    /**
    * Setter for email
    * @returns void
    */
    public setEmail(email: string) {
        this._email = email;
    }

    /**
    * Setter for in bag products
    * @returns void
    */
    public setInBagProducts(inBagProducts: string[]) {
        this._inBagProducts = inBagProducts;
    }

    /**
    * Setter for token
    * @returns void
    */
    public setToken(token: string) {
        this._token = token;
    }
}