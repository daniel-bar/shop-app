import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ContactService } from 'src/app/services/contact.service';

import { Topic } from '../../../models/contact.model';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  private _formSubmitFailed: boolean = false;

  public form!: FormGroup;

  public options: Topic[] = [Topic.Delivery, Topic.OrderIssues, Topic.ReturnsAndRefunds, Topic.Technical];

  constructor(
    private ContactService: ContactService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'topic': new FormControl('delivery'),
      'message': new FormControl(null, Validators.required),
    });
  }

  public onOptionSelected(index: number): void {
    this.form.patchValue({ 'topic': this.options[index] });
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

    this.ContactService.contact(
      this.form.get('topic')!.value,
      this.form.get('message')!.value,
    ).subscribe(
      () => {
        alert('Message has been sent!');
      },
      (error: string) => {
        alert(error);
      });
    this.form.reset();
  }
}
