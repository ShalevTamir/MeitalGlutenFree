import { Injectable } from "@angular/core";
import { IntersectionManager } from "../../../../common/services/intersection-manager.service";
import { RelativePosition } from "../../../../common/models/enums/relative-target-position.enum";
import { BoundaryType } from "../models/enums/boundary-type.enums";
import { LazyValue } from "@root/common/models/lazy-value";
import { Observable, Subject } from "rxjs";

interface Boundary{
    value: LazyValue<HTMLElement>
    targetRelativePosition?: RelativePosition
}

@Injectable({
    providedIn: 'root'
})
export class SocialMediaBoundariesManager{
    private _boundaries: Map<BoundaryType, Boundary>; 

    private _targetElement: LazyValue<HTMLElement>;    
    private _relativePosition: RelativePosition | undefined;
    private _relativePositionUpdated: Subject<RelativePosition>;
    
    constructor(intersectionManager: IntersectionManager){
        this._boundaries = new Map();
        this._relativePositionUpdated = new Subject();
        this._targetElement = new LazyValue();

        this._boundaries.set(BoundaryType.TOP, { value: new LazyValue<HTMLElement>() });
        this._boundaries.set(BoundaryType.BOTTOM, { value: new LazyValue<HTMLElement>() });

        this.initHandlers(intersectionManager);
    }

    public setBoundaryElement(boundaryType: BoundaryType, boundaryElement: HTMLElement){
        const boundaryLazyValue = this._boundaries.get(boundaryType)?.value;
        boundaryLazyValue?.SetValue(boundaryElement);
    }

    public setTargetElement(targetElement: HTMLElement){
        this._targetElement.SetValue(targetElement);
    }

    public get RelativePositionUpdate(): Observable<RelativePosition>{
        return this._relativePositionUpdated.asObservable();
    }

    private async initHandlers(intersectionManager: IntersectionManager){
        const targetElement = await this._targetElement.GetValue();
        
        const bottomBoundary = this._boundaries.get(BoundaryType.BOTTOM);
        const bottomBoundaryElement: HTMLElement = await bottomBoundary!.value.GetValue();
        intersectionManager.detectRelativePosition(bottomBoundaryElement, targetElement, this.relativePositionSetter(BoundaryType.BOTTOM), { bottomThreshold: 0.2 })

        const topBoundary = this._boundaries.get(BoundaryType.TOP);
        const topBoundaryElement: HTMLElement = await topBoundary!.value.GetValue();
        intersectionManager.detectRelativePosition(topBoundaryElement, targetElement, this.relativePositionSetter(BoundaryType.TOP), { topThreshold: 0.8 });
    }

    
    private relativePositionSetter(boundaryType: BoundaryType){
        return (relativePosition: RelativePosition) => {
            this._boundaries.get(boundaryType)!.targetRelativePosition = relativePosition;

            let newRelativePosition = this.checkTargetRelativePosition();
            if (this._relativePosition != newRelativePosition && newRelativePosition !== undefined){
                this._relativePosition = newRelativePosition;
                this._relativePositionUpdated.next(this._relativePosition);
            }
        }
    }

    private checkTargetRelativePosition(): RelativePosition | undefined{
        const bottomBoundary = this._boundaries.get(BoundaryType.BOTTOM);
        const topBoundary = this._boundaries.get(BoundaryType.TOP);

        if (bottomBoundary!.targetRelativePosition === undefined || topBoundary!.targetRelativePosition === undefined)
            return undefined;
        if (bottomBoundary?.targetRelativePosition === RelativePosition.BELOW)
            return RelativePosition.BELOW
        if (topBoundary?.targetRelativePosition === RelativePosition.ABOVE)
            return RelativePosition.ABOVE
        return RelativePosition.BETWEEN;
    }
}