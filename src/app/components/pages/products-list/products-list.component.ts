import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductInterface, Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsComponent implements OnInit {
  private _subscriptions: Subscription[] = [];
  private _products: Product[] = [];
  private _noProducts: boolean = false;

  product!: {
    title: string;
    description: string;
    price: number;
    image: File;
  }

  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    this._subscriptions.push(
      this.route.data.subscribe((data: Data) => {
        const products = data['products'] as IProductInterface[];
        
        if (products.length === 0) {
          this._noProducts = true;
          return;
        }
        
        this._noProducts = false;
    
        this._products = products.map((product) => new Product(product));
        console.log(this._products)
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
