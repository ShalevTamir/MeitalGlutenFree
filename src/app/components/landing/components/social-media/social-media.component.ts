import { Component} from '@angular/core';

@Component({
  selector: 'app-social-media',
  standalone: true,
  imports: [],
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.scss'
})
export class SocialMediaComponent {
  protected readonly localPhoneNumber: string = "0525696806";
  protected readonly internationalPhoneNumber: string = "972" + this.localPhoneNumber.slice(1);    
}
