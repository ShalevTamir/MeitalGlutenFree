import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RefHtmlElement } from '@root/common/interfaces/RefHtmlElement.interface';
import { ScrollHandler } from '@root/common/services/scroll-handler.service';
import { insertNewLinesAtChar } from '@root/common/utils/htmlUtils';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent implements AfterViewInit, RefHtmlElement{
  htmlRef: HTMLElement;
  @ViewChild('description') description!: ElementRef<HTMLElement>

  constructor(scrollHandler: ScrollHandler, elementRef: ElementRef){
    this.htmlRef = elementRef.nativeElement;
    scrollHandler.AddScrollItem(AboutMeComponent, this);
  }

  ngAfterViewInit(): void {
    insertNewLinesAtChar(this.description.nativeElement, '.');
  }

}
