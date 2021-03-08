import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  imageSrc = '';
  productObject = '';
  imageButtons = [
    { src: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350' },
    { src: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350' },
    { src: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350' }
  ]

  constructor() { }

  ngOnInit() {
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