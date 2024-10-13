import { Component, Input } from '@angular/core';
import { callLink, facebookLink, instagramLink, whatsappLink } from '@root/common/models/socials-links';
import { SocialData } from '../../models/social-data';

@Component({
  selector: 'app-contact-item',
  standalone: true,
  imports: [],
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.scss'
})
export class ContactItemComponent {
  @Input({required: true}) socialData!: SocialData;
}
