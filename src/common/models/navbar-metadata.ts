import { Injectable } from "@angular/core";
import { LazyValue } from "./lazy-value";

@Injectable({
    providedIn: 'root'
})
export class NavbarMetadata{
    private _navbarHtmlEl!: LazyValue<HTMLElement>;

    constructor(){
        this._navbarHtmlEl = new LazyValue();
    }

    public SetNavbarHtmlElement(navbar: HTMLElement){
        this._navbarHtmlEl.SetValue(navbar);
    }

    public GetNavbarHtmlElement(): Promise<HTMLElement>{
        return this._navbarHtmlEl.GetValue();
    }    
}