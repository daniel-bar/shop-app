import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss'],
})
export class UserComponent implements OnInit {
  private _formSubmitFailed: boolean = false;
  public _errorMessage!: string;

  public form!: FormGroup;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
      ]),
      newEmail: new FormControl(null, Validators.email),
      newPassword: new FormControl(null, Validators.minLength(7)),
      newPasswordRepeat: new FormControl(null, Validators.minLength(7)),
    });
  }

  /**
   * Getter for failure of form submit property
   * @returns boolean
   */
  public getFormSubmitFailed() {
    return this._formSubmitFailed;
  }

  /**
   * Getter for error of form
   * @returns boolean
   */
  public getFormError() {
    return this._errorMessage;
  }

  /**
   * Handler for form submit
   * @returns void
   */
  public onSubmit() {
    if (!this.form.valid) {
      this._formSubmitFailed = true;
      return;
    } else if (
      this.form.get('newPassword')!.value !==
      this.form.get('newPasswordRepeat')!.value
    ) {
      this._formSubmitFailed = true;
      return;
    }

    this._formSubmitFailed = false;

    this.userService
      .editUserDetails(
        this.form.get('password')!.value,
        this.form.get('newEmail')?.value,
        this.form.get('newPassword')?.value
      )
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error: string) => {
          this._errorMessage === error;
        }
      );
  }
}
