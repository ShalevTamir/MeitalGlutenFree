import { Injectable } from "@angular/core";
import { BaseScrollBreakpoint } from "../base-scroll-breakpoint";
import { TABLET_BREAKPOINT_RES } from "../breakpoints-values";
import { NavbarMetadata } from "../../navbar-metadata";
import { AboutMeComponent } from "@root/app/components/about-me/about-me.component";
import { MenuComponent } from "@root/app/components/menu/menu.component";

@Injectable({
    providedIn: 'root'
})
export class TabletScrollBreakpoint extends BaseScrollBreakpoint{
    constructor(private _navbarMetadata: NavbarMetadata){
        super(TABLET_BREAKPOINT_RES);
        this.registerCustomScrollOptions();
    }

    private async registerCustomScrollOptions(){
        const navbarHtmlEl: HTMLElement = await this._navbarMetadata.GetNavbarHtmlElement();
        const navbarTopOffset: number = navbarHtmlEl.getBoundingClientRect().top;
        this.addCustomScrollOptions(AboutMeComponent, { topOffset: (navbarTopOffset * -1) - 10});
        this.addCustomScrollOptions(MenuComponent, { topOffset: (navbarTopOffset * -1) - 10});
    }
}