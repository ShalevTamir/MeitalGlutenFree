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
    private _scrollBreakpoints: BaseScrollBreakpoint[]

    constructor(
            desktopBreakpoint: DesktopScrollBreakpoint,
            tabletBreakpoint: TabletScrollBreakpoint,
            phoneBreakpoint: PhoneScrollBreakpoint){
        this._scrollBreakpoints = [
            desktopBreakpoint,
            tabletBreakpoint,
            phoneBreakpoint
        ]
    }

    getCurrentScrollOptions(scrollItem: ScrollItem): ScrollOptions{
        const relevantBreakpoints = this._scrollBreakpoints.filter(scrollBreakpoint => scrollBreakpoint.ScreenBreakpointResolution <= document.body.offsetHeight);
        const biggestRelevantBreakpoint = relevantBreakpoints.reduce(
            (maxBreakpoint, currentBreakpoint) => 
                currentBreakpoint.ScreenBreakpointResolution > maxBreakpoint.ScreenBreakpointResolution ? currentBreakpoint : maxBreakpoint);
            
        return biggestRelevantBreakpoint.getScrollOptions(scrollItem);
    }
}