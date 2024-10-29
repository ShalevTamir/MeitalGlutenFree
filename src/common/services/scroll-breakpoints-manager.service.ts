import { Injectable } from "@angular/core";
import { BaseScrollBreakpoint } from "../models/scroll-breakpoints/base-scroll-breakpoint";
import { DesktopScrollBreakpoint } from "../models/scroll-breakpoints/concretes/desktop-scroll-breakpoint";
import { TabletScrollBreakpoint } from "../models/scroll-breakpoints/concretes/tablet-scroll-breakpoint";
import { PhoneScrollBreakpoint } from "../models/scroll-breakpoints/concretes/phone-scroll-breakpoint";
import { ScrollItem } from "../models/types/scroll-types";
import { ScrollOptions } from "../models/interfaces/scroll-options.interface";

@Injectable({
    providedIn: 'root'
})
export class ScrollOptionsManager{
    private _scrollBreakpoints: BaseScrollBreakpoint[];
    private _smallestToBiggestBreakpoints!: BaseScrollBreakpoint[];
    private _biggestToSmallestBreakpoints!: BaseScrollBreakpoint[];

    constructor(
            desktopBreakpoint: DesktopScrollBreakpoint,
            tabletBreakpoint: TabletScrollBreakpoint,
            phoneBreakpoint: PhoneScrollBreakpoint){
        this._scrollBreakpoints = [
            desktopBreakpoint,
            tabletBreakpoint,
            phoneBreakpoint
        ]
        this.sortBreakpoints();
    }
    
    private sortBreakpoints(){
        this._smallestToBiggestBreakpoints = this._scrollBreakpoints.slice().sort((firstBreakpoint, secondBreakpoint) => firstBreakpoint.ScreenBreakpointWidth - secondBreakpoint.ScreenBreakpointWidth);
        this._biggestToSmallestBreakpoints = this._scrollBreakpoints.slice().sort((firstBreakpoint, secondBreakpoint) => secondBreakpoint.ScreenBreakpointWidth - firstBreakpoint.ScreenBreakpointWidth);
    }

    public getCurrentScrollOptions(scrollItem: ScrollItem): ScrollOptions{
        const possibleRelevantBreakpoint: BaseScrollBreakpoint | undefined = 
            this._biggestToSmallestBreakpoints.find(breakpoint => breakpoint.ScreenBreakpointWidth <= document.body.offsetWidth);

        if (possibleRelevantBreakpoint === undefined || !this.isBreakpointRelevant(possibleRelevantBreakpoint, scrollItem)){
            const nextPossibleRelevantBreakpoint = this.getNextRelevantBreakpoint(possibleRelevantBreakpoint, scrollItem);
            return nextPossibleRelevantBreakpoint === undefined ? BaseScrollBreakpoint.getDefaults() : nextPossibleRelevantBreakpoint.getScrollOptions(scrollItem);
        }
        else{
            const relevantBreakpoint: BaseScrollBreakpoint = possibleRelevantBreakpoint;
            return relevantBreakpoint.getScrollOptions(scrollItem);
        }
    }

    private isBreakpointRelevant(breakpoint: BaseScrollBreakpoint | undefined, scrollItem: ScrollItem){
        return breakpoint !== undefined && breakpoint.hasCustomScrollOptions(scrollItem);
    }

    private getNextRelevantBreakpoint(previousRelevantBreakpoint: BaseScrollBreakpoint | undefined, scrollItem: ScrollItem): BaseScrollBreakpoint | undefined{
        let breakpointIndex = previousRelevantBreakpoint === undefined ? 0 : this._smallestToBiggestBreakpoints.indexOf(previousRelevantBreakpoint);
        const possibleBreakpoints: BaseScrollBreakpoint[] = this._smallestToBiggestBreakpoints.slice(breakpointIndex);
        const nextRelevantBreakpoint = possibleBreakpoints.find(breakpoint => this.isBreakpointRelevant(breakpoint, scrollItem));
        return nextRelevantBreakpoint;
    }
}