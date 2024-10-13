import { Injectable } from "@angular/core";
import { SocialType } from "../models/enums/social-type.enum";
import { SocialData } from "../models/social-data";
import { facebookName, instagramName, localPhoneNumber, readableLocalPhoneNUmber } from "@root/common/models/contact-data";
import { SocialSvgs } from "@root/common/models/social-svgs";

@Injectable({
    providedIn: 'root'
})
export class SocialDataManager{
    private _socialDataDict: { [key in SocialType]: SocialData };

    constructor(socialSvgs: SocialSvgs){
        this._socialDataDict = {
            [SocialType.PHONE]: new SocialData(socialSvgs.PhoneSvg, "שיחת טלפון", readableLocalPhoneNUmber),
            [SocialType.WHATSAPP]: new SocialData(socialSvgs.WhatsappSvg, "וואטסאפ", readableLocalPhoneNUmber),
            [SocialType.INSTAGRAM]: new SocialData(socialSvgs.InstagramSvg, "אינסטגרם", instagramName),
            [SocialType.FACEBOOK]: new SocialData(socialSvgs.FacebookSvg, "פייסבוק", facebookName)
        }
    }

    public GetSocialData(socialType: SocialType): SocialData{
        return this._socialDataDict[socialType];
    }
}