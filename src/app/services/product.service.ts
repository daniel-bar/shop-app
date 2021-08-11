import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { ISelectDataItem } from '../models/shared/select-data';

import { HttpProductService } from './http/http-product.service';

import {
  IProductInterface,
  ProductCategory,
  ProductGender,
} from '../models/product.model';
import {
  IAddProductResponse,
  IGetProductResponse,
  IGetProductsResponse,
  IGetCategoriesResponse,
  IGetGendersResponse,
} from '../models/response';

@Injectable()
export class ProductService {
  constructor(private httpProductService: HttpProductService) {}

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
    image: File
  ): Observable<IProductInterface> {
    return this.httpProductService
      .addProduct(category, gender, title, description, price, image)
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          let errorMessage: string;

          switch (errorResponse.status) {
            case 400:
              errorMessage = 'Adding product failed';
              break;
            default:
              errorMessage = 'An error occurred';
          }

          return throwError(errorMessage);
        }),
        map((response: IAddProductResponse) => response.data!)
      );
  }

  /**
   * Handler for getting product
   * @param id id field of getting product form
   * @returns string Observable
   */
  public getProduct(id: string): Observable<IProductInterface> {
    return this.httpProductService.getProduct(id).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage: string;

        switch (errorResponse.status) {
          case 400:
            errorMessage = 'Getting product failed';
            break;
          default:
            errorMessage = 'An error occurred';
        }

        return throwError(errorMessage);
      }),
      map((response: IGetProductResponse) => response.data!)
    );
  }

  /**
   * Handler for getting products
   * @returns string Observable
   */
  public getProducts(
    gender?: ProductGender,
    category?: ProductCategory
  ): Observable<IProductInterface[]> {
    return this.httpProductService.getProducts(gender, category).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage: string;

        switch (errorResponse.status) {
          case 400:
            errorMessage = 'Getting products failed';
            break;
          default:
            errorMessage = 'An error occurred';
        }

        return throwError(errorMessage);
      }),
      map((response: IGetProductsResponse) => response.data!)
    );
  }

  /**
   * Handler for getting categories
   * @returns categories object array Observable
   */
  public getCategories(): Observable<ISelectDataItem[]> {
    return this.httpProductService.getCategories().pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage: string;

        switch (errorResponse.status) {
          default:
            errorMessage = 'An error occurred';
        }

        return throwError(errorMessage);
      }),
      map((response: IGetCategoriesResponse) => response.data!)
    );
  }

  /**
   * Handler for getting genders
   * @returns genders object array Observable
   */
  public getGenders(): Observable<ISelectDataItem[]> {
    return this.httpProductService.getGenders().pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage: string;

        switch (errorResponse.status) {
          default:
            errorMessage = 'An error occurred';
        }

        return throwError(errorMessage);
      }),
      map((response: IGetGendersResponse) => response.data!)
    );
  }
}
