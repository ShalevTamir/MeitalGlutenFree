export enum SocialType{
    WHATSAPP,
    PHONE,
    INSTAGRAM,
    FACEBOOK
}

export function getParsedName(socialType: SocialType): string{
    return SocialType[socialType].charAt(0).toUpperCase() + SocialType[socialType].substring(1).toLowerCase();
}