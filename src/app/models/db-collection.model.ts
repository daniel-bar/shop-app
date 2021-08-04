export interface IDBCollectionInterface {
    readonly id: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

export class DBCollection {
    private readonly _id: string;
    private readonly _createdAt: Date;
    private readonly _updatedAt: Date;

    constructor(dbCollectionData: IDBCollectionInterface) {
        this._id = dbCollectionData.id;
        this._createdAt = dbCollectionData.createdAt;
        this._updatedAt = dbCollectionData.updatedAt;
    }

    /** 
    * Getter for id of the model in the DB
    * @returns id string of the model
    */
    public getId() {
        return this._id;
    }

    /** 
    * Getter for time of creation in the DB
    * @returns Date object of creation time
    */
    public getCreatedAt() {
        return this._createdAt;
    }

    /** 
    * Getter for time of update in the DB
    * @returns Date object of update time
    */
    public getUpdatedAt() {
        return this._updatedAt;
    }
}