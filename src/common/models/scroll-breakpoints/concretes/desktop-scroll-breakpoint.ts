import { Injectable } from "@angular/core";
import { BaseScrollBreakpoint } from "../base-scroll-breakpoint";
import { DESKTOP_BREAKPOINT_RES } from "../breakpoints-values";

@Injectable({
    providedIn: 'root'
})
export class DesktopScrollBreakpoint extends BaseScrollBreakpoint{
    constructor(){
        super(DESKTOP_BREAKPOINT_RES);
    }
}