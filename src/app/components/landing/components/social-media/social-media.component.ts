import { Component} from '@angular/core';
import { internationalPhoneNumber, localPhoneNumber } from '@root/common/models/contact-data';

@Component({
  selector: 'app-social-media',
  standalone: true,
  imports: [],
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.scss'
})
export class SocialMediaComponent {
  protected readonly localPhoneNumber: string = localPhoneNumber;
  protected readonly internationalPhoneNumber: string = internationalPhoneNumber;
}
