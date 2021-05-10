import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private _formSubmitFailed: boolean = false;

  public form!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'fullname': new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(26),
      ]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      'repeatPassword': new FormControl(null, Validators.required),
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

    this.authService.register(
      this.form.get('fullname')!.value,
      this.form.get('email')!.value,
      this.form.get('password')!.value,
    ).subscribe(
      (user) => {
        this.authService.setAuthenticatedUser(user, true);
        this.router.navigate(['/']);
      },
      (error: string) => {
        alert(error);
      }
    );
  }
}
