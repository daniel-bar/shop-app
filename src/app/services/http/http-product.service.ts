import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import {
  IAddProductResponse,
  IGetProductResponse,
  IGetProductsResponse,
  IDeleteProductResponse,
  IGetCategoriesResponse,
  IGetGendersResponse,
} from 'src/app/models/response';
import { ProductCategory, ProductGender } from '../../models/product.model';

const ENDPOINT = environment.apiUrl + '/product/';

@Injectable()
export class HttpProductService {
  constructor(private http: HttpClient) {}

  /**
   * Handler for adding product
   * @param category category field of adding product form
   * @param gender gender field of adding product form
   * @param title title field of adding product form
   * @param description description field of adding product form
   * @param price price field of adding product form
   * @param image image field of adding product form
   * @returns IAddProductResponse Observable
   */
  public addProduct(
    category: ProductCategory,
    gender: ProductGender,
    title: string,
    description: string,
    price: number,
    image: string,
  ): Observable<IAddProductResponse> {
    const baseUrl = ENDPOINT;

    const postData = new FormData();
    postData.append('category', category.toString());
    postData.append('gender', gender.toString());
    postData.append('title', title);
    postData.append('description', description);
    postData.append('price', price.toString());
    postData.append('image', image);

    return this.http.post<IAddProductResponse>(baseUrl, postData);
  }

  /**
   * Handler for getting product
   * @param id id field of getting product
   * @returns IGetProductResponse Observable
   */
  public getProduct(id: string): Observable<IGetProductResponse> {
    const baseUrl = ENDPOINT + id;

    return this.http.get<IGetProductResponse>(baseUrl);
  }

  /**
   * Handler for getting products
   * @returns IGetProductsResponse Observable
   */
  public getProducts(
    gender?: ProductGender,
    category?: ProductCategory,
  ): Observable<IGetProductsResponse> {
    const baseUrl = ENDPOINT;

    const param = !!gender ? `gender=${gender}` : `category=${category}`;
    return this.http.get<IGetProductsResponse>(

      `${baseUrl}list?${param}`
    );
  }

  /**
  * Handler for deleting product
  * @param id id field of deleting product
  * @returns IDeleteProductResponse Observable
  */
  public deleteProduct(id: string): Observable<IDeleteProductResponse> {
      const baseUrl = ENDPOINT + id;

      return this.http.delete<IDeleteProductResponse>(baseUrl);
  }

  /**
   * Handler for getting categories
   * @returns IGetCategoriesResponse Observable
   */
  public getCategories(): Observable<IGetCategoriesResponse> {
    const baseUrl = ENDPOINT + 'categories';

    return this.http.get<IGetCategoriesResponse>(baseUrl);
  }

  /**
   * Handler for getting genders
   * @returns IGetGendersResponse Observable
   */
  public getGenders(): Observable<IGetGendersResponse> {
    const baseUrl = ENDPOINT + 'genders';

    return this.http.get<IGetGendersResponse>(baseUrl);
  }
}
