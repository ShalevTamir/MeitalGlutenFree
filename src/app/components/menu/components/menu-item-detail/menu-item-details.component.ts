import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { localPhoneNumber } from '@root/app/models/contact-data';
import { CardData } from '../../models/card-data';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { parseStringDelayToMillis } from './services/timeUtils';
import { ViewState } from './enums/view-state.enums';
import { stopEventPropagation } from '@root/common/utils/htmlUtils';

const animationDuration = '0.4s';
const openStateStyle = style({
  clipPath: 'circle(150% at top right)',
  opacity: '1'
});
const closedStateStyle = style({
  clipPath: 'circle(0 at top right)',
  opacity: '0.5'
})
const animationConfig = animationDuration + ' ease-in-out';

@Component({
  selector: 'app-menu-item-details',
  standalone: true,
  imports: [],
  templateUrl: './menu-item-details.component.html',
  styleUrl: './menu-item-details.component.scss',
  animations: [
    trigger('openClose', [
      state('open', openStateStyle),
      state('closed', closedStateStyle),
      transition('closed => open', [animate(animationConfig)]),
      transition(':enter', [closedStateStyle, animate(animationConfig, openStateStyle)])
    ])
  ]
})
export class MenuItemDetailComponent{
  @Input({ required: true }) cardData!: CardData
  protected readonly localPhoneNumber: string = localPhoneNumber;
  private readonly _hiddenClassName = 'hidden';
  private readonly _nativeElement: HTMLElement;
  protected state = ViewState.CLOSE;
  protected stopPropagationFuncRef = stopEventPropagation

  constructor(elementRef: ElementRef){
    this._nativeElement = elementRef.nativeElement;
  }

  protected close(){
    this.toggleState(ViewState.CLOSE);
  }

  open(){
    this.toggleState(ViewState.OPEN);
  }

  viewStateToAnimationState(){
    switch(this.state){
      case ViewState.OPEN:
        return 'open';
      case ViewState.CLOSE:
        return 'closed';
    }
  }

  toggleState(state: ViewState){
    this.state = state;
    switch(this.state){
      case ViewState.OPEN:
        this._nativeElement.classList.remove(this._hiddenClassName);
        break;
      case ViewState.CLOSE:
        this._nativeElement.classList.add(this._hiddenClassName);
        break;
    }
  }
}
