import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TimeoutManager{
    private _timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;

    runCallbackAfterDelay(callback: () => void, delay: number, previouslyEmittedTime: number){
        if (this._timeoutId){
            clearTimeout(this._timeoutId);
        }

        const timeToWait = delay - (Date.now() - previouslyEmittedTime);

        if (timeToWait > 0){
            this._timeoutId = setTimeout(() => {
                callback();
                this._timeoutId = undefined;
            }, timeToWait);
        }
        else{
            callback();
        }
    }
}