import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Injectable({
    providedIn: 'root'
})
export class SvgGenerator{
    constructor(private _sanitizer: DomSanitizer){}

    createSvg(svgString: string): SafeHtml{
        return this._sanitizer.bypassSecurityTrustHtml(svgString);
    }
}