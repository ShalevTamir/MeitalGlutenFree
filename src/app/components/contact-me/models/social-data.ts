import { SafeHtml } from "@angular/platform-browser";
import { SocialType } from "./enums/social-type.enum";

export class SocialData{
    constructor(private type: SocialType, private imgSvg: SafeHtml, private description: string, private value: string, private link: string){}

    public get Type(): SocialType{
        return this.type;
    }

    public get ImgSvg(): SafeHtml{
        return this.imgSvg;
    } 

    public get Description(): string{
        return this.description;
    }

    public get Value(): string{
        return this.value;
    }

    public get Link(): string{
        return this.link;
    }
}