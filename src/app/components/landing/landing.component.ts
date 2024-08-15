import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SocialMediaComponent } from "./components/social-media/social-media.component";
import { BubbleComponent } from "./components/bubble/bubble.component";
import { injectDynamicNewLines } from '@root/common/utils/htmlUtils';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent, SocialMediaComponent, BubbleComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements AfterViewInit{
  @ViewChild('subtitle') subtitle!: ElementRef<HTMLElement>
  ngAfterViewInit(): void {
    injectDynamicNewLines(this.subtitle.nativeElement, 3);
  }

}
