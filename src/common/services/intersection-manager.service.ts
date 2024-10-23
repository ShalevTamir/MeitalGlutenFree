import { Injectable } from "@angular/core";
import { RelativePosition } from "../models/enums/relative-target-position.enum";
import { injectDefaultValues } from "../utils/objectUtils";

interface IntersectionOptions{
    //The percentage of the root element from the top, that the target element will have to touch in order to emit a RelativeTargetPosition.ABOVE or RelativeTargetPosition.BETWEEN
    topThreshold?: number,
    //The percentage of the root element from the bottom that the target element will have to cover in order to emit a RelativeTargetPosition.BELOW or RelativeTargetPosition.BETWEEN
    bottomThreshold?: number
}

@Injectable({
    providedIn: 'root'
})
export class IntersectionManager{
    private readonly _defaultIntersectionOptions: IntersectionOptions;

    constructor(){
        this._defaultIntersectionOptions = {
            topThreshold: 0,
            bottomThreshold: 0
        }
    }

    public detectIntersection(
        targetElement: HTMLElement,
        intersectionCallback: (isIntersecting: boolean) => void,
        intersectionOptions?: IntersectionObserverInit){

        const intersectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                intersectionCallback(entry.isIntersecting);
            });
        }, intersectionOptions);
        intersectionObserver.observe(targetElement);
    }

    public detectRelativePosition(
        rootElement: HTMLElement,
        targetElement: HTMLElement,
        intersectionCallback: (relativePosition: RelativePosition) => void,
        intersectionOptions?: IntersectionOptions
        ){

            const optionsWithDefaults: IntersectionOptions = injectDefaultValues(this._defaultIntersectionOptions, intersectionOptions);
            const topThresholdInPixels = rootElement.getBoundingClientRect().height * optionsWithDefaults.topThreshold!;
            const bottomThresholdInPixels = rootElement.getBoundingClientRect().height * optionsWithDefaults.bottomThreshold!;

            let targetRelativePosition: RelativePosition | undefined;
            let checkIntersectionCallback = () => {
                let newRelativePosition = this.calcRelativeTargetPosition(rootElement, targetElement, topThresholdInPixels, bottomThresholdInPixels);

                if (targetRelativePosition != newRelativePosition){
                    targetRelativePosition = newRelativePosition;
                    intersectionCallback(targetRelativePosition)                            
                }
            }

            window.addEventListener('scroll', checkIntersectionCallback);
            window.addEventListener('resize', checkIntersectionCallback);
            window.addEventListener('load', checkIntersectionCallback);
    }
   
    private calcRelativeTargetPosition(rootElement: HTMLElement, targetElement: HTMLElement, topThresholdInPixels: number, bottomThresholdInPixels: number): RelativePosition{
        const [rootRect, targetRect]: [DOMRect, DOMRect] = [rootElement.getBoundingClientRect(), targetElement.getBoundingClientRect()];
        const topThresholdPosition = rootRect.top + topThresholdInPixels;
        const bottomThresholdPosition = rootRect.bottom - bottomThresholdInPixels;
        
        if (targetRect.top < topThresholdPosition || targetRect.bottom < topThresholdPosition)
            return RelativePosition.ABOVE;
        if (targetRect.top > bottomThresholdPosition || targetRect.bottom > bottomThresholdPosition)
            return RelativePosition.BELOW;
        else
            return RelativePosition.BETWEEN;
    }
}