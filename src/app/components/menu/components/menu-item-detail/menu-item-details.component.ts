import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { localPhoneNumber } from '@root/app/models/contact-data';
import { CardData } from '../../models/card-data';

@Component({
  selector: 'app-menu-item-details',
  standalone: true,
  imports: [],
  templateUrl: './menu-item-details.component.html',
  styleUrl: './menu-item-details.component.scss'
})
export class MenuItemDetailComponent {
  @Input({ required: true }) cardData!: CardData
  protected readonly localPhoneNumber: string = localPhoneNumber;
  private readonly _hiddenClassName = 'hidden';
  private readonly _nativeElement: HTMLElement;

  constructor(elementRef: ElementRef){
    this._nativeElement = elementRef.nativeElement;
  }

  protected handleClose(){
    console.log(this._nativeElement);
    this._nativeElement.classList.add(this._hiddenClassName);
  }

  Open(){
    this._nativeElement.classList.remove(this._hiddenClassName);
  }
}
