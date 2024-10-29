import { Injectable } from "@angular/core";
import { BaseScrollBreakpoint } from "../base-scroll-breakpoint";
import { PHONE_BREAKPOINT_RES } from "../breakpoints-values";

@Injectable({
    providedIn: 'root'
})
export class PhoneScrollBreakpoint extends BaseScrollBreakpoint{
    constructor(){
        super(PHONE_BREAKPOINT_RES)
    }
        
}