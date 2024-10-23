import { Injectable } from "@angular/core";
import { TimeoutManager } from "./timeout-manager.service";

enum RelativeTargetPosition{
    ABOVE_OR_BETWEEN,
    BELOW,
}

interface IntersectionOptions{
    threshold?: number,
    emitCooldown?: number,
    transitionMargin?: number
}

@Injectable({
    providedIn: 'root'
})
export class IntersectionManager{
    constructor(private _timeoutManager: TimeoutManager){}

    public detectIntersection(
        targetElement: HTMLElement,
        handleIntersectionCallback?: () => void,
        handleExitIntersectionCallback?: () => void,
        intersectionOptions?: IntersectionObserverInit){

        const intersectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting)
                    handleIntersectionCallback?.();
                else
                    handleExitIntersectionCallback?.();
            });
        }, intersectionOptions);
        intersectionObserver.observe(targetElement);
    }

    public detectRelativePosition(
        rootElement: HTMLElement,
        targetElement: HTMLElement,
        handleAboveOrInsideRoot?: () => void,
        handleBelowRootElement?: () => void,
        intersectionOptions?: IntersectionOptions
        ){

            const options: IntersectionOptions = this.buildOptions(intersectionOptions);
            let currentRelativePosition: RelativeTargetPosition | undefined;
            let emittedTime: number | undefined;
            
            let checkIntersectionCallback = () => {
                let newRelativePosition = this.calcRelativeTargetPosition(rootElement, targetElement, options.threshold!, options.transitionMargin!);
                if (currentRelativePosition != newRelativePosition){
                    currentRelativePosition = newRelativePosition;
                    const updateEmittionCallback = () => {
                        emittedTime = 
                            this.emitRelativeTargetPosition(
                                currentRelativePosition!,
                                handleAboveOrInsideRoot,
                                handleBelowRootElement);
                    };
                    if (newRelativePosition === RelativeTargetPosition.ABOVE_OR_BETWEEN){
                        updateEmittionCallback();
                    }
                    else{
                        this._timeoutManager.runCallbackAfterDelay(
                            updateEmittionCallback,
                            options.emitCooldown!, emittedTime || Date.now())
                    }
                }
            }

            window.addEventListener('scroll', checkIntersectionCallback);
            window.addEventListener('resize', checkIntersectionCallback);
            window.addEventListener('load', checkIntersectionCallback);
    }

    //Returns the time at which the callback fired
    private emitRelativeTargetPosition(
        relativePosition: RelativeTargetPosition,
        handleAboveOrInsideRoot: (() => void) | undefined,
        handleBelowRootElement: (() => void) | undefined){

        switch(relativePosition){
            case RelativeTargetPosition.ABOVE_OR_BETWEEN:
                handleAboveOrInsideRoot?.();
                break;
            case RelativeTargetPosition.BELOW:
                handleBelowRootElement?.();
                break;
            default:
                return undefined;
        }
        return Date.now();
    }

    private calcRelativeTargetPosition(rootElement: HTMLElement, targetElement: HTMLElement, threshold: number, transitionMargin: number): RelativeTargetPosition | undefined{
        const [rootRect, targetRect]: [DOMRect, DOMRect] = [rootElement.getBoundingClientRect(), targetElement.getBoundingClientRect()];
        const thresholdPercentage = threshold * rootRect.height;

        if (targetRect.top - transitionMargin <= rootRect.bottom - thresholdPercentage)
            return RelativeTargetPosition.ABOVE_OR_BETWEEN;
        if (targetRect.top - transitionMargin > rootRect.bottom - thresholdPercentage)
            return RelativeTargetPosition.BELOW;

        return undefined;
    }

    private buildOptions(options?: IntersectionOptions): IntersectionOptions{
        const defaultOptions: IntersectionOptions = {
            threshold: 0,
            emitCooldown: 0,
            transitionMargin: 0
        } 

        return { ...defaultOptions, ...options };
    }
}