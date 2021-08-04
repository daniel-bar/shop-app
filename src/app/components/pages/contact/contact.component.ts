import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ContactService } from 'src/app/services/contact.service';

import { ISelectDataItem } from '../../../models/shared/select-data';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];
  private _formSubmitFailed: boolean = false;
  private _topics!: ReadonlyArray<ISelectDataItem>;

  public form!: FormGroup;

  constructor(
    private ContactService: ContactService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'topic': new FormControl(null),
      'message': new FormControl(null, Validators.required),
    });

    this._topics = this.route.snapshot.data['topics'];
  }

  ngOnDestroy() {
    for (const subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }

  /**
  * Getter for topics labels
  * @returns topics labels
  */
  public getTopicsLabels() {
    return this._topics.map((topic) => topic.label);
  }

  /**
  * Select handler for selecting topic option
  * @param index the index of the selected option
  * @returns void
  */
  public onOptionSelected(index: number) {
    this.form.patchValue({
      'topic': this._topics[index].value,
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
  * Handler for form submit
  * @returns void
  */
  public onSubmit() {
    if (!this.form.valid) {
      this._formSubmitFailed = true;
      return;
    }

    this._formSubmitFailed = false;

    this._subscriptions = [
      ...this._subscriptions,
      this.ContactService.contact(
        this.form.get('topic')!.value,
        this.form.get('message')!.value,
      ).subscribe(
        () => {
          alert('Message has been sent!');
        },
        (error: string) => {
          alert(error);
        }),
    ];
  }
}
