import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class BodyScrollManager{
    private readonly _bodyElement: HTMLElement;
    private readonly _defaultOverflowValue: string;

    constructor(@Inject(DOCUMENT) document: Document){
        this._bodyElement = document.body;
        this._defaultOverflowValue = this._bodyElement.style.overflow || 'auto';
    }

    enableScroll(){
        this._bodyElement.style.overflow = this._defaultOverflowValue;    
      }
      
    disableScroll(){
      this._bodyElement.style.overflow = 'hidden';
    }
}