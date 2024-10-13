import { Component} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { internationalPhoneNumber, localPhoneNumber } from '@root/common/models/contact-data';
import { SocialSvgs } from '@root/common/models/social-svgs';
import { callLink, facebookLink, instagramLink, whatsappLink } from '@root/common/models/socials-links';
import { SvgGenerator as SvgGenerator } from '@root/common/services/svg-generator.service';

@Component({
  selector: 'app-social-media',
  standalone: true,
  imports: [],
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.scss'
})
export class SocialMediaComponent {
  protected readonly whatsappLink = whatsappLink;
  protected readonly instagramLink = instagramLink;
  protected readonly facebookLink = facebookLink;
  protected readonly callLink = callLink;

  constructor(protected SocialsSvgs: SocialSvgs){}
}
