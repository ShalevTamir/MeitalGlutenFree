import { Injectable } from "@angular/core";
import { BaseScrollBreakpoint } from "../base-scroll-breakpoint";
import { PHONE_BREAKPOINT_RES } from "../breakpoints-values";
import { NavbarMetadata } from "../../navbar-metadata";
import { MenuComponent } from "@root/app/components/menu/menu.component";

@Injectable({
    providedIn: 'root'
})
export class PhoneScrollBreakpoint extends BaseScrollBreakpoint{
    constructor(private _navbarMetadata: NavbarMetadata){
        super(PHONE_BREAKPOINT_RES);
        this.registerCustomScrollOptions();
    }      

    private async registerCustomScrollOptions(){
        const navbarHtmlEl: HTMLElement = await this._navbarMetadata.GetNavbarHtmlElement();
        const navbarTopOffset: number = navbarHtmlEl.getBoundingClientRect().top;
        this.addCustomScrollOptions(MenuComponent, { topOffset: (navbarTopOffset * -1) - 50});
    }
}