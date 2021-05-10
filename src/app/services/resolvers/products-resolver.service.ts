import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpProductService } from '../http/http-product.service';
import { IProductInterface } from '../../models/product.model';
import { ProductService } from '../product.service';

@Injectable()
export class ProductsResolver implements Resolve<IProductInterface> {

    constructor(private productService: ProductService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductInterface> {
        return this.productService.getProducts(route.paramMap.get('id')!);
    }
}