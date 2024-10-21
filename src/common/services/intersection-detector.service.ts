import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class IntersectionDetector{
    public detectIntersection(
        targetElement: HTMLElement,
        handleIntersectionCallback: () => void,
        handleExitIntersectionCallback: () => void,
        intersectionOptions?: IntersectionObserverInit){

        const intersectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting)
                    handleIntersectionCallback();
                else
                    handleExitIntersectionCallback();
            });
        }, intersectionOptions)
        intersectionObserver.observe(targetElement);
    }
}