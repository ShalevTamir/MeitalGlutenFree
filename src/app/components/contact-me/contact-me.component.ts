import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ContactItemComponent } from "./components/contact-item/contact-item.component";
import { SocialDataManager } from '../../../common/services/social-data-manager.service';
import { SocialType } from './models/enums/social-type.enum';
import { SocialData } from './models/social-data';
import { NgFor } from '@angular/common';
import { BottomScrollDetector } from '@root/common/services/bottom-scroll-detector.service';
import { IntersectionManager } from '@root/common/services/intersection-manager.service';
import { RefHtmlElement } from '@root/common/interfaces/RefHtmlElement.interface';
import { ScrollHandler } from '@root/common/services/scroll-handler.service';
import { SocialMediaBoundariesManager } from '../social-media/services/social-media-boundaries-manager.service';
import { BoundaryType } from '../social-media/models/enums/boundary-type.enums';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [ContactItemComponent, NgFor],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss'
})
export class ContactMeComponent implements RefHtmlElement{
  htmlRef: HTMLElement;
  constructor(private _socialDataManager: SocialDataManager, scrollHandler: ScrollHandler, socialMediaBoundriesManager: SocialMediaBoundariesManager, elementRef: ElementRef){
    this.htmlRef = elementRef.nativeElement;
    scrollHandler.AddScrollItem(this);
    socialMediaBoundriesManager.setBoundaryElement(BoundaryType.BOTTOM, this.htmlRef);
  }

  protected get socials(): SocialData[]{
    return this._socialDataManager.GetAllSocials();
  }  

  protected IsFacebookSocialData(socialData: SocialData): boolean{
    return socialData === this._socialDataManager.GetSocialData(SocialType.FACEBOOK);
  }
}
