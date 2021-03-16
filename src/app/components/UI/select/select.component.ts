import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  private _open: boolean = false;

  @ViewChild('button') private _$button: ElementRef;

  @Input('options') public options: string[] = [];
  @Input('placeholder') public placeholder: string = 'Select';
  @Input('width') public width: string = '200px';

  constructor() { }

  ngOnInit(): void {
  }

  public trackByFunction(index: number, item: any): null | number {
    return !item ? null : index;
  }

  @HostListener('window:click', ['$event']) private onWinClicked(event: MouseEvent): void {
    if (
      this._open &&
      event.target !== this._$button.nativeElement &&
      !(this._$button.nativeElement as HTMLButtonElement).contains(event.target as HTMLElement)
    ) {
      this._open = false;
    }
  }

  /**
  * Getter for open flag 
  * @returns boolean indicated whether select options are open
  */
  public getOpen(): boolean {
    return this._open;
  }

  /**
  * Handler for clicking the select
  * @returns void
  */
  public onClick(): void {
    this._open = !this._open;
  }

  /**
  * Handler for selecting an option
  * @param index the index of the selected option in the options input array
  * @returns void
  */
  public onSelect(index: number): void {
    this.placeholder = this.options[index];
  }
}
