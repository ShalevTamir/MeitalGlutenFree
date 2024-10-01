import { Component} from '@angular/core';
import { internationalPhoneNumber, localPhoneNumber } from '@root/common/models/contact-data';
import { callLink, facebookLink, instagramLink, whatsappLink } from '@root/common/models/socials-links';

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
}
