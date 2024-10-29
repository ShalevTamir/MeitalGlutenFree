import { Injectable } from "@angular/core";
import { ScrollOptions } from "../interfaces/scroll-options.interface";
import { ScrollItem } from "../types/scroll-types";
import { injectDefaultValues } from "@root/common/utils/objectUtils";


const DEFAULT_SCROLL_OPTIONS: ScrollOptions = {
    topOffset: 0
}

export abstract class BaseScrollBreakpoint{
    // key - a scroll item, value - it's corresponding custom scroll options for the specific scroll breakpoint
    private _customScrollOptions: Map<ScrollItem, ScrollOptions>
    private _screenBreakpointWidth: number;

    constructor(screenBreakpointWidth: number){
        this._screenBreakpointWidth = screenBreakpointWidth;
        this._customScrollOptions = new Map();
    }

    protected addCustomScrollOptions(scrollItem: ScrollItem, customOptions: ScrollOptions){
        this._customScrollOptions.set(scrollItem, customOptions);
    }

    public getScrollOptions(scrollItem: ScrollItem): ScrollOptions{
        if (this._customScrollOptions.has(scrollItem))
            return injectDefaultValues(DEFAULT_SCROLL_OPTIONS, this._customScrollOptions.get(scrollItem)!);
        else
            return DEFAULT_SCROLL_OPTIONS;
    }

    public static getDefaults(): ScrollOptions{
        return DEFAULT_SCROLL_OPTIONS;
    }

    public hasCustomScrollOptions(scrollItem: ScrollItem): boolean{
        return this._customScrollOptions.has(scrollItem);
    }

    public get ScreenBreakpointWidth(){
        return this._screenBreakpointWidth;
    }
}