export function parseStringDelayToMillis(stringDelay: string) : number{
    
    const value: string = stringDelay.substring(0, stringDelay.length - 1);
    const unit: string = stringDelay.substring(stringDelay.length - 1);

    const numValue: number = parseFloat(value);

    switch (unit) {
        case 's': return numValue * 1000; // seconds to milliseconds
        case 'm': return numValue * 60000; // minutes to milliseconds
        case 'h': return numValue * 3600000; // hours to milliseconds
        default: throw new Error('Unknown time unit.');
    }
}