import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { readableLocalPhoneNUmber } from '@root/common/models/contact-data';
import { CardData } from '../../models/card-data';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { parseStringDelayToMillis } from './services/timeUtils';
import { ViewState } from './enums/view-state.enums';
import { stopEventPropagation } from '@root/common/utils/htmlUtils';
import { BodyScrollHandler } from '@root/common/services/body-scroll-handler.service';
import { SocialDataManager } from '@root/common/services/social-data-manager.service';
import { SocialData } from '@root/app/components/contact-me/models/social-data';
import { SocialType } from '@root/app/components/contact-me/models/enums/social-type.enum';
import { NgClass } from '@angular/common';

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
  imports: [NgClass],
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
  private readonly _hiddenClassName = 'hidden';
  private readonly _nativeElement: HTMLElement;
  protected state = ViewState.CLOSE;
  protected cardData!: CardData
  protected stopPropagationFuncRef = stopEventPropagation
  protected phoneSocialData: SocialData;
  protected whatsappSocialData: SocialData;

  constructor(private _bodyScrollHandler: BodyScrollHandler, private _socialDataManager: SocialDataManager ,elementRef: ElementRef){
    this._nativeElement = elementRef.nativeElement;      
    this.phoneSocialData = _socialDataManager.GetSocialData(SocialType.PHONE);
    this.whatsappSocialData = _socialDataManager.GetSocialData(SocialType.WHATSAPP);
  }

  setCardData(cardData: CardData){
    this.cardData = cardData;
  }

  protected close(){
    this.toggleState(ViewState.CLOSE);   
    this._bodyScrollHandler.enableScroll();
  }
  
  open(){
    this.toggleState(ViewState.OPEN);
    this._bodyScrollHandler.disableScroll();
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
