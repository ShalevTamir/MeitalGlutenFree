import { AfterViewInit, Component, ElementRef, Input, ViewChild, ViewContainerRef} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SocialDataManager } from '@root/common/services/social-data-manager.service';
import { internationalPhoneNumber, localPhoneNumber } from '@root/common/models/contact-data';
import { SocialSvgs } from '@root/common/models/social-svgs';
import { callLink, facebookLink, instagramLink, whatsappLink } from '@root/common/models/socials-links';
import { SvgGenerator as SvgGenerator } from '@root/common/services/svg-generator.service';
import { SocialData } from '@root/app/components/contact-me/models/social-data';
import { NgFor } from '@angular/common';
import { getParsedName, SocialType } from '@root/app/components/contact-me/models/enums/social-type.enum';
import { BottomScrollDetector } from '@root/common/services/bottom-scroll-detector.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IntersectionDetector } from '@root/common/services/intersection-detector.service';
import { SocialMediaBoundriesManager } from '@root/common/services/social-media-intersection-manager.service';
import { secondsToMillis } from '@root/common/utils/timeUtils';

const animationDuration = '0.2s';
const openStateStyle = style({
  transform: 'translateY(0px)'
  // bottom: '0'
});
const closedStateStyle = style({
  transform: 'translateY(70px)'
  // bottom: '-70px'
});
const animationConfig = animationDuration + ' ease-in-out';

@Component({
  selector: 'app-social-media',
  standalone: true,
  imports: [NgFor],
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.scss',
  animations: [
    trigger('openClose', [
      state('open', openStateStyle),
      state('closed', closedStateStyle),
      transition('closed <=> open', [animate(animationConfig)])
    ])
  ]
})
export class SocialMediaComponent implements AfterViewInit {
  
  @ViewChild("animationWrapper") private _animationWrapper!: ElementRef<HTMLElement>;
  @ViewChild("wrapper") private _wrapper!: ElementRef<HTMLElement>;

  // protected readonly minimumScreenSize: string = "700px";
  protected socials: SocialData[];
  protected getSocialTypeName: (socialType: SocialType) => string = getParsedName;
  protected isOpen = true;

  constructor(socialDataManager: SocialDataManager, private _boundriesManager: SocialMediaBoundriesManager){
    this.socials = socialDataManager.GetAllSocials();
  }

  ngAfterViewInit(): void {
    this._boundriesManager.setBottomBoundaryHandlers(
      this.hideComponent.bind(this),
      this.showComponent.bind(this)
    )

    const elementHeight = this._wrapper.nativeElement.getBoundingClientRect().height;
    const numericalAnimationDuration = secondsToMillis(Number(animationDuration.slice(0, -1)));

    this._boundriesManager.setTopBoundaryHandlers(
      this._animationWrapper.nativeElement,
      this.hideComponent.bind(this),  
      this.showComponent.bind(this),
      numericalAnimationDuration,
      elementHeight
    )
  }

  private hideComponent(){
    this.isOpen = false;
  }

  private showComponent(){
    this.isOpen = true;
  }

}
