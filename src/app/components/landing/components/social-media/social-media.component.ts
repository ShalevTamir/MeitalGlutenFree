import { AfterViewInit, Component, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
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

@Component({
  selector: 'app-social-media',
  standalone: true,
  imports: [NgFor],
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.scss'
})
export class SocialMediaComponent implements AfterViewInit {
  @ViewChild('wrapper') private _wrapper!: ElementRef<HTMLElement>;

  private _defaultDisplayValue: string = 'flex';
  protected socials: SocialData[];
  protected getSocialTypeName: (socialType: SocialType) => string = getParsedName

  constructor(socialDataManager: SocialDataManager, bottomScrollDetector: BottomScrollDetector){
    bottomScrollDetector.ReachedBottomEvent.subscribe(this.hideComponent.bind(this));
    bottomScrollDetector.ScrolledAboveBottomEvent.subscribe(this.showComponent.bind(this));
    this.socials = socialDataManager.GetAllSocials();
  }

  ngAfterViewInit(): void {
    this._defaultDisplayValue = this._wrapper.nativeElement.style.display || this._defaultDisplayValue;
  }

  private hideComponent(){
    this._wrapper.nativeElement.style.display = 'none';
  }

  private showComponent(){
    this._wrapper.nativeElement.style.display = this._defaultDisplayValue;
  }

}
