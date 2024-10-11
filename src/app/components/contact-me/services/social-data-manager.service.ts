import { Injectable } from "@angular/core";
import { SocialType } from "../models/enums/social-type.enum";
import { SocialData } from "../models/social-data";
import { facebookSvg, instagramSvg, phoneSvg, whatsappSvg } from "@root/common/models/social-svgs";
import { facebookName, instagramName, localPhoneNumber, readableLocalPhoneNUmber } from "@root/common/models/contact-data";

@Injectable({
    providedIn: 'root'
})
export class SocialDataManager{
    private _socialDataDict: { [key in SocialType]: SocialData };

    constructor(){
        this._socialDataDict = {
            [SocialType.PHONE]: new SocialData(phoneSvg, "שיחת טלפון", readableLocalPhoneNUmber),
            [SocialType.WHATSAPP]: new SocialData(whatsappSvg, "וואטסאפ", readableLocalPhoneNUmber),
            [SocialType.INSTAGRAM]: new SocialData(instagramSvg, "אינסטגרם", instagramName),
            [SocialType.FACEBOOK]: new SocialData(facebookSvg, "פייסבוק", facebookName)
        }
    }

    public GetSocialData(socialType: SocialType): SocialData{
        return this._socialDataDict[socialType];
    }
}