import { Injectable } from "@angular/core";
import { ScrollOptions } from "../interfaces/scroll-options.interface";
import { ScrollItem } from "../types/scroll-types";
import { injectDefaultValues } from "@root/common/utils/objectUtils";

export abstract class BaseScrollBreakpoint{
    private _defaultScrollOptions: ScrollOptions;
    // key - a scroll item, value - it's corresponding custom scroll options for the specific scroll breakpoint
    private _customScrollOptions: Map<ScrollItem, ScrollOptions>
    private _screenBreakpointResolution: number;

    constructor(screenBreakpointResolution: number){
        this._screenBreakpointResolution = screenBreakpointResolution;
        this._defaultScrollOptions = {
            topOffset: 0
        }
        this._customScrollOptions = new Map();
    }

    protected addCustomScrollOptions(scrollItem: ScrollItem, customOptions: ScrollOptions){
        this._customScrollOptions.set(scrollItem, customOptions);
    }

    public getScrollOptions(scrollItem: ScrollItem): ScrollOptions{
        if (this._customScrollOptions.has(scrollItem))
            return injectDefaultValues(this._defaultScrollOptions, this._customScrollOptions.get(scrollItem)!);
        else
            return this._defaultScrollOptions;
    }

    public get ScreenBreakpointResolution(){
        return this._screenBreakpointResolution;
    }
}