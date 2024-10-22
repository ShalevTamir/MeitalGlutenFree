import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SocialMediaComponent } from "../social-media/social-media.component";
import { BubbleComponent } from "./components/bubble/bubble.component";
import { insertDynamicNewLines } from '@root/common/utils/htmlUtils';
import { SocialMediaBoundriesManager } from '@root/common/services/social-media-intersection-manager.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent, SocialMediaComponent, BubbleComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements AfterViewInit{
  @ViewChild('subtitle') subtitle!: ElementRef<HTMLElement>;
  @ViewChild('menuButton') menuButton!: ElementRef<HTMLElement>;
  @Output() scrollToMenuEvent = new EventEmitter();

  constructor(private _socialMediaBoundriesManager: SocialMediaBoundriesManager){}

  ngAfterViewInit(): void {
    this._socialMediaBoundriesManager.setTopBoundaryElement(this.menuButton.nativeElement);
    insertDynamicNewLines(this.subtitle.nativeElement, 3);
  }

  scrollToMenu(){
    this.scrollToMenuEvent.emit();
  }

}
