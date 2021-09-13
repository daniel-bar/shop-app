import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';

import { IProductInterface, Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  private _subscriptions: Subscription[] = [];
  private _products: Product[] = [];
  private _noProducts: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this._subscriptions.push(
      this.route.data.subscribe((data: Data) => {
        const products = data['products'] as IProductInterface[];
        console.log(products)
        
        if (products.length === 0) {
          this._noProducts = true;
          return;
        }
        
        this._noProducts = false;
    
        this._products = products.map((product) => new Product(product));
    }));
  }

  ngOnDestroy() {
    for (const subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }

  /**
   * Getter for when there are no products
   * @returns boolean
   */
  public getNoProducts() {
    return this._noProducts;
  }

  /**
   * Getter for products of the model in the DB
   * @returns products array of the model
   */
  public getProduct() {
    return this._products;
  }
}
