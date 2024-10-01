import { Component } from '@angular/core';
import { callLink, facebookLink, instagramLink, whatsappLink } from '@root/common/models/socials-links';

@Component({
  selector: 'app-contact-item',
  standalone: true,
  imports: [],
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.scss'
})
export class ContactItemComponent {
  protected readonly whatsappLink = whatsappLink;
  protected readonly instagramLink = instagramLink;
  protected readonly facebookLink = facebookLink;
  protected readonly callLink = callLink;
}
