import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IProductInterface } from '../../models/product.model';
import { UserService } from '../user.service';


@Injectable()
export class InBagProductsResolver implements Resolve<IProductInterface[]> {

    constructor(private userSerivce: UserService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductInterface[]> {
        return this.userSerivce.getInBagProducts(route.paramMap.get('id')!);
    }
}