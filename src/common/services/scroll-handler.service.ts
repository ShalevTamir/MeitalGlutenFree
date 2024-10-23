import { Component, Injectable } from "@angular/core";
import { RefHtmlElement } from "../interfaces/RefHtmlElement.interface";
import { MenuComponent } from "@root/app/components/menu/menu.component";
import { ContactMeComponent } from "@root/app/components/contact-me/contact-me.component";
import { AboutMeComponent } from "@root/app/components/about-me/about-me.component";
import { TConstructor } from "../models/types";
import { IntersectionDetector } from "./intersection-detector.service";

interface ScrollOptions{
    scrollYOffset?: () => number,
    scrollXOffset?: () => number
}

interface ScrollItem{
    htmlRefItem: RefHtmlElement
    scrollOptions: ScrollOptions
}

@Injectable({
    providedIn: 'root'
})
export class ScrollHandler{
    private _scrollItems = new Map<TConstructor<RefHtmlElement>, ScrollItem>();
    private _defaultScrollOptions: ScrollOptions;

    constructor(){
        this._defaultScrollOptions = {
            scrollXOffset: () => 0,
            scrollYOffset: () => 0
        }
    }

    public SetNavbarHtmlRef(elementRef: HTMLElement){
        const computedStyle = getComputedStyle(elementRef);
        this._defaultScrollOptions = {
            scrollYOffset: () => (parseFloat(computedStyle.height) ) * -1,
            scrollXOffset: () => parseFloat(computedStyle.width) * -1
        };
    }

    public SetMenuElementRef(elementRef: RefHtmlElement, wrapperRef: HTMLElement){
        this.AddScrollItem(
            MenuComponent,
            elementRef,
            { 
              scrollYOffset: () => {
                const defaultScrollYOffset = this._defaultScrollOptions.scrollYOffset!();
                const wrapperComputedStyle = getComputedStyle(wrapperRef);
                return defaultScrollYOffset - parseFloat(wrapperComputedStyle.paddingTop)
              }
            });
    }

    public AddScrollItem(keyType: TConstructor<RefHtmlElement>, scrollItem: RefHtmlElement, scrollOptions?: ScrollOptions){
        scrollOptions = {...this._defaultScrollOptions, ...scrollOptions};
        this._scrollItems.set(keyType, {htmlRefItem: scrollItem, scrollOptions: scrollOptions});
    }

    public ScrollTo(scrollItemType: TConstructor<RefHtmlElement>){
        const scrollItem: ScrollItem | undefined = this._scrollItems.get(scrollItemType);
        if (scrollItem === undefined)
            throw new Error("Unable to find " + typeof(scrollItemType) + "as a scroll item");

        const scrollItemRect = scrollItem.htmlRefItem.htmlRef.getBoundingClientRect();
        const scrollOptions = scrollItem.scrollOptions;
        
        const topOffset = scrollItemRect.top + window.scrollY + scrollOptions.scrollYOffset!();
        const leftOffset = scrollItemRect.left + window.scrollX + scrollOptions.scrollXOffset!();

        window.scrollTo(
            {
                top: topOffset,
                left: leftOffset,
                behavior: 'smooth'
            });
    }

}