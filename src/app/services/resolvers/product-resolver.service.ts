import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IProductInterface } from '../../models/product.model';
import { ProductService } from '../product.service';


@Injectable()
export class ProductResolver implements Resolve<IProductInterface> {

    constructor(private productService: ProductService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductInterface> {
        return this.productService.getProduct(route.paramMap.get('id')!);
    }
}