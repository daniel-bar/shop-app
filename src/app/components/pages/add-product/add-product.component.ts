import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

// import { mimeType } from "./mime-type.validator";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  private _imagePreview!: string;

  public form!: FormGroup;

  constructor() { }

  ngOnInit() {
    // this.form = new FormGroup({
    //   title: new FormControl(null, {
    //     validators: [Validators.required, Validators.minLength(3)]
    //   }),
    //   content: new FormControl(null, { validators: [Validators.required] }),
    //   image: new FormControl(null, {
    //     validators: [Validators.required],
    //     asyncValidators: [mimeType]
    //   })
    // });
  }

  /**
  * Handler for picking an image
  * @param event The pick event
  * @returns void
  */
  // public onImagePicked({ target }: Event): void {
  //   const file = (target as HTMLInputElement).files[0];
  //   this.form.patchValue({ image: file });
  //   this.form.get('image').updateValueAndValidity();
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this._imagePreview = reader.result as string;
  //   };
  //   reader.readAsDataURL(file);
  // }

  /**
  * Getter for image preview
  * @returns string
  */
  public getImagePreview(): string {
    return this._imagePreview;
  }
}
