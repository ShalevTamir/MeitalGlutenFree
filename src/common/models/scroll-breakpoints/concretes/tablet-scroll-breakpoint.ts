import { Injectable } from "@angular/core";
import { BaseScrollBreakpoint } from "../base-scroll-breakpoint";
import { TABLET_BREAKPOINT_RES } from "../breakpoints-values";

@Injectable({
    providedIn: 'root'
})
export class TabletScrollBreakpoint extends BaseScrollBreakpoint{
    constructor(){
        super(TABLET_BREAKPOINT_RES);
    }
}