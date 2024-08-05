import { Component } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SocialMediaComponent } from "./components/social-media/social-media.component";
import { BubbleComponent } from "./components/bubble/bubble.component";
import { LogoComponent } from "./components/logo/logo.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent, SocialMediaComponent, BubbleComponent, LogoComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
