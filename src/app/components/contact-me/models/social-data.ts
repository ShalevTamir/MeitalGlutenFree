import { SafeHtml } from "@angular/platform-browser";

export class SocialData{
    constructor(private imgSvg: SafeHtml, private description: string, private value: string){}

    public get ImgSvg(): SafeHtml{
        return this.imgSvg;
    } 

    public get Description(): string{
        return this.description;
    }

    public get Value(): string{
        return this.value;
    }
}