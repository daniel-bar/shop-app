import { IDBCollectionInterface, DBCollection } from './db-collection.model';

export enum ProductCategory {
    Jeans = 'Jeans',
    Jackets = 'Jackets',
    Coats = 'Coats',
    TShirts = 'T-Shirts',
    Sneakers = 'Sneakers',
    Hats = 'Hats',
}

export enum ProductGender {
    Men = 'Men',
    Women = 'Women',
}

export interface IProductInterface extends IDBCollectionInterface {
    readonly category: ProductCategory;
    readonly gender: ProductGender;
    readonly title: string;
    readonly description: string;
    readonly price: number;
    readonly image: string;
}

export class Product extends DBCollection {
    private _category: ProductCategory;
    private _gender: ProductGender;
    private _title: string;
    private _description: string;
    private _price: number;
    private _image: string;

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
        this._image = productData.image;
    }

    /**
    * Getter for category
    * @returns category string
    */
    public getCategory(): ProductCategory {
        return this._category;
    }

    /**
    * Getter for gender
    * @returns gender string
    */
    public getGender(): ProductGender {
        return this._gender;
    }

    /**
    * Getter for title
    * @returns title string
    */
    public getTitle(): string {
        return this._title;
    }

    /**
    * Getter for description
    * @returns description string
    */
    public getDescription(): string {
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
    * Getter for image
    * @returns image file
    */
    public getimage(): string {
        return this._image;
    }

    /**
    * Setter for category
    * @returns void
    */
    public setCategory(category: ProductCategory): void {
        this._category = category;
    }

    /**
    * Setter for gender
    * @returns void
    */
    public setGender(gender: ProductGender): void {
        this._gender = gender;
    }

    /**
    * Setter for email
    * @returns void
    */
    public setTitle(title: string): void {
        this._title = title;
    }

    /**
    * Setter for description
    * @returns void
    */
    public setDescription(description: string): void {
        this._description = description;
    }

    /**
    * Setter for price
    * @returns void
    */
    public setPrice(price: number): void {
        this._price = price;
    }

    /**
    * Setter for image
    * @returns void
    */
    public setimage(image: string): void {
        this._image = image;
    }
}