import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import {
    IAddProductResponse,
    IGetProductResponse,
    IGetProductsResponse,
    IDeleteProductResponse,
    IGetProductsSumResponse,
} from 'src/app/models/response';
import {
    ProductCategory,
    ProductGender,
} from '../../models/product.model';


const ENDPOINT = environment.apiUrl + '/product/';

@Injectable()
export class HttpProductService {

    constructor(private http: HttpClient) { }

    /**
    * Handler for adding product
    * @param category category field of adding product form
    * @param gender gender field of adding product form
    * @param title title field of adding product form
    * @param description description field of adding product form
    * @param price price field of adding product form
    * @param image image field of adding product form
    * @returns string Observable
    */
    public addProduct(
        category: ProductCategory,
        gender: ProductGender,
        title: string,
        description: string,
        price: number,
        image: File,
    ): Observable<IAddProductResponse> {
        const baseUrl = ENDPOINT;

        return this.http.post<IAddProductResponse>(baseUrl, {
            category,
            gender,
            title,
            description,
            price,
            image,
        });
    }

    /**
    * Handler for getting product
    * @param id id field of getting product
    * @returns string Observable
    */
    public getProduct(id: string): Observable<IGetProductResponse> {
        const baseUrl = ENDPOINT;

        return this.http.get<IGetProductResponse>(baseUrl + id);
    }

    /**
    * Handler for getting products
    * @returns string Observable
    */
    public getProducts(): Observable<IGetProductsResponse> {
        const baseUrl = ENDPOINT;

        return this.http.get<IGetProductsResponse>(baseUrl + 'all');
    }

    /**
    * Handler for deleting product
    * @param id id field of deleting product
    * @returns string Observable
    */
    public deleteProduct(id: string): Observable<IDeleteProductResponse> {
        const baseUrl = ENDPOINT;

        return this.http.delete<IDeleteProductResponse>(baseUrl + id);
    }

    /**
    * Handler for getting the products sum
    * @returns string Observable
    */
    public getProductsSum(): Observable<IGetProductsSumResponse> {
        const baseUrl = ENDPOINT;

        return this.http.get<IGetProductsResponse>(baseUrl + 'sum/d');
    }
}