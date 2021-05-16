import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  imageSrc = '';
  productObject = '';
  product!: {
    title: string;
    description: string;
    price: number;
    image: File;
  }

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.product = data['product'];
        }
      );
  }

  public trackByFunction(index: number, item: any): null | number {
    if (!item) {
      return null;
    }
    return index;
  }

  public onClick(productObject: any) {
    this.imageSrc = productObject.src;
  }
}