import { Component, Injectable } from "@angular/core";
import { RefHtmlElement } from "../interfaces/RefHtmlElement.interface";
import { MenuComponent } from "@root/app/components/menu/menu.component";
import { ContactMeComponent } from "@root/app/components/contact-me/contact-me.component";
import { AboutMeComponent } from "@root/app/components/about-me/about-me.component";
import { IntersectionManager } from "./intersection-manager.service";
import { injectDefaultValues } from "../utils/objectUtils";
import { ScrollItem } from "../models/types/scroll-types";
import { TConstructor } from "../models/types/general-types";
import { ScrollOptionsManager } from "./scroll-breakpoints-manager.service";

interface ScrollCoordinates{
    top: number,
    left: number
}


@Injectable({
    providedIn: 'root'
})
export class ScrollHandler{
    private _scrollItems = new Map<ScrollItem, RefHtmlElement>();

    constructor(private readonly _scrollOptionsManager: ScrollOptionsManager){

    }

    public AddScrollItem(scrollItem: RefHtmlElement){
        this._scrollItems.set(this.getConstructor(scrollItem), scrollItem);
    }
    
    public ScrollTo(scrollItem: ScrollItem){
        if (!this._scrollItems.has(scrollItem))
            throw new Error("Unable to find " + typeof(scrollItem) + "as a scroll item");

        const scrollCoords = this.calcScrollCoords(scrollItem);
        window.scrollTo(
            {
                ...scrollCoords,
                behavior: 'smooth'
            });
    }

    private calcScrollCoords(scrollItem: ScrollItem): ScrollCoordinates{
        const scrollOptions = this._scrollOptionsManager.getCurrentScrollOptions(scrollItem);
        console.log(scrollOptions);

        const scrollItemHtmlRef: RefHtmlElement = this._scrollItems.get(scrollItem)!;
        const scrollItemHtmlEl = scrollItemHtmlRef.htmlRef;
        const scrollItemBoundingRect = scrollItemHtmlEl.getBoundingClientRect();
        
        return {
            top: scrollItemBoundingRect.top + window.scrollY + scrollOptions.topOffset!,
            left: scrollItemBoundingRect.left + window.scrollX
        }
    }
       
    private getConstructor<T extends RefHtmlElement>(instance: T): TConstructor<T>{
        return instance.constructor as TConstructor<T>
    }
}