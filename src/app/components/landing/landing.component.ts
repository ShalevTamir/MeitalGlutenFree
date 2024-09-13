import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SocialMediaComponent } from "./components/social-media/social-media.component";
import { BubbleComponent } from "./components/bubble/bubble.component";
import { insertDynamicNewLines } from '@root/common/utils/htmlUtils';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent, SocialMediaComponent, BubbleComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements AfterViewInit{
  @ViewChild('subtitle') subtitle!: ElementRef<HTMLElement>
  @Output() scrollToMenuEvent = new EventEmitter();

  ngAfterViewInit(): void {
    insertDynamicNewLines(this.subtitle.nativeElement, 3);
  }

  scrollToMenu(){
    this.scrollToMenuEvent.emit();
  }

}
