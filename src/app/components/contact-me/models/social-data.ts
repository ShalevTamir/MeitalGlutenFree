export class SocialData{
    constructor(private imgSvg: string, private description: string, private value: string){}

    public get ImgSvg(): string{
        return this.imgSvg;
    } 

    public get Description(): string{
        return this.description;
    }

    public get Value(): string{
        return this.value;
    }
}