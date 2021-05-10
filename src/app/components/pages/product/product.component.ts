import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Data } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  imageSrc = '';
  productObject = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.router = data['product'];
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