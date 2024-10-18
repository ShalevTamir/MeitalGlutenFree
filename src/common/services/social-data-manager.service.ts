import { Injectable } from "@angular/core";
import { SocialType } from "../../app/components/contact-me/models/enums/social-type.enum";
import { SocialData } from "../../app/components/contact-me/models/social-data";
import { facebookName, instagramName, localPhoneNumber, readableLocalPhoneNUmber } from "@root/common/models/contact-data";
import { SocialSvgs } from "@root/common/models/social-svgs";
import { callLink, facebookLink, instagramLink, whatsappLink } from "../models/socials-links";

@Injectable({
    providedIn: 'root'
})
export class SocialDataManager{
    private _socialDataDict: { [key in SocialType]: SocialData };

    constructor(socialSvgs: SocialSvgs){
        this._socialDataDict = {
            [SocialType.PHONE]: 
                new SocialData(
                    SocialType.PHONE,
                    socialSvgs.GetSocialSvg(SocialType.PHONE),
                    "שיחת טלפון",
                    readableLocalPhoneNUmber, 
                    callLink),

            [SocialType.WHATSAPP]:
                new SocialData(
                    SocialType.WHATSAPP,
                    socialSvgs.GetSocialSvg(SocialType.WHATSAPP),
                    "וואטסאפ",
                    readableLocalPhoneNUmber,
                    whatsappLink),

            [SocialType.INSTAGRAM]:
                new SocialData(
                    SocialType.INSTAGRAM,
                    socialSvgs.GetSocialSvg(SocialType.INSTAGRAM),
                    "אינסטגרם",
                    instagramName,
                    instagramLink),
            [SocialType.FACEBOOK]:
                new SocialData(
                    SocialType.FACEBOOK,
                    socialSvgs.GetSocialSvg(SocialType.FACEBOOK),
                    "פייסבוק",
                    facebookName,
                    facebookLink)
        }
    }

    public GetSocialData(socialType: SocialType): SocialData{
        return this._socialDataDict[socialType];
    }

    public GetAllSocials(): SocialData[]{
        return Object.values(this._socialDataDict);
    }
}