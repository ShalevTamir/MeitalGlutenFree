import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { SocialMediaComponent } from "../social-media/social-media.component";
import { BubbleComponent } from "./components/bubble/bubble.component";
import { insertDynamicNewLines } from '@root/common/utils/htmlUtils';
import { SocialMediaBoundariesManager } from '@root/app/components/social-media/services/social-media-boundaries-manager.service';
import { ScrollHandler } from '@root/common/services/scroll-handler.service';
import { MenuComponent } from '../menu/menu.component';
import { BoundaryType } from '../social-media/models/enums/boundary-type.enums';

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

  constructor(private _socialMediaBoundriesManager: SocialMediaBoundariesManager, private _scrollHandler: ScrollHandler){}

  ngAfterViewInit(): void {
    this._socialMediaBoundriesManager.setBoundaryElement(BoundaryType.TOP, this.menuButton.nativeElement);
    insertDynamicNewLines(this.subtitle.nativeElement, 3);
  }

  scrollToMenu(){
    this._scrollHandler.ScrollTo(MenuComponent);
  }

}
