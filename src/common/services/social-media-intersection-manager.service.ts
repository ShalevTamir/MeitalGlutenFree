import { Injectable } from "@angular/core";
import { IntersectionDetector } from "./intersection-detector.service";

@Injectable({
    providedIn: 'root'
})
export class SocialMediaBoundriesManager{
    private _resolveBottomBoundaryPromise!: (boundaryElement: HTMLElement) => void;
    private _resolveTopBoundaryPromise!: (boundaryElement: HTMLElement) => void;

    private _bottomBoundaryPromise: Promise<HTMLElement>;
    private _topBoundaryPromise: Promise<HTMLElement>;

    constructor(private _intersectionDetector: IntersectionDetector){
        this._bottomBoundaryPromise = new Promise((resolveMethod) => {
            this._resolveBottomBoundaryPromise = resolveMethod;
        })
        this._topBoundaryPromise = new Promise((resolveMethod) => {
            this._resolveTopBoundaryPromise = resolveMethod;
        })
    }

    public setBottomBoundaryElement(boundaryElement: HTMLElement){
        this._resolveBottomBoundaryPromise(boundaryElement);
    }

    public setTopBoundaryElement(boundaryElement: HTMLElement){
        this._resolveTopBoundaryPromise(boundaryElement);
    }

    public async setTopBoundaryHandlers(
        socialMediaWrapper: HTMLElement,
        handleAboveBoundary: () => void,
        handleBelowBoundary: () => void,
        closeAnimationDuration: number,
        elementHeight: number){
            const boundaryElement = await this._topBoundaryPromise;
            this._intersectionDetector.detectRelativePosition(
                boundaryElement,
                socialMediaWrapper,
                handleAboveBoundary,
                handleBelowBoundary,
                { threshold: 0.2,  emitCooldown: closeAnimationDuration, transitionMargin: elementHeight}
            )
    }

    public async setBottomBoundaryHandlers(handleIntersectionCallback?: () => void, handleExitIntersectionCallback?: () => void){
        const boundaryElement = await this._bottomBoundaryPromise;

        this._intersectionDetector.detectIntersection(
            boundaryElement,
            handleIntersectionCallback,
            handleExitIntersectionCallback,
            {threshold: 0.8}
        )
    }
}