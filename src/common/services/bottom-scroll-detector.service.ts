import { DOCUMENT} from "@angular/common";
import { EventEmitter, Inject, Injectable } from "@angular/core";
import { filter, fromEvent, map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BottomScrollDetector{
    private _reachedBottomEvent = new EventEmitter();
    private _scrolledAboveBottomEvent = new EventEmitter();

    private _isCurrentlyAtBottom: boolean = false;

    constructor(@Inject(DOCUMENT) private _document: Document){
        this.initScrollListener();
    }
    
    private initScrollListener(){
        fromEvent(this._document, 'scroll').subscribe(() => {
            // const isAtBottom = window.innerHeight + Math.ceil(window.scrollY) === this._document.body.offsetHeight ||
                            //    window.innerHeight + Math.floor(window.scrollY) === this._document.body.offsetHeight;
            const isAtBottom = window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight;
            console.log(window.innerHeight + Math.round(window.scrollY) + " " + document.body.offsetHeight);
            if (this._isCurrentlyAtBottom && !isAtBottom){
                this._isCurrentlyAtBottom = false;
                this._scrolledAboveBottomEvent.emit();
            }
            else if(isAtBottom){
                this._isCurrentlyAtBottom = true;
                this._reachedBottomEvent.emit();
            }
        });
    }

    public get ReachedBottomEvent(): EventEmitter<void>{
        return this._reachedBottomEvent;
    }

    public get ScrolledAboveBottomEvent(): EventEmitter<void>{
        return this._scrolledAboveBottomEvent;
    }


}