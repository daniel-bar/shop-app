import { IDBCollectionInterface, DBCollection } from './db-collection.model';

export enum ProductCategory {
    Jeans = 1,
    Jackets,
    Coats,
    TShirts,
    Sneakers,
    Hats,
}

export enum ProductGender {
    Men = 1,
    Women,
}

export interface IProductInterface extends IDBCollectionInterface {
    readonly category: ProductCategory;
    readonly gender: ProductGender;
    readonly title: string;
    readonly description: string;
    readonly price: number;
    readonly imageFileName: string;
}

export class Product extends DBCollection {
    private _category: ProductCategory;
    private _gender: ProductGender;
    private _title: string;
    private _description: string;
    private _price: number;
    private _imageFileName: string;

    constructor(productData: IProductInterface) {
        super({
            id: productData.id,
            createdAt: productData.createdAt,
            updatedAt: productData.updatedAt,
        });

        this._category = productData.category;
        this._gender = productData.gender;
        this._title = productData.title;
        this._description = productData.description;
        this._price = productData.price;
        this._imageFileName = productData.imageFileName;
    }

    /**
    * Getter for category
    * @returns category string
    */
    public getCategory() {
        return this._category;
    }

    /**
    * Getter for gender
    * @returns gender string
    */
    public getGender() {
        return this._gender;
    }

    /**
    * Getter for title
    * @returns title string
    */
    public getTitle() {
        return this._title;
    }

    /**
    * Getter for description
    * @returns description string
    */
    public getDescription() {
        return this._description;
    }

    /**
    * Getter for price
    * @returns price number
    */
    public getPrice(): number {
        return this._price;
    }

    /**
    * Getter for imageFileName
    * @returns image file name
    */
    public getImageFileName(): string {
        return this._imageFileName;
    }

    /**
    * Setter for category
    * @returns void
    */
    public setCategory(category: ProductCategory) {
        this._category = category;
    }

    /**
    * Setter for gender
    * @returns void
    */
    public setGender(gender: ProductGender) {
        this._gender = gender;
    }

    /**
    * Setter for title
    * @returns void
    */
    public setTitle(title: string) {
        this._title = title;
    }

    /**
    * Setter for description
    * @returns void
    */
    public setDescription(description: string) {
        this._description = description;
    }

    /**
    * Setter for price
    * @returns void
    */
    public setPrice(price: number) {
        this._price = price;
    }

    /**
    * Setter for image
    * @returns void
    */
    public setimageFileName(imageFileName: string) {
        this._imageFileName = imageFileName;
    }
}