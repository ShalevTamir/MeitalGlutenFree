import { Component } from '@angular/core';
import { ContactItemComponent } from "./components/contact-item/contact-item.component";
import { SocialDataManager } from './services/social-data-manager.service';
import { SocialType } from './models/enums/social-type.enum';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [ContactItemComponent],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss'
})
export class ContactMeComponent {
  constructor(private _socialDataManager: SocialDataManager){}

  protected get PhoneSocialData(){
    return this._socialDataManager.GetSocialData(SocialType.PHONE);
  }

  protected get WhatsappSocialData(){
    return this._socialDataManager.GetSocialData(SocialType.WHATSAPP);
  }

  protected get InstagramSocialData(){
    return this._socialDataManager.GetSocialData(SocialType.INSTAGRAM);
  }

  protected get FacebookSocialData(){
    return this._socialDataManager.GetSocialData(SocialType.FACEBOOK);
  }

}
