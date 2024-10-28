import { Component, Injectable } from "@angular/core";
import { RefHtmlElement } from "../interfaces/RefHtmlElement.interface";
import { MenuComponent } from "@root/app/components/menu/menu.component";
import { ContactMeComponent } from "@root/app/components/contact-me/contact-me.component";
import { AboutMeComponent } from "@root/app/components/about-me/about-me.component";
import { TConstructor } from "../models/types";
import { IntersectionManager } from "./intersection-manager.service";
import { injectDefaultValues } from "../utils/objectUtils";

interface ScrollCoordinates{
    top: number,
    left: number
}

interface ScrollOptions{
    topOffset?: number
}

@Injectable({
    providedIn: 'root'
})
export class ScrollHandler{
    private _scrollItems = new Map<TConstructor<RefHtmlElement>, RefHtmlElement>();
    private _defaultScrollOptions: ScrollOptions;

    constructor(){
        this._defaultScrollOptions = {
            topOffset: 0
        }
    }

    public setDefaults(options: ScrollOptions){
        this._defaultScrollOptions = injectDefaultValues(options, this._defaultScrollOptions);
    }   

    public AddScrollItem(scrollItem: RefHtmlElement){
        this._scrollItems.set(this.getConstructor(scrollItem), scrollItem);
    }
    
    public ScrollTo(scrollItemKey: TConstructor<RefHtmlElement>){
        if (!this._scrollItems.has(scrollItemKey))
            throw new Error("Unable to find " + typeof(scrollItemKey) + "as a scroll item");
        const scrollItem: RefHtmlElement = this._scrollItems.get(scrollItemKey)!;
        
        const scrollItemHtmlEl = scrollItem.htmlRef;
        const scrollItemBoundingRect = scrollItemHtmlEl.getBoundingClientRect();
        const scrollCoords: ScrollCoordinates = {
            top: scrollItemBoundingRect.top + window.scrollY,
            left: scrollItemBoundingRect.left + window.scrollX
        }
        
        window.scrollTo(
            {
                ...scrollCoords,
                behavior: 'smooth'
            });
    }
    
    private calcScrollCoordinates(elementToScrollTo: HTMLElement): ScrollCoordinates{
        const highestChildTopCoordinate = this.extractHighestChildTopCoordinate(elementToScrollTo);
        const scrollItemTopCoordinate = elementToScrollTo.getBoundingClientRect().top;

        console.log(elementToScrollTo);
        console.log(highestChildTopCoordinate, scrollItemTopCoordinate);
        return {top: 0,left: 0};
    }
    
    private extractHighestChildTopCoordinate(parentElement: HTMLElement){
        const children: Element[] = Array.prototype.slice.call(parentElement.children);
        const childrenTopOffsets: number[] = children.map(child => child.getBoundingClientRect().top);        
        return Math.min(...childrenTopOffsets);
    }

    private getConstructor<T extends RefHtmlElement>(instance: T): TConstructor<T>{
        return instance.constructor as TConstructor<T>
    }
}