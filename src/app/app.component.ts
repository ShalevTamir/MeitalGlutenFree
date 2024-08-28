import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from "./components/landing/landing.component";
import { NavbarComponent } from "./components/landing/components/navbar/navbar.component";
import { MenuComponent } from "./components/menu/menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LandingComponent, NavbarComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(MenuComponent) menuComponent!: MenuComponent;
  title = 'MeitalGlutenFree';

  scrollToMenu(){
    const menuElement: HTMLElement = this.menuComponent.ElementRef.nativeElement;
    menuElement.scrollIntoView({ behavior: 'smooth' });
  }
}
