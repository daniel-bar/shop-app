import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditUserDetailsService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss']
})
export class EditUserDetailsComponent implements OnInit {
  private _formSubmitFailed: boolean = false;

  public form!: FormGroup;

  constructor(
    private editUserDetailsService: EditUserDetailsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'password': new FormControl(null, Validators.required),
      'newEmail': new FormControl(null, [Validators.required, Validators.email]),
      'newPassword': new FormControl(null, Validators.required),
      'newPasswordRepeat': new FormControl(null, Validators.required),
    });
  }

  /**
  * Getter for failure of form submit property
  * @returns boolean
  */
  public getFormSubmitFailed(): boolean {
    return this._formSubmitFailed;
  }

  /**
  * Handler for form submit
  * @returns void
  */
  public onSubmit(): void {
    if (!this.form.valid) {
      this._formSubmitFailed = true;

      return;
    }

    this._formSubmitFailed = false;

    this.editUserDetailsService.editUserDetails(
      this.form.get('password')!.value,
      this.form.get('newEmail')!.value,
      this.form.get('newPassword')!.value,
      this.form.get('newPasswordRepeat')!.value,
    ).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (error: string) => {
        alert(error);
      }
    );
  }
}